import { computePosition, offset, size, autoUpdate } from "@floating-ui/dom"
import React, { useLayoutEffect, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

export function SizeDemoFUI({
  offsetValue = 5,
  sizePaddingValue = 8,
}: {
  offsetValue?: number
  sizePaddingValue?: number
}) {
  const referenceRef = useRef<HTMLButtonElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    if (!reference || !floating) return

    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement: "bottom",
        middleware: [
          offset(offsetValue),
          size({
            padding: sizePaddingValue,
            rootBoundary: "document",
            apply({ availableHeight, elements }) {
              const nextMaxHeight = Math.max(0, availableHeight)
              Object.assign(elements.floating.style, {
                maxHeight: `${nextMaxHeight}px`,
              })
            },
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
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="h-160 flex flex-col items-center justify-center relative">
        <button
          ref={referenceRef}
          className="z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="absolute top-0 left-0 z-20 w-32 pointer-events-none will-change-transform overflow-hidden rounded shadow-lg bg-rose-500 text-white h-290"
          style={{
            maxHeight: 0,
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className="grid h-full place-items-center text-sm font-bold"
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.95)",
              transformOrigin: "top",
              transition: "transform 150ms ease-out",
            }}
          >
            Dropdown
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
