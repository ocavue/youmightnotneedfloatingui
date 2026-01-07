import {
  computePosition,
  offset,
  autoUpdate,
  type Placement,
} from "@floating-ui/dom"
import { clsx } from "clsx"
import React, { useLayoutEffect, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

interface DotButtonProps {
  placement: Placement
  current: Placement
  onClick: (placement: Placement) => void
  className?: string
}

function DotButton({ placement, current, onClick, className }: DotButtonProps) {
  return (
    <button
      onClick={() => onClick(placement)}
      className={clsx("p-4 transition hover:scale-125", className)}
      aria-label={`Set placement to ${placement}`}
    >
      <div
        className={clsx(
          "h-4 w-4 rounded-full border-2",
          current === placement
            ? "border-slate-800 bg-slate-800 dark:border-slate-200 dark:bg-slate-200"
            : "border-slate-400",
        )}
      />
    </button>
  )
}

export function PlacementDemoFUI({
  offsetValue = 5,
}: {
  offsetValue?: number
} = {}) {
  const [placement, setPlacement] = useState<Placement>("top")
  const referenceRef = useRef<HTMLButtonElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    const reference = referenceRef.current
    const floating = floatingRef.current
    if (!reference || !floating) return

    return autoUpdate(reference, floating, () => {
      void computePosition(reference, floating, {
        placement,
        middleware: [offset(offsetValue)],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          transform: `translate(${x}px, ${y}px)`,
        })
        setIsPositioned(true)
      })
    })
  }, [placement, offsetValue])

  return (
    <BrowserFrame
      label="Click the dots"
      className="relative h-80 bg-slate-100 dark:bg-slate-900"
    >
      <div className="relative flex h-full w-full items-center justify-center p-20">
        <div className="pointer-events-auto absolute inset-0">
          {/* Top dots */}
          <div className="absolute top-0 left-1/2 flex -translate-x-1/2">
            <DotButton
              placement="top-start"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="top"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="top-end"
              current={placement}
              onClick={setPlacement}
            />
          </div>

          {/* Bottom dots */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2">
            <DotButton
              placement="bottom-start"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="bottom"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="bottom-end"
              current={placement}
              onClick={setPlacement}
            />
          </div>

          {/* Left dots */}
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 flex-col">
            <DotButton
              placement="left-start"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="left"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="left-end"
              current={placement}
              onClick={setPlacement}
            />
          </div>

          {/* Right dots */}
          <div className="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col">
            <DotButton
              placement="right-start"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="right"
              current={placement}
              onClick={setPlacement}
            />
            <DotButton
              placement="right-end"
              current={placement}
              onClick={setPlacement}
            />
          </div>
        </div>

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
            ["top-start", "top-end", "bottom-start", "bottom-end"].includes(
              placement,
            ) && "w-36",
          )}
          style={{
            opacity: isPositioned ? 1 : 0,
            transition: "opacity 150ms ease-out",
          }}
        >
          <div
            className={clsx(
              "rounded bg-rose-500 px-3 py-1.5 text-center text-sm font-bold whitespace-nowrap text-white shadow-lg",
              ["top-start", "top-end", "bottom-start", "bottom-end"].includes(
                placement,
              ) && "w-36",
            )}
            style={{
              transform: isPositioned ? "scale(1)" : "scale(0.9)",
              transition: "transform 150ms ease-out",
            }}
          >
            {placement}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
