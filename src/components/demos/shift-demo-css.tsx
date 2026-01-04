import { useId, useRef } from "react";
import { BrowserFrame } from "../browser-frame";

export const ShiftDemoCSS = () => {
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const anchorName = `--anchor-${id}`;

  return (
    <BrowserFrame
      boundaryRef={boundaryRef}
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900 relative"
    >
      <div className="h-160 flex items-center justify-center">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          style={{
            anchorName,
          }}
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="absolute z-20 w-20 h-40 pointer-events-none will-change-transform"
          style={{
            transition: "opacity 150ms ease-out",
            positionAnchor: anchorName,
            positionArea: "right",
            marginLeft: 5,
          }}
        >
          <div
            className="bg-cyan-600 text-white rounded shadow-lg text-sm font-bold flex items-center justify-center w-20 h-40 text-center leading-none"
            style={{
              transition: "transform 150ms ease-out",
            }}
          >
            Popover
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};
