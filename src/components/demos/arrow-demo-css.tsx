import clsx from "clsx"
import { useId, useRef } from "react"

import { BrowserFrame } from "../browser-frame"

declare module "react" {
  interface CSSProperties {
    "--d"?: string
    "--s"?: string
  }
}

export function ArrowDemoCSS({
  debug = true,
  offsetValue = 16,
}: {
  debug?: boolean
  offsetValue?: number
  // TODO: shiftPaddingValue is not used yet because the popover doesn't shift.
  shiftPaddingValue?: number
  // TODO: arrowPaddingValue is not used yet because the arrow doesn't move against the popover.
  arrowPaddingValue?: number
}) {
  const boundaryRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const anchorName = `--anchor-${id}`

  return (
    <BrowserFrame
      boundaryRef={boundaryRef}
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900 relative"
    >
      <div className="h-160 flex items-center justify-center relative">
        <button
          className="absolute z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          style={{
            anchorName,
          }}
        >
          <div>Reference</div>
        </button>

        <div
          id="tooltip"
          className={clsx(
            "absolute z-20 w-20 h-40 bg-cyan-500 text-white rounded shadow-lg text-sm font-bold flex items-center justify-center text-center leading-none",
            debug ? "before:bg-amber-500" : "before:bg-inherit",
          )}
          style={{
            "--d": "0.6em" /* distance between anchor and tooltip */,
            "--s": "0.4em" /* tail size */,
            positionAnchor: anchorName,
            positionArea: "right",

            left: `${offsetValue}px`,
            margin: "var(--d)",
            marginLeft: "0",
            positionTry:
              "flip-inline, flip-start, flip-block, flip-start flip-inline",
          }}
        >
          Popover
          <div
            id="tooltip-before"
            className="absolute -z-1 bg-inherit m-[inherit]"
            style={{
              inset: "calc(-1 * var(--d))",
              // Taken from https://frontendmasters.com/blog/perfectly-pointed-tooltips-all-four-sides/
              clipPath: `polygon(
                calc(50% - var(--s)) var(--d),
                50% 0.2em,
                calc(50% + var(--s)) var(--d),
                calc(100% - var(--d)) calc(50% - var(--s)),
                calc(100% - 0.2em) 50%,
                calc(100% - var(--d)) calc(50% + var(--s)),
                calc(50% + var(--s)) calc(100% - var(--d)),
                50% calc(100% - 0.2em),
                calc(50% - var(--s)) calc(100% - var(--d)),
                var(--d) calc(50% + var(--s)),
                0.2em 50%,
                var(--d) calc(50% - var(--s))
            )`,
            }}
          ></div>
        </div>
      </div>
    </BrowserFrame>
  )
}
