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
      className="relative h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="relative flex h-160 items-center justify-center">
        <button
          className="absolute z-10 -ml-16 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
          style={{
            anchorName,
          }}
        >
          <div>Reference</div>
        </button>

        <div
          className={clsx(
            "absolute z-20 flex h-48 w-24 items-center justify-center rounded bg-cyan-500 text-center text-sm leading-none font-bold text-white shadow-lg",
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
            className="absolute -z-1 m-[inherit] bg-inherit"
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
