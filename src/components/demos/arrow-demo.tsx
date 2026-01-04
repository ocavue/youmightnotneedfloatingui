import React, { useLayoutEffect, useRef, useState } from "react";
import {
  computePosition,
  offset,
  shift,
  arrow,
  autoUpdate,
} from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const ArrowDemo = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isPositioned, setIsPositioned] = useState(false);

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
          arrow({ element: arrowEl, padding: 5 }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        });
        setIsPositioned(true);

        if (middlewareData.arrow) {
          const { x: arrowX, y: arrowY, centerOffset } = middlewareData.arrow;
          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[placement.split("-")[0]]!;

          arrowEl.dataset.hidden = centerOffset === 0 ? "false" : "true";

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
    <BrowserFrame
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="h-160 flex flex-col items-center justify-center relative">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center -ml-16"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="absolute top-0 left-0 z-20 w-24 h-48 pointer-events-none will-change-transform"
          style={{
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className="bg-rose-600 text-white w-24 h-48 rounded shadow-lg text-sm font-bold flex items-center justify-center"
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.9)",
              transition: "transform 150ms ease-out",
            }}
          >
            Popover
            <div
              ref={arrowRef}
              className="absolute bg-rose-600 w-2 h-2 rotate-45 data-[hidden=true]:translate-x-2 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};
