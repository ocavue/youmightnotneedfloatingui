import React, { useLayoutEffect, useRef } from "react";
import { computePosition, offset, flip, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const FlipDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    if (!reference || !floating) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: "top",
        middleware: [
          offset(5),
          flip(),
        ],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });
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
            className="z-10 h-24 w-24 border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className="absolute z-20 bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            Tooltip
          </div>

          <div className="h-[200px]" />
        </div>
      </BrowserFrame>
    </div>
  );
};

