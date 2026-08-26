export interface Course {
  id: string;
  name: string;
  group: string;
  semester: string;
  totalWeeks: number;
  currentWeek: number;
  nextLessonDate: string;
  nextLessonTime: string;
  attendanceStatus: "open" | "closed";
  instructorName: string;
  subject: string;
}

export interface Attendance {
  id: string;
  courseId: string;
  courseName: string;
  group: string;
  week: number;
  subject: string;
  date: string;
  time: string;
  status: "katıldı" | "katılmadı";
  attendedAt?: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export interface OpenAttendance {
  id: string;
  courseId: string;
  courseName: string;
  group: string;
  date: string;
  time: string;
  week: number;
  subject: string;
  pin?: string;
  isSubmitted?: boolean;
  submittedAt?: string;
}

export interface PersonalNotification {
  id: string;
  type: "attendance" | "assignment" | "exam" | "general";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    name: "Robotik ve Kodlama",
    group: "RK-01",
    semester: "Güz 2026",
    totalWeeks: 12,
    currentWeek: 3,
    nextLessonDate: "2026-08-27",
    nextLessonTime: "14:00",
    attendanceStatus: "open",
    instructorName: "Prof. Dr. Ahmet Yılmaz",
    subject: "Robotik temelleri, Arduino programlama",
  },
  {
    id: "2",
    name: "Python Programlama",
    group: "PY-02",
    semester: "Güz 2026",
    totalWeeks: 10,
    currentWeek: 2,
    nextLessonDate: "2026-08-28",
    nextLessonTime: "10:00",
    attendanceStatus: "closed",
    instructorName: "Doç. Dr. Fatih Kaya",
    subject: "Python programlama temelleri",
  },
  {
    id: "3",
    name: "Web Tasarımı ve Geliştirme",
    group: "WD-03",
    semester: "Güz 2026",
    totalWeeks: 14,
    currentWeek: 1,
    nextLessonDate: "2026-08-29",
    nextLessonTime: "16:00",
    attendanceStatus: "open",
    instructorName: "Öğr. Gör. Zeynep Aslan",
    subject: "HTML, CSS ve responsive tasarım",
  },
];

export const MOCK_ATTENDANCES: Attendance[] = [
  {
    id: "a1",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    week: 1,
    subject: "Robotik Temelleri",
    date: "2026-08-13",
    time: "14:05",
    status: "katıldı",
    attendedAt: "14:05",
  },
  {
    id: "a2",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    week: 2,
    subject: "Arduino Temelleri",
    date: "2026-08-20",
    time: "14:00",
    status: "katıldı",
    attendedAt: "14:02",
  },
  {
    id: "a3",
    courseId: "2",
    courseName: "Python Programlama",
    group: "PY-02",
    week: 1,
    subject: "Python Giriş",
    date: "2026-08-14",
    time: "10:00",
    status: "katılmadı",
  },
  {
    id: "a4",
    courseId: "3",
    courseName: "Web Tasarımı ve Geliştirme",
    group: "WD-03",
    week: 1,
    subject: "Web Tasarımı Tanıtımı",
    date: "2026-08-15",
    time: "16:05",
    status: "katıldı",
    attendedAt: "16:05",
  },
];

export const MOCK_OPEN_ATTENDANCES: OpenAttendance[] = [
  {
    id: "oa1",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    date: "2026-08-27",
    time: "14:00",
    week: 3,
    subject: "Harita Oluşturma (SLAM)",
    pin: "1234",
  },
  {
    id: "oa2",
    courseId: "3",
    courseName: "Web Tasarımı ve Geliştirme",
    group: "WD-03",
    date: "2026-08-29",
    time: "16:00",
    week: 1,
    subject: "CSS Kutulama Modeli",
    pin: "5678",
  },
];

