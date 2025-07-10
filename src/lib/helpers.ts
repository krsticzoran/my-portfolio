export function getFreelanceExperience(startDate: Date = new Date("2024-05-01")): string {
  const now = new Date();
  const diffInMs = now.getTime() - startDate.getTime();

  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.4375);
  const diffInYears = diffInMonths / 12;

  const years = Math.floor(diffInYears);

  return years < 2 ? "1+ year" : `${years}+ years`;
}
