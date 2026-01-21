"use client";

import useSearchParamsRouter from "@/hooks/use-search-params-router";
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
  const router = useSearchParamsRouter();
  const searchValue = router.getAll(name);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const newParamValue = evt.target.value;
    const shouldBeAdded = evt.target.checked;

    if (shouldBeAdded) {
      router.append(name, newParamValue);
    } else {
      router.delete(name, newParamValue);
    }
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
