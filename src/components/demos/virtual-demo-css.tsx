import clsx from "clsx"
import React, { useId, useRef, useState } from "react"

import { BrowserFrame } from "../browser-frame"

export function VirtualDemoCSS({ debug = false }: { debug?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const latestPointRef = useRef<{ x: number; y: number } | null>(null)
  const frameRef = useRef<number | null>(null)
  const id = useId()
  const anchorName = `--anchor-${id}`

  const handleMouseMove = ({
    clientX,
    clientY,
  }: React.MouseEvent | React.PointerEvent) => {
    latestPointRef.current = { x: clientX, y: clientY }

    if (frameRef.current != null) return

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null

      const point = latestPointRef.current
      const container = containerRef.current
      const anchor = anchorRef.current
      if (!point || !anchor || !container) return

      const containerRect = container.getBoundingClientRect()

      const x = point.x - containerRect.left
      const y = point.y - containerRect.top

      Object.assign(anchor.style, {
        transform: `translate(${x}px, ${y}px)`,
      })
    })
  }

  return (
    <BrowserFrame
      label="Move your mouse"
      className="h-80 overflow-hidden bg-slate-100 dark:bg-slate-900"
    >
      <div
        className="relative h-full w-full"
        ref={containerRef}
        onPointerMove={handleMouseMove}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
      >
        <div className="flex h-full items-center justify-center text-slate-400 italic select-none">
          Move your mouse in here
        </div>

        <div
          ref={anchorRef}
          className={clsx(
            "absolute top-0 left-0 z-10 h-2 w-2 transform",
            debug ? "bg-amber-500" : "",
          )}
          style={{
            anchorName,
          }}
        ></div>

        <div
          className="pointer-events-none absolute top-0 left-0 z-20"
          style={{
            positionAnchor: anchorName,
            positionArea: "bottom span-right",
          }}
        >
          <div
            className="rounded bg-cyan-500 px-3 py-1.5 text-sm font-bold whitespace-nowrap text-white shadow-lg transition-all"
            style={{
              transform: isOpen ? "scale(1)" : "scale(0.8)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            Tooltip
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
