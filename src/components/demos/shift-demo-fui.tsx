import { autoUpdate, computePosition, offset, shift } from "@floating-ui/dom"
import { useLayoutEffect, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

export function ShiftDemoFUI({
  offsetValue = 5,
  shiftPaddingValue = 5,
}: {
  offsetValue?: number
  shiftPaddingValue?: number
} = {}) {
  const referenceRef = useRef<HTMLButtonElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const boundaryRef = useRef<HTMLDivElement>(null)
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    if (!reference || !floating) return

    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement: "right",
        middleware: [
          offset(offsetValue),
          shift({
            padding: shiftPaddingValue,
            boundary: boundaryRef.current ?? undefined,
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        })
        setIsPositioned(true)
      })
    })
  }, [])

  return (
    <BrowserFrame
      boundaryRef={boundaryRef}
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="relative flex h-160 items-center justify-center">
        <button
          ref={referenceRef}
          className="z-10 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="pointer-events-none absolute top-0 left-0 z-20 h-40 w-20 will-change-transform"
          style={{
            opacity: isPositioned ? 1 : 0,
          }}
        >
          <div
            className="flex h-40 w-20 items-center justify-center rounded bg-rose-500 text-center text-sm leading-none font-bold text-white shadow-lg"
            style={{
              transition: "transform 150ms ease-out",
            }}
          >
            Popover
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
