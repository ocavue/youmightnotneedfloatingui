import React, { useLayoutEffect, useRef, useState } from "react";
import {
  computePosition,
  offset,
  shift,
  type VirtualElement,
} from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const VirtualDemoFUI = () => {
  const floatingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const latestPointRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = ({
    clientX,
    clientY,
  }: React.MouseEvent | React.PointerEvent) => {
    latestPointRef.current = { x: clientX, y: clientY };

    if (frameRef.current != null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      const floating = floatingRef.current;
      const contextEl = containerRef.current;
      const point = latestPointRef.current;
      if (!floating || !contextEl || !point) return;

      // Floating UI expects viewport-based rects. `contextElement` ensures the
      // correct offsetParent/clipping behavior for an in-frame tooltip.
      const virtualElement: VirtualElement = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: point.x,
            y: point.y,
            left: point.x,
            top: point.y,
            right: point.x,
            bottom: point.y,
          };
        },
        getClientRects() {
          return [];
        },
        contextElement: contextEl,
      };

      computePosition(virtualElement, floating, {
        placement: "bottom-start",
        middleware: [offset(10), shift({ padding: 5 })],
      }).then(({ x: floatingX, y: floatingY }) => {
        Object.assign(floating.style, {
          transform: `translate(${floatingX}px, ${floatingY}px)`,
        });
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
          ref={floatingRef}
          className="absolute z-20 pointer-events-none transition-all duration-0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <div
            className="bg-rose-500 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap transition-all"
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
