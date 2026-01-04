import clsx from "clsx";
import { useId, useRef } from "react";
import { BrowserFrame } from "../browser-frame";

export const ShiftDemoCSS = ({
  debug = false,
  offsetValue = 5,
  shiftPaddingValue = 5,
}: {
  debug?: boolean;
  offsetValue?: number;
  shiftPaddingValue?: number;
} = {}) => {
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
      <div className="h-160 flex items-center justify-center ">
        <button className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center relative">
          <div>Reference</div>
        </button>

        {/* An invisible sticky block for positioning. There might be a better way to do this. See also discussion in https://github.com/w3c/csswg-drafts/issues/12682#issuecomment-3660793867 */}
        <div
          className={clsx(
            "sticky h-40 pointer-events-none",
            debug ? "-ml-4 w-4 bg-amber-500" : "-ml-px w-px opacity-0"
          )}
          style={{
            top: shiftPaddingValue,
            bottom: shiftPaddingValue,
            anchorName,
          }}
        ></div>

        <div
          className="absolute z-20 w-20 h-40"
          style={{
            transition: "opacity 150ms ease-out",
            positionAnchor: anchorName,
            positionArea: "right",
            marginLeft: offsetValue,
          }}
        >
          <div className="bg-cyan-600 text-white rounded shadow-lg text-sm font-bold flex items-center justify-center w-20 h-40 text-center leading-none">
            Popover
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
};
