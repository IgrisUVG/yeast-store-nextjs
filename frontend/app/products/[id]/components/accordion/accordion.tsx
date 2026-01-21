"use client";

import { PropsWithChildren, ReactNode, useState } from "react";

interface AccordionProps extends PropsWithChildren {
  trigger: ReactNode | string,
}

export default function Accordion({
  children,
  trigger,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return <section className="accordion-section">
    <div className={`accordion-item ${isOpen ? "active" : ""}`}>
      <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
        <i className="fa-solid fa-chevron-down accordion-icon"></i>
      </div>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  </section>;
}
