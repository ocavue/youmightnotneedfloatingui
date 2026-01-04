import React, { useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, flip, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";
import { clsx } from "clsx";

export const FlipDemoFUI = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = useState(false);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    if (!reference || !floating) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: "top",
        middleware: [offset(5), flip()],
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
      label="Scroll down"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="h-160 flex flex-col items-center justify-center relative">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 border-2 flex-none border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className={clsx(
            "absolute top-0 left-0 z-20 pointer-events-none will-change-transform",
            "transition-opacity duration-150 ease-out",
            isPositioned ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap"
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.85)",
              transition: "transform 150ms ease-out",
            }}
          >
            Tooltip
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};
