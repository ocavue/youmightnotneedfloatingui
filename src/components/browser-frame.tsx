import React from "react";
import { clsx } from "clsx";

interface BrowserFrameProps {
  children?: React.ReactNode;
  scrollable?: "both" | "x" | "y" | "none";
  className?: string;
  title?: string;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  scrollable = "none",
  className = "",
  title,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl bg-white dark:bg-slate-950 overflow-hidden",
        className
      )}
    >
      {/* Browser Header */}
      <div className="flex items-center h-11 px-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 shrink-0 select-none relative">
        {/* MacOS Traffic Lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600" />
          <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
        </div>

        {/* Optional Title/Address Bar Style */}
        {title && (
          <div className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-slate-400 dark:text-slate-500 truncate max-w-[50%]">
            {title}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className={clsx(
          "flex-1 min-h-0",
          scrollable === "none" && "overflow-hidden",
          scrollable === "both" && "overflow-auto",
          scrollable === "x" && "overflow-x-auto overflow-y-hidden",
          scrollable === "y" && "overflow-y-auto overflow-x-hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
};
