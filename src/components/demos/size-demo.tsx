import React, { useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, size, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const SizeDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = useState(false);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    if (!reference || !floating) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: "bottom",
        middleware: [
          offset(5),
          size({
            apply({ availableHeight, elements }) {
              Object.assign(elements.floating.style, {
                maxHeight: `${Math.max(0, availableHeight)}px`,
              });
            },
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        });
        setIsPositioned(true);
      });
    });
  }, []);

  return (
    <BrowserFrame 
      label="Scroll the container"
      scrollable="y" 
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="h-160 flex flex-col items-center pt-20 relative">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="absolute top-0 left-0 z-20 w-48 pointer-events-none will-change-transform"
          style={{
            height: "300px", // Target height
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className="bg-rose-600 text-white w-48 rounded shadow-lg text-sm font-bold overflow-hidden flex items-center justify-center"
            style={{
              height: "300px",
              transform: isPositioned ? "scale(1)" : "scale(0.9)",
              transition: "transform 150ms ease-out",
            }}
          >
            Dropdown
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};

