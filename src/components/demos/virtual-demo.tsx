import React, { useLayoutEffect, useRef, useState } from "react";
import { computePosition, offset, shift } from "@floating-ui/dom";
import { BrowserFrame } from "../browser-frame";

export const VirtualDemo = () => {
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent | React.PointerEvent) => {
    const floating = floatingRef.current;
    if (!floating) return;

    const virtualElement = {
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
    };

    computePosition(virtualElement, floating, {
      placement: "bottom-start",
      middleware: [
        offset(10),
        shift({ padding: 5 }),
      ],
    }).then(({ x, y }) => {
      Object.assign(floating.style, {
        left: `${x}px`,
        top: `${y}px`,
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
          onPointerMove={handleMouseMove}
          onPointerEnter={() => setIsOpen(true)}
          onPointerLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-center h-full text-slate-400 italic select-none">
            Move your mouse in here
          </div>
          
          <div
            ref={floatingRef}
            className="absolute z-20 bg-rose-600 text-white px-3 py-1.5 rounded shadow-lg text-sm font-bold pointer-events-none transition-opacity duration-200"
            style={{
              position: "fixed", // Using fixed for virtual cursor follow
              top: 0,
              left: 0,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.1s, transform 0.1s',
            }}
          >
            Tooltip
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};

