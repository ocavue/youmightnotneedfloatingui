import React, { useLayoutEffect, useRef } from "react";
import { computePosition, offset, size, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const SizeDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

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
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Size</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Changes the size of your floating element to keep it in view.
        </p>
      </div>

      <BrowserFrame 
        label="Scroll the container"
        scrollable="y" 
        className="h-80 bg-slate-100 dark:bg-slate-900"
      >
        <div className="h-[600px] flex flex-col items-center pt-20 relative">
          <button
            ref={referenceRef}
            className="z-10 h-24 w-24 border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className="absolute z-20 bg-rose-600 text-white w-48 rounded shadow-lg text-sm font-bold overflow-hidden flex items-center justify-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "300px", // Target height
            }}
          >
            Dropdown
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

