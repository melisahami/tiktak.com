const fs = require('fs');
const path = require('path');

const content = `export const YOKLAMA_PIN_KEY = 'tiktak.yoklama.pin.v1';

export type PinEntry = {
  pin: string;
  courseId: string;
  courseName: string;
  expiresAt: number;
  openedAt: string;
};

export function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function setPin(courseId: string, courseName: string, pin: string): void {
  if (typeof window === 'undefined') return;
  const all = getAllPinsRaw();
  all[courseId] = {
    pin,
    courseId,
    courseName,
    expiresAt: Date.now() + 15 * 60 * 1000,
    openedAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
  };
  window.localStorage.setItem(YOKLAMA_PIN_KEY, JSON.stringify(all));
}

export function getPin(courseId: string): PinEntry | null {
  if (typeof window === 'undefined') return null;
  const all = getAllPinsRaw();
  const entry = all[courseId];
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    clearPin(courseId);
    return null;
  }
  return entry;
}

export function clearPin(courseId: string): void {
  if (typeof window === 'undefined') return;
  const all = getAllPinsRaw();
  delete all[courseId];
  window.localStorage.setItem(YOKLAMA_PIN_KEY, JSON.stringify(all));
}

export function getAllPins(): Record<string, PinEntry> {
  const all = getAllPinsRaw();
  const now = Date.now();
  return Object.fromEntries(
    Object.entries(all).filter(([, v]) => v.expiresAt > now)
  );
}

function getAllPinsRaw(): Record<string, PinEntry> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(YOKLAMA_PIN_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, PinEntry>;
  } catch {
    return {};
  }
}
`;

const targetDir = path.join(__dirname, 'src', 'lib', 'demo');
fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, 'pin-store.ts'), content, 'utf8');
console.log('SUCCESS: pin-store.ts written.');
