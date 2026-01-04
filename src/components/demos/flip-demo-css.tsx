import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, flip, autoUpdate } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";
import { clsx } from "clsx";

// TODO: This doesn't work. Maybe browser doesn't support it because of performance reasons.
// See https://drafts.csswg.org/css-anchor-position-1/#scroll
// For performance reasons, implementations usually perform scrolling on a separate scrolling/"compositing" thread, which has very limited capabilities (simple movement/transforms/etc., but no layout or similar expensive operations) and thus can be relied upon to respond to scrolling fast enough to be considered "instant" to human perception.
export const FlipDemoCSS = ({ offsetValue = 5 }: { offsetValue?: number }) => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const anchorName = `--anchor-${id}`;

  return (
    <BrowserFrame
      label="Scroll down"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900 relative"
    >
      <div className="h-160 flex flex-col items-center justify-center ">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 border-2 flex-none border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          style={{
            anchorName,
          }}
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className={clsx(
            "absolute top-0 left-0 z-20 pointer-events-none  ",
            "transition-opacity duration-150 ease-out"
          )}
          style={{
            
            positionAnchor: anchorName,
            positionArea: "top",
            bottom: offsetValue,
            positionTryFallbacks: "bottom",
            positionVisibility: "anchors-visible",
          }}
        >
          <div
            className="bg-cyan-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap"
            style={{
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
