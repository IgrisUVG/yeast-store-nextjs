"use client";

import useSearchParamsRouter from "@/hooks/use-search-params-router";
import { FormEvent } from "react";

interface SearchInputProps {
  name: string,
}

export default function SearchInput({ name }: SearchInputProps) {
  const router = useSearchParamsRouter();
  const searchValue = router.get(name);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const newSearchValue = formData.get(name) as string | null;

    const shouldBeAdded = newSearchValue !== null && newSearchValue.trim() !== "";

    if (shouldBeAdded) {
      router.set(name, newSearchValue);
    } else {
      router.delete(name);
    }
  }

  return <form className="search-input-wrapper" method="GET" onSubmit={handleSubmit}>
    <input type="text" placeholder="Search by name, tagline, rating or price" className="search-input" name={name} defaultValue={searchValue ?? ""} />
    <button type="submit" className="search-button" aria-label="Search">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>;
}
