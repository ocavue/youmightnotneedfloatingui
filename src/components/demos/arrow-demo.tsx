import React, { useLayoutEffect, useRef } from "react";
import { computePosition, offset, shift, arrow, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const ArrowDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    const arrowEl = arrowRef.current;
    if (!reference || !floating || !arrowEl) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: "right",
        middleware: [
          offset(16),
          shift({ padding: 5 }),
          arrow({ element: arrowEl }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[placement.split("-")[0]]!;

          Object.assign(arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px",
          });
        }
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Arrow</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Dynamically positions an arrow element that is center-aware.
        </p>
      </div>

      <BrowserFrame 
        label="Scroll the container"
        scrollable="y" 
        className="h-80 bg-slate-100 dark:bg-slate-900"
      >
        <div className="h-[600px] flex items-center justify-center relative">
          <button
            ref={referenceRef}
            className="z-10 h-24 w-24 border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center ml-[-40%]"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className="absolute z-20 bg-rose-600 text-white w-24 h-48 rounded shadow-lg text-sm font-bold flex items-center justify-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            Popover
            <div
              ref={arrowRef}
              className="absolute bg-rose-600 w-2 h-2 rotate-45"
            />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