export const MOCK_NOTIFICATIONS: PersonalNotification[] = [
  {
    id: "n1",
    type: "attendance",
    title: "Yoklama Güncellemesi",
    message: "Robotik ve Kodlama (RK-01) Hafta 1 yoklamanız güncellendi.",
    timestamp: "2026-08-25T10:30:00",
    isRead: false,
  },
  {
    id: "n2",
    type: "general",
    title: "Yeni Ders Başladı",
    message: "Web Tasarımı ve Geliştirme dersi başlamıştır. Dersin ilk oturumuna katılmayı unutmayın.",
    timestamp: "2026-08-24T09:00:00",
    isRead: false,
  },
  {
    id: "n3",
    type: "assignment",
    title: "Yeni Ödev Eklendi",
    message: "Python Programlama dersine yeni ödev eklendi.",
    timestamp: "2026-08-23T14:15:00",
    isRead: true,
  },
];

export const MOCK_OVERALL_ATTENDANCE_RATE = 87;

// Atölye/Workshop veri tipleri
export interface WorkshopAnalytics {
  totalStudents: number;
  readyInstructors: number;
  openAttendances: number;
  upcomingLessons: number;
}

export interface InstructorTask {
  id: string;
  title: string;
  course: string;
  group: string;
  dueDate: string;
  priority: "Kritik" | "Orta" | "Düşük";
  status: "Başık var" | "Beklemede" | "Tamamlandı" | "Devam ediyor";
  progress: number;
  action: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  course: string;
  week: number;
  totalCount: number;
  checkedCount: number;
  missingCount: number;
  status: "Yeterli" | "Eksik var" | "Açık";
  action: string;
}

export interface WorkshopNotification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  date: string;
  action?: string;
}

export const MOCK_WORKSHOP_ANALYTICS: WorkshopAnalytics = {
  totalStudents: 4,
  readyInstructors: 2,
  openAttendances: 3,
  upcomingLessons: 1,
};

export const MOCK_INSTRUCTOR_TASKS: InstructorTask[] = [
  {
    id: "1",
    title: "Robotik ve Kodlama tüm dönem malzeme kontrolü tamzlaması",
    course: "Robotik ve Kodlama / Grup A",
    group: "A",
    dueDate: "20 Eylül 2026",
    priority: "Kritik",
    status: "Başık var",
    progress: 50,
    action: "Görevi açyoldırıdı",
  },
  {
    id: "2",
    title: "Eğitmen hazırlık durumumuş kontrol et",
    course: "Robotik ve Kodlama",
    group: "",
    dueDate: "18 Eylül 2026",
    priority: "Orta",
    status: "Devam ediyor",
    progress: 60,
    action: "Eğitim hazırlığına git",
  },
  {
    id: "3",
    title: "Hafta 3 yoklama sonuçlarını kontrol et",
    course: "Robotik ve Kodlama / Grup A",
    group: "",
    dueDate: "18 Eylül 2026",
    priority: "Orta",
    status: "Beklemede",
    progress: 0,
    action: "Eğilimlerine git",
  },
  {
    id: "4",
    title: "Eğitim dokumentlarını eğilenmerlere paylaş",
    course: "Robotik ve Kodlama",
    group: "",
    dueDate: "16 Eylül 2026",
    priority: "Düşük",
    status: "Tamamlandı",
    progress: 100,
    action: "Görevi açyoldırıdı",
  },
];

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    id: "1",
    name: "Arduino Uno",
    course: "Robotik ve Kodlama",
    week: 1,
    totalCount: 15,
    checkedCount: 15,
    missingCount: 0,
    status: "Yeterli",
    action: "Detayı aç",
  },
  {
    id: "2",
    name: "USB kablo",
    course: "Robotik ve Kodlama",
    week: 2,
    totalCount: 15,
    checkedCount: 15,
    missingCount: 0,
    status: "Yeterli",
    action: "Detayı aç",
  },
  {
    id: "3",
    name: "Ultrasosik sensör",
    course: "Robotik ve Kodlama",
    week: 3,
    totalCount: 15,
    checkedCount: 12,
    missingCount: 3,
    status: "Eksik var",
    action: "Açık",
  },
  {
    id: "4",
    name: "Breadboard",
    course: "Robotik ve Kodlama",
    week: 4,
    totalCount: 15,
    checkedCount: 13,
    missingCount: 2,
    status: "Eksik var",
    action: "Açık",
  },
  {
    id: "5",
    name: "Direnç seti",
    course: "Robotik ve Kodlama",
    week: 5,
    totalCount: 15,
    checkedCount: 15,
    missingCount: 0,
    status: "Yeterli",
    action: "Detayı aç",
  },
  {
    id: "6",
    name: "Servo motor",
    course: "Robotik ve Kodlama",
    week: 6,
    totalCount: 15,
    checkedCount: 15,
    missingCount: 0,
    status: "Yeterli",
    action: "Detayı aç",
  },
  {
    id: "7",
    name: "Jumper kablo seti",
    course: "Robotik ve Kodlama",
    week: 7,
    totalCount: 15,
    checkedCount: 10,
    missingCount: 5,
    status: "Eksik var",
    action: "Açık",
  },
  {
    id: "8",
    name: "9V pil",
    course: "Robotik ve Kodlama",
    week: 8,
    totalCount: 15,
    checkedCount: 15,
    missingCount: 0,
    status: "Yeterli",
    action: "Detayı aç",
  },
];

