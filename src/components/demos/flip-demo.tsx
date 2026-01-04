import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, flip, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";
import clsx from "clsx";

export const FlipDemo = () => {
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
          left: `${x}px`,
          top: `${y}px`,
        });
        floating.dataset.visible = "true";
      });
    });
  }, []);

  useEffect(() => {
    setIsPositioned(true);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Flip</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Changes the placement of your floating element to keep it in view.
        </p>
      </div>

      <BrowserFrame
        label="Scroll down"
        scrollable="y"
        className="h-80 bg-slate-100 dark:bg-slate-900"
      >
        <div className="h-[800px] flex flex-col items-center justify-center gap-[400px] relative">
          <p className="text-slate-500 italic">Scroll down to see flip</p>

          <button
            ref={referenceRef}
            className="z-10 h-24 w-24 border-2 flex-none border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className={clsx(
              "block absolute z-20 bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap pointer-events-none duration-0",
              isPositioned ? "opacity-100" : "opacity-0",
              isPositioned ? "transition-transform ease-out duration-300" : ""
            )}
          >
            Tooltip
          </div>

          <div className="h-[200px]" />
        </div>
      </BrowserFrame>
    </div>
  );
};
