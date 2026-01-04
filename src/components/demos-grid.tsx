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
  children: React.ReactNode;
}) {
  const { title, description, children } = props;

  return (
    <section
      className={["grid", "grid-rows-subgrid", "row-span-2", "gap-4"].join(" ")}
    >
      <header>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
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
      >
        <PlacementDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Placement"
        description="Places your floating element relative to another element."
      >
        <PlacementDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
      >
        <ShiftDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
      >
        <ShiftDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
      >
        <FlipDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
      >
        <FlipDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
      >
        <SizeDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
      >
        <SizeDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
      >
        <ArrowDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
      >
        <ArrowDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
      >
        <VirtualDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
      >
        <VirtualDemoCSS />
      </DemoPanel>
    </div>
  );
};
