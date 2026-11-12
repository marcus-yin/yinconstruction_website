"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Accessible accordion: native buttons (keyboard support for free),
 * aria-expanded/aria-controls wiring, labelled regions. No animation
 * beyond a chevron rotation (safe under prefers-reduced-motion).
 */
export default function Accordion({
  items,
  idPrefix = "accordion",
}: {
  items: AccordionItem[];
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="divide-y divide-steel-200 rounded-lg border border-steel-200 bg-white">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-base font-semibold text-navy-900 hover:bg-navy-50"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-steel-500 transition-transform motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="text-sm leading-relaxed text-steel-700">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
