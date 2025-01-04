export function getLastThursday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceThursday = (dayOfWeek >= 4) ? dayOfWeek - 4 : dayOfWeek + 3;
    const lastThursday = new Date(today);
    lastThursday.setDate(today.getDate() - daysSinceThursday);
    console.log(lastThursday);
    return lastThursday.toISOString().split("T")[0];
  }
  export function formatTime(duration: number){
    const minutes = Math.floor(duration/60);
    const seconds = Math.floor(duration%60);
    const hours = Math.floor(duration/3600)
      return `${hours>0? hours.toString().padStart(2,"0") + ":" :''}${minutes>59? (minutes%60).toString().padStart(2,"0") : minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
export const BASE_URL = 'http://localhost:8080'