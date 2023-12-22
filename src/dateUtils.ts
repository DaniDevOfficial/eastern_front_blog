function formatPostDate(date: Date): string {
  const today = new Date();
  if (date.getFullYear() != today.getFullYear()) {
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (date.getDate() === today.getDate()) {
    return "Heute";
  }

  if (date.getDate() === today.getDate() - 1) {
    return "Gestern";
  }

  if (wasInTheLastWeek(date)) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
}

function wasInTheLastWeek(date: Date): boolean {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  return date.getTime() > lastWeek.getTime();
}

function formatTimelineDate(date: Date) {
  return date.toLocaleDateString("De-de", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Utils = {
  formatPostDate,
  formatTimelineDate,
};
