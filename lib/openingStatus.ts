import { siteConfig, OpeningDay } from "./siteConfig";

export type TodayStatus =
  | { state: "open"; closesAt: string; today: OpeningDay }
  | { state: "opens-later"; opensAt: string; today: OpeningDay }
  | { state: "closed-for-day"; today: OpeningDay }
  | { state: "rest-day"; today: OpeningDay };

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function getTodayStatus(now: Date = new Date()): TodayStatus {
  const weekday = now.getDay();
  const today =
    siteConfig.openingHours.find((d) => d.weekday.includes(weekday)) ??
    siteConfig.openingHours[0];

  if (today.closed) {
    return { state: "rest-day", today };
  }

  if (!today.opens || !today.closes) {
    return { state: "closed-for-day", today };
  }

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const opensMin = timeToMinutes(today.opens);
  const closesMin = timeToMinutes(today.closes);

  if (nowMin < opensMin) {
    return { state: "opens-later", opensAt: today.opens, today };
  }

  if (nowMin >= opensMin && nowMin < closesMin) {
    return { state: "open", closesAt: today.closes, today };
  }

  return { state: "closed-for-day", today };
}

export function getTodayLabel(status: TodayStatus): string {
  switch (status.state) {
    case "open":
      return `Heute geöffnet bis ${status.closesAt} Uhr`;
    case "opens-later":
      return `Heute geöffnet ab ${status.opensAt} Uhr`;
    case "closed-for-day":
      return "Heute bereits geschlossen";
    case "rest-day":
      return "Heute Ruhetag";
  }
}
