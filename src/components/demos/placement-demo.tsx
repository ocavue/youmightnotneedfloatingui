import React, { useLayoutEffect, useRef, useState } from "react";
import {
  computePosition,
  offset,
  autoUpdate,
  type Placement,
} from "@floating-ui/dom";
import { clsx } from "clsx";
import { BrowserFrame } from "../browser-frame";

interface DotButtonProps {
  placement: Placement;
  current: Placement;
  onClick: (placement: Placement) => void;
  className?: string;
}

const DotButton = ({
  placement,
  current,
  onClick,
  className,
}: DotButtonProps) => (
  <button
    onClick={() => onClick(placement)}
    className={clsx("p-4 transition hover:scale-125", className)}
    aria-label={`Set placement to ${placement}`}
  >
    <div
      className={clsx(
        "w-4 h-4 rounded-full border-2",
        current === placement
          ? "bg-slate-800 border-slate-800 dark:bg-slate-200 dark:border-slate-200"
          : "border-slate-400"
      )}
    />
  </button>
);

export const PlacementDemo = () => {
  const [placement, setPlacement] = useState<Placement>("top");
  const referenceRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;
    if (!reference || !floating) return;

    return autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement,
        middleware: [offset(5)],
      }).then(({ x, y }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
          display: "block",
        });
      });
    });
  }, [placement]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Placement</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Places your floating element relative to another element.
        </p>
      </div>

      <BrowserFrame
        label="Click the dots"
        className="h-80 relative bg-slate-100 dark:bg-slate-900"
      >
        <div className="relative w-full h-full flex items-center justify-center p-20">
          <div className="absolute inset-0 pointer-events-auto">
            {/* Top dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex">
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex">
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
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col">
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
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col">
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
            className="z-10 h-24 w-24 border-2 border-dashed border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-800 p-2 text-sm font-bold flex items-center justify-center"
          >
            Reference
          </button>

          <div
            ref={floatingRef}
            className={clsx(
              "absolute z-20 bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap pointer-events-none text-center",

              ["top-start", "top-end", "bottom-start", "bottom-end"].includes(
                placement
              ) && "w-36"
            )}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "none",
            }}
          >
            {placement}
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};
