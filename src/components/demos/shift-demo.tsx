import React, { useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, shift, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";
import { DemoHeader } from "./demo-header";

export const ShiftDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = useState(false);

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
            boundary: boundaryRef.current ?? undefined,
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
    <div className="flex flex-col gap-4">
      <DemoHeader
        title="Shift"
        description="Shifts your floating element to keep it in view."
      />

      <BrowserFrame 
        label="Scroll the container"
        scrollable="y" 
        className="h-80 bg-slate-100 dark:bg-slate-900"
      >
        <div ref={boundaryRef} className="h-160 flex items-center justify-center relative">
          <button
            ref={referenceRef}
            className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className="absolute top-0 left-0 z-20 w-20 h-40 pointer-events-none will-change-transform"
            style={{
              opacity: isPositioned ? 1 : 0,
              transition: "opacity 150ms ease-out",
            }}
          >
            <div
              className="bg-rose-600 text-white rounded shadow-lg text-sm font-bold flex items-center justify-center w-20 h-40 text-center leading-none"
              style={{
                transform: isPositioned ? "scale(1)" : "scale(0.9)",
                transition: "transform 150ms ease-out",
              }}
            >
              Popover
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

