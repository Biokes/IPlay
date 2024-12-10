export default function getLastThursday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceThursday = (dayOfWeek >= 4) ? dayOfWeek - 4 : dayOfWeek + 3;
    const lastThursday = new Date(today);
    lastThursday.setDate(today.getDate() - daysSinceThursday);
    console.log(lastThursday);
    return lastThursday.toISOString().split("T")[0];
  }