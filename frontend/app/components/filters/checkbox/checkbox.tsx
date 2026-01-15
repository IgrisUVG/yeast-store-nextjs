"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

interface CheckboxFilterProps {
  name: string,
  value: string,
  label: string,
}

export default function CheckboxFilter({
  name,
  value,
  label,
}: CheckboxFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.getAll(name);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newParamValue = evt.target.value;
    const shouldBeAdded = evt.target.checked;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (shouldBeAdded) {
      newSearchParams.append(name, newParamValue);
    } else {
      newSearchParams.delete(name, newParamValue);
    }

    const newURL = `${pathname}${newSearchParams.size === 0 ? `` : `?${newSearchParams.toString()}`}`;
    router.push(newURL, {
      scroll: false,
    });
  }

  return <label className="checkbox-container">
    {label}
    <input
      type="checkbox"
      checked={searchValue.includes(value)}
      onChange={handleChange} 
      name={name}
      value={value}
    />
    <span className="checkmark"></span>
  </label>;
}
