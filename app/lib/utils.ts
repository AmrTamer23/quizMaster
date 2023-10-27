export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    
    const formattedSeconds = remainingSeconds.toFixed().padStart(2, "0");
  
    return `${minutes}:${formattedSeconds}`;
  }
  