import { clsx } from "clsx"
import { useId } from "react"

import { BrowserFrame } from "../browser-frame"

// Works on Chrome 143.0.7499.170
// Doesn't work on Chrome Canary 145.0.7615.0
// Doesn't work on Safari Technology Preview Release 234 (WebKit 20624.1.6.19.3)
export function FlipDemoCSS({ offsetValue = 5 }: { offsetValue?: number }) {
  const id = useId()
  const anchorName = `--anchor-${id}`

  return (
    <BrowserFrame
      label="Scroll down"
      scrollable="y"
      className="relative h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="flex h-160 flex-col items-center justify-center">
        <button
          className="z-10 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
          style={{
            anchorName,
          }}
        >
          Reference
        </button>

        <div
          className={clsx(
            "pointer-events-none absolute z-20",
            "transition-opacity duration-150 ease-out",
          )}
          style={{
            positionAnchor: anchorName,
            positionArea: "top",
            bottom: offsetValue,
            positionTryFallbacks: "flip-block",
            positionVisibility: "anchors-visible",
          }}
        >
          <div
            className="rounded bg-cyan-500 px-3 py-1.5 text-sm font-bold whitespace-nowrap text-white shadow-lg"
            style={{
              transition: "transform 150ms ease-out",
            }}
          >
            Tooltip
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
