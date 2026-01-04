import React, { useId, useLayoutEffect, useRef, useState } from "react";
import {
  computePosition,
  offset,
  shift,
  type VirtualElement,
} from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";
import clsx from "clsx";

export const VirtualDemoCSS = ({ debug = false }: { debug?: boolean }) => {
  const floatingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const latestPointRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const id = useId();
  const anchorName = `--anchor-${id}`;

  const handleMouseMove = ({
    clientX,
    clientY,
  }: React.MouseEvent | React.PointerEvent) => {
    latestPointRef.current = { x: clientX, y: clientY };

    if (frameRef.current != null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      const floating = floatingRef.current;
      const point = latestPointRef.current;
      const container = containerRef.current;
      const anchor = anchorRef.current;
      if (!floating || !point || !anchor || !container) return;

      const containerRect = container.getBoundingClientRect();

      const x = point.x - containerRect.left;
      const y = point.y - containerRect.top;

      Object.assign(anchor.style, {
        transform: `translate(${x}px, ${y}px)`,
      });
    });
  };

  return (
    <BrowserFrame
      label="Move your mouse"
      className="h-80 bg-slate-100 dark:bg-slate-900 overflow-hidden"
    >
      <div
        className="w-full h-full relative"
        ref={containerRef}
        onPointerMove={handleMouseMove}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center h-full text-slate-400 italic select-none">
          Move your mouse in here
        </div>

        <div
          ref={anchorRef}
          className={clsx(
            "absolute top-0 left-0 z-10 w-2 h-2 transform",
            debug ? "bg-amber-500" : ""
          )}
          style={{
            anchorName,
          }}
        ></div>

        <div
          ref={floatingRef}
          className="absolute z-20 pointer-events-none top-0 left-0"
          style={{
            positionAnchor: anchorName,
            positionArea: "bottom span-right",
          }}
        >
          <div
            className="bg-cyan-500 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap transition-all"
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
  );
};
