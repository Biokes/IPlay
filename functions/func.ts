export default function getLastThursday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceThursday = (dayOfWeek >= 4) ? dayOfWeek - 4 : dayOfWeek + 3;
    const lastThursday = new Date(today);
    lastThursday.setDate(today.getDate() - daysSinceThursday);
    return lastThursday;
  }