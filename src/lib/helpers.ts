export function getFreelanceExperience(startDate: Date = new Date("2024-05-01")): string {
  const now = new Date();
  const diffInMs = now.getTime() - startDate.getTime();

  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.4375); // Prosečan broj dana u mesecu
  const diffInYears = diffInMonths / 12;

  return `${(Math.round(diffInYears * 10) / 10).toFixed(1)} years`;
}
