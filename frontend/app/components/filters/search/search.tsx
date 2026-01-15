"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

interface SearchInputProps {
  name: string,
}

// Product page
// Filters
// 1. immediate response
// 2. hook

export default function SearchInput({ name }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(name);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const newSearchValue = formData.get(name) as string | null;

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
  }

  return <form className="search-input-wrapper" method="GET" onSubmit={handleSubmit}>
    <input type="text" placeholder="Search by name, tagline, rating or price" className="search-input" name={name} defaultValue={searchValue ?? ""} />
    <button type="submit" className="search-button" aria-label="Search">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>;
}
