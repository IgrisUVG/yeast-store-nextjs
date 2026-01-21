"use client";

import { useDebounce } from "@/hooks/use-debounce";
import useSearchParamsRouter from "@/hooks/use-search-params-router";
import { ChangeEvent, useState } from "react";

interface SearchInputProps {
  name: string,
}

export default function SearchInputInstant({ name }: SearchInputProps) {
  const router = useSearchParamsRouter()
  const searchValue = router.get(name);

  const [enteredValue, setEnteredValue] = useState(searchValue);

  const saveSearchParam = useDebounce(function(newSearchValue: string) {
    const shouldBeAdded = newSearchValue !== null && newSearchValue.trim() !== "";

    if (shouldBeAdded) {
      router.set(name, newSearchValue);
    } else {
      router.delete(name);
    }
  }, 500);

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    const input = evt.target;
    const newSearchValue = input.value;

    setEnteredValue(newSearchValue);
    saveSearchParam(newSearchValue);
  }

  return <div className="search-input-wrapper">
    <input type="text" placeholder="Search by name, tagline, rating or price" className="search-input" name={name} onChange={handleInputChange} value={enteredValue ?? ""} />
    <button className="search-button" aria-label="Search" disabled>
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>;
}
