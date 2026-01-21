import "./size-demo-css.css"

import { useId } from "react"

import { BrowserFrame } from "../browser-frame"

declare module "react" {
  interface CSSProperties {
    "--size-max-height-from"?: string
    "--size-max-height-to"?: string
  }
}

export function SizeDemoCSS({
  offsetValue = 5,
  sizePaddingValue = 8,
}: {
  offsetValue?: number
  sizePaddingValue?: number
}) {
  const id = useId()
  const viewTimelineName = `--timeline-${id}`
  const anchorName = `--anchor-${id}`

  return (
    <BrowserFrame
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
      boundaryStyle={{
        "--size-max-height-from": `0px`,
        "--size-max-height-to": `calc(100cqh - ${
          sizePaddingValue + Math.max(sizePaddingValue, offsetValue)
        }px)`,
        timelineScope: viewTimelineName,
        containerType: "size",
      }}
    >
      <div className="flex h-160 flex-col items-center justify-center py-10">
        <button
          className="z-10 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
          style={{
            viewTimelineName: viewTimelineName,
            viewTimelineAxis: "block",
            anchorName: anchorName,
          }}
        >
          Reference
        </button>

        <div
          className="pointer-events-none absolute z-20 h-290 w-32 overflow-hidden rounded bg-cyan-500 text-white shadow-lg will-change-transform"
          style={{
            marginTop: offsetValue,
            positionAnchor: anchorName,
            positionArea: "bottom",

            // Start the animation when the dropdown is fully entered the viewport and there is `offsetValue + sizePaddingValue` of space below it.
            animationRangeStart: `contain ${offsetValue + sizePaddingValue}px`,

            // End the animation when the dropdown is fully exited the viewport.
            animationRangeEnd: `exit 100%`,
            animationTimeline: viewTimelineName,
            animationFillMode: "both",
            animationTimingFunction: "linear",
            animationName: "keyframe-max-height",
          }}
        >
          <div className="grid h-full place-items-center text-sm font-bold">
            Dropdown
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
