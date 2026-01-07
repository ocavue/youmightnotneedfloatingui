import { computePosition, offset, flip, autoUpdate } from "@floating-ui/dom"
import { clsx } from "clsx"
import React, { useLayoutEffect, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

export function FlipDemoFUI({ offsetValue = 5 }: { offsetValue?: number }) {
  const referenceRef = useRef<HTMLButtonElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    if (!reference || !floating) return

    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement: "top",
        middleware: [offset(offsetValue), flip()],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        })
        setIsPositioned(true)
      })
    })
  }, [offsetValue])

  return (
    <BrowserFrame
      label="Scroll down"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="relative flex h-160 flex-col items-center justify-center">
        <button
          ref={referenceRef}
          className="z-10 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className={clsx(
            "pointer-events-none absolute top-0 left-0 z-20 will-change-transform",
            "transition-opacity duration-150 ease-out",
            isPositioned ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="rounded bg-rose-500 px-3 py-1.5 text-sm font-bold whitespace-nowrap text-white shadow-lg"
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.85)",
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
