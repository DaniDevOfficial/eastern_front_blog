function formatMessageDate(sentAt: Date): string {
  const today = new Date();
  if (sentAt.getFullYear() != today.getFullYear()) {
    return sentAt.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (sentAt.getDate() === today.getDate()) {
    return "Heute";
  }

  if (sentAt.getDate() === today.getDate() - 1) {
    return "Gestern";
  }

  if (wasInTheLastWeek(sentAt)) {
    return sentAt.toLocaleDateString(undefined, { weekday: "long" });
  }

  return sentAt.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
}

function wasInTheLastWeek(sentAt: Date): boolean {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  return sentAt.getTime() > lastWeek.getTime();
}

export const Utils = {
  formatMessageDate,
};
