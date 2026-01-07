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
        "flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl bg-white dark:bg-slate-950 overflow-hidden",
        className,
      )}
    >
      {/* Browser Header */}
      <div className="flex items-center h-10 px-4 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shrink-0 select-none relative">
        {/* MacOS Traffic Lights */}
        <div className="flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/50" />
        </div>

        {label && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center">
            <span className="text-sm font-semibold tracking-widest text-slate-500 dark:text-slate-400 truncate max-w-[60%]">
              {label}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        ref={mergeRefs([scrollRef, boundaryRef])}
        className={clsx(
          "flex-1 min-h-0 relative",
          scrollable === "none" && "overflow-hidden",
          scrollable === "both" && "overflow-auto",
          scrollable === "x" && "overflow-x-auto overflow-y-hidden",
          scrollable === "y" && "overflow-y-auto overflow-x-hidden",
        )}
        style={boundaryStyle}
      >
        {children}
      </div>
    </div>
  )
}
