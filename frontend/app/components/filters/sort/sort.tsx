"use client";

import useSearchParamsRouter from "@/hooks/use-search-params-router";

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
  const router = useSearchParamsRouter();
  const searchValue = router.get(name);

  const isActive = (
    searchValue === value ||
    isDefault && searchValue === null
  );

  function handleClick() {
    if (isDefault) {
      router.delete(name);
    } else {
      router.set(name, value);
    }
  }

  return <button
    onClick={handleClick}
    className={`sort-button ${isActive ? `active-sort` : ``}`}
  >{label}</button>;
}
