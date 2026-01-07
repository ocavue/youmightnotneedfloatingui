import { useId, useInsertionEffect } from "react"
import { BrowserFrame } from "../browser-frame"

declare module "react" {
  interface CSSProperties {
    "--size-max-height-from"?: string
    "--size-max-height-to"?: string
  }
}

export const SizeDemoCSS = ({
  offsetValue = 5,
  sizePaddingValue = 8,
}: {
  offsetValue?: number
  sizePaddingValue?: number
}) => {
  const id = useId()
  const viewTimelineName = `--timeline-${id}`
  const anchorName = `--anchor-${id}`

  useInsertionEffect(() => {
    const styleId = "keyframe-max-height-style"
    if (document.getElementById("styleId")) return
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes keyframe-max-height {
        from {
          max-height: var(--size-max-height-from);
        }
        to {
          max-height: var(--size-max-height-to);
        }
      }
    `
    document.head.appendChild(style)
  }, [])

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
      <div className="h-160 flex flex-col items-center justify-center py-10">
        <button
          className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          style={{
            viewTimelineName: viewTimelineName,
            viewTimelineAxis: "block",
            anchorName: anchorName,
          }}
        >
          Reference
        </button>

        <div
          className="absolute z-20 w-32 pointer-events-none will-change-transform overflow-hidden rounded shadow-lg bg-cyan-500 text-white h-290"
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
