import React from "react";
import { ArrowDemoCSS } from "./demos/arrow-demo-css";
import { ArrowDemoFUI } from "./demos/arrow-demo-fui";
import { FlipDemoCSS } from "./demos/flip-demo-css";
import { FlipDemoFUI } from "./demos/flip-demo-fui";
import { PlacementDemoCSS } from "./demos/placement-demo-css";
import { PlacementDemoFUI } from "./demos/placement-demo-fui";
import { ShiftDemoCSS } from "./demos/shift-demo-css";
import { ShiftDemoFUI } from "./demos/shift-demo-fui";
import { SizeDemoCSS } from "./demos/size-demo-css";
import { SizeDemoFUI } from "./demos/size-demo-fui";
import { VirtualDemoCSS } from "./demos/virtual-demo-css";
import { VirtualDemoFUI } from "./demos/virtual-demo-fui";

function DemoPanel(props: {
  title: string;
  description: string;
  type: "Floating UI" | "CSS";
  warning?: string;
  children: React.ReactNode;
}) {
  const { title, description, type, warning, children } = props;

  return (
    <section
      className={["grid", "grid-rows-subgrid", "row-span-2", "gap-4"].join(" ")}
    >
      <header>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <span
            className={[
              "text-xs",
              "font-semibold",
              "px-2",
              "py-0.5",
              "rounded",
              type === "Floating UI"
                ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
            ].join(" ")}
          >
            {type}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
        {warning && (
          <p className="text-amber-500 text-sm font-semibold dark:text-amber-600">
            {warning}
          </p>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
}

export const DemosGrid = () => {
  return (
    <div
      className={[
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "gap-x-12",
        "gap-y-12",
        "auto-rows-[auto_auto]",
      ].join(" ")}
    >
      <DemoPanel
        title="Placement"
        description="Places your floating element relative to another element."
        type="Floating UI"
      >
        <PlacementDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Placement"
        description="Places your floating element relative to another element."
        type="CSS"
      >
        <PlacementDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
        type="Floating UI"
      >
        <ShiftDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
        type="CSS"
        warning="Only works on Chrome Canary v145"
      >
        <ShiftDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
        type="Floating UI"
      >
        <FlipDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
        type="CSS"
        warning="Only works on Chrome v143"
      >
        <FlipDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
        type="Floating UI"
      >
        <SizeDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
        type="CSS"
        warning="Only works on Chrome Canary v145"
      >
        <SizeDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
        type="Floating UI"
      >
        <ArrowDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
        type="CSS"
      >
        <ArrowDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
        type="Floating UI"
      >
        <VirtualDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
        type="CSS"
        warning="Only works on Chrome Canary v145"
      >
        <VirtualDemoCSS />
      </DemoPanel>
    </div>
  );
};
