import React from "react";
import { ArrowDemo } from "./demos/arrow-demo";
import { FlipDemoFUI } from "./demos/flip-demo-fui";
import { FlipDemoCSS } from "./demos/flip-demo-css";
import { PlacementDemoCSS } from "./demos/placement-demo-css";
import { PlacementDemoFUI } from "./demos/placement-demo-fui";
import { ShiftDemoFUI } from "./demos/shift-demo-fui";
import { SizeDemo } from "./demos/size-demo";
import { VirtualDemo } from "./demos/virtual-demo";
import { ShiftDemoCSS } from "./demos/shift-demo-css";

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
        <SizeDemo />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
      >
        <ArrowDemo />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
      >
        <VirtualDemo />
      </DemoPanel>
    </div>
  );
};
