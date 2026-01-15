"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface SearchInputProps {
  name: string,
}

export default function SearchInputInstant({ name }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(name);

  const [enteredValue, setEnteredValue] = useState(searchValue);
  const [timerID, setTimerID] = useState<NodeJS.Timeout | number | null>(null);

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    const input = evt.target;
    const newSearchValue = input.value;

    setEnteredValue(newSearchValue);

    if (timerID !== null) {
      clearTimeout(timerID);
    }

    setTimerID(setTimeout(() => {
      const shouldBeAdded = newSearchValue !== null && newSearchValue.trim() !== "";

      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (shouldBeAdded) {
        newSearchParams.set(name, newSearchValue);
      } else {
        newSearchParams.delete(name);
      }
      const newURL = `${pathname}${newSearchParams.size === 0 ? `` : `?${newSearchParams.toString()}`}`;
      router.push(newURL, {
        scroll: false,
      });
    }, 500));
  }

  return <div className="search-input-wrapper">
    <input type="text" placeholder="Search by name, tagline, rating or price" className="search-input" name={name} onChange={handleInputChange} value={enteredValue ?? ""} />
    <button className="search-button" aria-label="Search" disabled>
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>;
}
