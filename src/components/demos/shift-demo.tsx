import React, { useLayoutEffect, useRef } from "react";
import { computePosition, offset, shift, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const ShiftDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    if (!reference || !floating) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: "right",
        middleware: [
          offset(5),
          shift({
            padding: 5,
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
          display: "flex",
        });
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Shift</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Shifts your floating element to keep it in view.
        </p>
      </div>

      <BrowserFrame 
        label="Scroll the container"
        scrollable="y" 
        className="h-80 bg-slate-100 dark:bg-slate-900"
      >
        <div ref={boundaryRef} className="h-160 flex items-center justify-center relative">
          <button
            ref={referenceRef}
            className="z-10 h-24 w-24 border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className="absolute z-20 bg-rose-600 text-white rounded shadow-lg text-sm font-bold flex items-center justify-center w-20 h-40 text-center leading-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "none",
            }}
          >
            Popover
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

