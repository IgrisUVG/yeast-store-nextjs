"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SortButtonProps {
  label: string,
  name: string,
  value: string,
  isDefault?: boolean,
}

export default function SortButton({
  label,
  name,
  value,
  isDefault = false,
}: SortButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(name);

  const isActive = (
    searchValue === value ||
    isDefault && searchValue === null
  );

  function handleClick() {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (isDefault) {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, value);
    }

    const newURL = `${pathname}${newSearchParams.size === 0 ? `` : `?${newSearchParams.toString()}`}`;
    router.push(newURL, {
      scroll: false,
    });
  }

  return <button
    onClick={handleClick}
    className={`sort-button ${isActive ? `active-sort` : ``}`}
  >{label}</button>;
}
