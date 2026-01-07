import { clsx } from "clsx"
import React, { useLayoutEffect, useRef } from "react"
import { mergeRefs } from "react-merge-refs"

interface BrowserFrameProps {
  children?: React.ReactNode
  scrollable?: "both" | "x" | "y" | "none"
  className?: string
  label?: string
  boundaryRef?: React.Ref<HTMLDivElement>
  boundaryStyle?: React.CSSProperties
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  scrollable = "none",
  className = "",
  label,
  boundaryRef,
  boundaryStyle,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return

    if (scrollable === "y" || scrollable === "both") {
      container.scrollTop =
        (container.scrollHeight - container.clientHeight) / 2
    }

    if (scrollable === "x" || scrollable === "both") {
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2
    }
  }, [scrollable])

  return (
    <div
      className={clsx(
        "flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950",
        className,
      )}
    >
      {/* Browser Header */}
      <div className="relative flex h-10 shrink-0 items-center border-b border-slate-200 bg-slate-100/80 px-4 select-none dark:border-slate-800 dark:bg-slate-900/80">
        {/* MacOS Traffic Lights */}
        <div className="z-10 flex gap-2">
          <div className="h-3 w-3 rounded-full border border-red-600/50 bg-red-500" />
          <div className="h-3 w-3 rounded-full border border-amber-500/50 bg-amber-400" />
          <div className="h-3 w-3 rounded-full border border-emerald-600/50 bg-emerald-500" />
        </div>

        {label && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
            <span className="max-w-[60%] truncate text-sm font-semibold tracking-widest text-slate-500 dark:text-slate-400">
              {label}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        ref={mergeRefs([scrollRef, boundaryRef])}
        className={clsx(
          "relative min-h-0 flex-1",
          scrollable === "none" && "overflow-hidden",
          scrollable === "both" && "overflow-auto",
          scrollable === "x" && "overflow-x-auto overflow-y-hidden",
          scrollable === "y" && "overflow-x-hidden overflow-y-auto",
        )}
        style={boundaryStyle}
      >
        {children}
      </div>
    </div>
  )
}
