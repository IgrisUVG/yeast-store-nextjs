import { useState } from "react";

export function useDebounce<Params extends unknown[]>(fn: (...args: Params) => void, delay: number) {
  const [timerID, setTimerID] = useState<null | NodeJS.Timeout | number>(null);
  return (...args: Params) => {
    if (timerID !== null) {
      clearTimeout(timerID);
    }
    setTimerID(setTimeout(() => fn(...args), delay));
  }
}
