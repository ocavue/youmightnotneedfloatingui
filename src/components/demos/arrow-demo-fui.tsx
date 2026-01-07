import {
  arrow,
  autoUpdate,
  computePosition,
  offset,
  shift,
} from "@floating-ui/dom"
import { useLayoutEffect, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

export function ArrowDemoFUI({
  offsetValue = 16,
  shiftPaddingValue = 5,
  arrowPaddingValue = 5,
}: {
  offsetValue?: number
  shiftPaddingValue?: number
  arrowPaddingValue?: number
}) {
  const referenceRef = useRef<HTMLButtonElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    const arrowEl = arrowRef.current
    if (!reference || !floating || !arrowEl) return

    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement: "right",
        middleware: [
          offset(offsetValue),
          shift({ padding: shiftPaddingValue }),
          arrow({ element: arrowEl, padding: arrowPaddingValue }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        })
        setIsPositioned(true)

        if (middlewareData.arrow) {
          const { x: arrowX, y: arrowY, centerOffset } = middlewareData.arrow
          const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[placement.split("-")[0]]!

          arrowEl.dataset.hidden = centerOffset === 0 ? "false" : "true"

          Object.assign(arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px",
          })
        }
      })
    })
  }, [])

  return (
    <BrowserFrame
      label="Scroll the container"
      scrollable="y"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="relative flex h-160 flex-col items-center justify-center">
        <button
          ref={referenceRef}
          className="z-10 -ml-16 flex h-24 w-24 flex-none items-center justify-center border-2 border-dashed border-slate-900 bg-slate-50 p-2 text-sm font-bold dark:border-slate-100 dark:bg-slate-800"
        >
          Reference
        </button>

        <div
          ref={floatingRef}
          className="pointer-events-none absolute top-0 left-0 z-20 h-48 w-24 will-change-transform"
          style={{
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className="flex h-48 w-24 items-center justify-center rounded bg-rose-500 text-sm font-bold text-white shadow-lg"
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.9)",
              transition: "transform 150ms ease-out",
            }}
          >
            Popover
            <div
              ref={arrowRef}
              className="absolute h-2 w-2 rotate-45 bg-rose-500 transition-transform duration-300 data-[hidden=true]:translate-x-2"
            />
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
