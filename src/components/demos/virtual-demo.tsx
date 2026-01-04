import React, { useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, shift, type VirtualElement } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const VirtualDemo = () => {
  const floatingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent | React.PointerEvent) => {
    const floating = floatingRef.current;
    if (!floating) return;

    const contextEl = containerRef.current;
    if (!contextEl) return;

    // Floating UI expects viewport-based rects (clientX/clientY). `contextElement`
    // makes offsetParent/clipping/scroll resolution behave correctly.
    const virtualElement: VirtualElement = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          left: clientX,
          top: clientY,
          right: clientX,
          bottom: clientY,
        };
      },
      getClientRects() {
        return [];
      },
      contextElement: contextEl,
    };

    computePosition(virtualElement, floating, {
      placement: "bottom-start",
      middleware: [
        offset(10),
        shift({ padding: 5 }),
      ],
    }).then(({ x: floatingX, y: floatingY }) => {
      Object.assign(floating.style, {
        transform: `translate(${floatingX}px, ${floatingY}px)`,
      });
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold">Virtual</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Anchor relative to any coordinates, such as your mouse cursor.
        </p>
      </div>

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
            className="absolute z-20 pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.15s ease-out",
            }}
          >
            <div 
              className="bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold whitespace-nowrap"
              style={{
                transform: isOpen ? "scale(1)" : "scale(0.8)",
                transition: "transform 0.15s ease-out",
              }}
            >
              Tooltip
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

