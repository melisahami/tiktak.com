import type { PersonalNotification } from "@/data/demo/ogrenci";

interface PersonalNotificationsProps {
  notifications: PersonalNotification[];
}

const ICON_MAP: Record<string, string> = {
  attendance: "📍",
  assignment: "📝",
  exam: "📊",
  general: "📢",
};

const COLOR_MAP: Record<string, string> = {
  attendance: "bg-blue-50 border-blue-200",
  assignment: "bg-amber-50 border-amber-200",
  exam: "bg-purple-50 border-purple-200",
  general: "bg-slate-50 border-slate-200",
};

const BADGE_COLOR_MAP: Record<string, string> = {
  attendance: "text-blue-700",
  assignment: "text-amber-700",
  exam: "text-purple-700",
  general: "text-slate-700",
};

export function PersonalNotifications({
  notifications,
}: PersonalNotificationsProps) {
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  if (notifications.length === 0) {
    return (
      <section className="rounded-xl border border-[#E4EAF2] bg-white p-8 text-center">
        <p className="text-sm text-[#667085]">Yeni bildirim bulunmamaktadır.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {unreadNotifications.length > 0 && (
        <div className="rounded-lg bg-[#FFF3E7] px-4 py-2.5">
          <p className="text-xs font-semibold text-[#B65A12]">
            {unreadNotifications.length} yeni bildirim
          </p>
        </div>
      )}

      {notifications.map((notification) => (
        <article
          key={notification.id}
          className={`rounded-lg border p-4 transition ${COLOR_MAP[notification.type]} ${
            !notification.isRead ? "border-opacity-100" : "border-opacity-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{ICON_MAP[notification.type]}</span>

            <div className="flex-1">
              <h4 className={`text-sm font-semibold ${BADGE_COLOR_MAP[notification.type]}`}>
                {notification.title}
              </h4>
              <p className="mt-1 text-xs text-[#667085]">
                {notification.message}
              </p>
              <p className="mt-2 text-xs text-[#98A2B3]">
                {new Date(notification.timestamp).toLocaleString("tr-TR")}
              </p>
            </div>

            {!notification.isRead && (
              <div className="flex h-2.5 w-2.5 rounded-full bg-[#F4A261] flex-shrink-0 mt-2" />
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
