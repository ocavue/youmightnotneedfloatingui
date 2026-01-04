import React from "react";
import { BrowserFrame } from "../browser-frame";

export const SizeDemoCSS = () => {
  return (
    <BrowserFrame
      label="Scroll the container"
      scrollable="none"
      className="h-80 bg-slate-100 dark:bg-slate-900"
    >
      {/* We define our own scroll container here so we can attach scroll/view timelines via CSS. */}
      <div className="size-demo-sda-scroll h-full overflow-y-auto overflow-x-hidden">
        <div className="h-80" />

        <div className="size-demo-sda-scope flex flex-col items-center justify-center gap-5 py-10">
          <button className="size-demo-sda-ref z-10 h-24 w-24 flex-none border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center">
            Reference
          </button>

          <div className="size-demo-sda-dropdown w-40 rounded shadow-lg bg-rose-600 text-white">
            <div className="grid h-full place-items-center text-sm font-bold">
              Dropdown
            </div>
          </div>
        </div>

        <div className="h-80" />
      </div>
    </BrowserFrame>
  );
};