export const MOCK_WORKSHOP_NOTIFICATIONS: WorkshopNotification[] = [
  {
    id: "1",
    type: "critical",
    title: "Robotik ve Kodlama / Grup A için 3 malzeme eksiktir bulunuyoruz.",
    description: "Malzeme kontrol sayfasından detayları görebilirsiniz.",
    date: "",
    action: "Malzeme kontrol'üne git",
  },
  {
    id: "2",
    type: "warning",
    title: "Temel Elektronik / Grup A için eğitmen hazırlığı henüz tamamlanmadı.",
    description: "Eğitim hazırlığı sayfasından detayları görebilirsiniz.",
    date: "",
    action: "Eğilim hazırlığına git",
  },
  {
    id: "3",
    type: "info",
    title: "Bugün 10:00'da başlayacak Robotik ve Kodlama / Grup A yaklaşamıştır henüz tamamlanmamıştır.",
    description: "",
    date: "",
    action: "Eğilimlerine git",
  },
];

// Instructor/Eğitmen veri tipleri
export interface InstructorCourse {
  id: string;
  name: string;
  group: string;
  semester: string;
  totalWeeks: number;
  currentWeek: number;
  nextLessonDate: string;
  nextLessonTime: string;
  activeStudents: number;
  attendanceStatus: "open" | "closed";
}

export interface ActiveAttendance {
  id: string;
  courseId: string;
  courseName: string;
  group: string;
  openedAt: string;
  openedTime: string;
  remainingMinutes: number;
}

export interface PastAttendance {
  id: string;
  courseId: string;
  courseName: string;
  group: string;
  week: number;
  subject: string;
  date: string;
  openedTime: string;
  closedTime: string;
  studentsAttended: number;
}

export interface InstructorStudent {
  id: string;
  name: string;
  email: string;
  courseId: string;
  group: string;
  attendanceStatus: "katıldı" | "katılmadı";
  attendanceTime?: string;
}

export interface InstructorNotification {
  id: string;
  type: "student" | "schedule" | "attendance";
  title: string;
  message: string;
  timestamp: string;
}

export const MOCK_INSTRUCTOR_COURSES: InstructorCourse[] = [
  {
    id: "1",
    name: "Robotik ve Kodlama",
    group: "RK-01",
    semester: "Güz 2026",
    totalWeeks: 12,
    currentWeek: 3,
    nextLessonDate: "2026-08-27",
    nextLessonTime: "14:00",
    activeStudents: 15,
    attendanceStatus: "open",
  },
  {
    id: "2",
    name: "Python Programlama",
    group: "PY-02",
    semester: "Güz 2026",
    totalWeeks: 10,
    currentWeek: 2,
    nextLessonDate: "2026-08-28",
    nextLessonTime: "10:00",
    activeStudents: 12,
    attendanceStatus: "closed",
  },
  {
    id: "3",
    name: "Web Tasarımı ve Geliştirme",
    group: "WD-03",
    semester: "Güz 2026",
    totalWeeks: 14,
    currentWeek: 1,
    nextLessonDate: "2026-08-29",
    nextLessonTime: "16:00",
    activeStudents: 10,
    attendanceStatus: "closed",
  },
];

export const MOCK_ACTIVE_ATTENDANCES: ActiveAttendance[] = [
  {
    id: "aa1",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    openedAt: "2026-08-27",
    openedTime: "14:02",
    remainingMinutes: 118,
  },
];

export const MOCK_PAST_ATTENDANCES: PastAttendance[] = [
  {
    id: "pa1",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    week: 1,
    subject: "Robotik Temelleri",
    date: "2026-08-13",
    openedTime: "14:00",
    closedTime: "14:45",
    studentsAttended: 13,
  },
  {
    id: "pa2",
    courseId: "1",
    courseName: "Robotik ve Kodlama",
    group: "RK-01",
    week: 2,
    subject: "Arduino Temelleri",
    date: "2026-08-20",
    openedTime: "14:05",
    closedTime: "14:50",
    studentsAttended: 14,
  },
  {
    id: "pa3",
    courseId: "2",
    courseName: "Python Programlama",
    group: "PY-02",
    week: 1,
    subject: "Python Giriş",
    date: "2026-08-14",
    openedTime: "10:00",
    closedTime: "10:45",
    studentsAttended: 11,
  },
];

export const MOCK_INSTRUCTOR_STUDENTS: InstructorStudent[] = [
  {
    id: "s1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@ogrenci.tiktakturkiye.gov.tr",
    courseId: "1",
    group: "RK-01",
    attendanceStatus: "katıldı",
    attendanceTime: "14:05",
  },
  {
    id: "s2",
    name: "Fatima Kaya",
    email: "fatima.kaya@ogrenci.tiktakturkiye.gov.tr",
    courseId: "1",
    group: "RK-01",
    attendanceStatus: "katıldı",
    attendanceTime: "14:08",
  },
  {
    id: "s3",
    name: "Zeynep Aslan",
    email: "zeynep.aslan@ogrenci.tiktakturkiye.gov.tr",
    courseId: "1",
    group: "RK-01",
    attendanceStatus: "katılmadı",
  },
  {
    id: "s4",
    name: "Mehmet Demir",
    email: "mehmet.demir@ogrenci.tiktakturkiye.gov.tr",
    courseId: "1",
    group: "RK-01",
    attendanceStatus: "katıldı",
    attendanceTime: "14:03",
  },
];

export const MOCK_INSTRUCTOR_NOTIFICATIONS: InstructorNotification[] = [
  {
    id: "in1",
    type: "student",
    title: "Yeni öğrenci atandı",
    message: "Robotik ve Kodlama / Grup A dersine yeni öğrenci eklendi.",
    timestamp: "2026-08-25T10:30:00",
  },
  {
    id: "in2",
    type: "schedule",
    title: "Ders saati değişti",
    message: "Python Programlama / Grup B dersinin saati değiştirildi.",
    timestamp: "2026-08-24T15:45:00",
  },
  {
    id: "in3",
    type: "attendance",
    title: "Yoklama süresi doldu",
    message: "Robotik ve Kodlama / Grup A yoklaması otomatik kapatıldı.",
    timestamp: "2026-08-23T14:50:00",
  },
];
