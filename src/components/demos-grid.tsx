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
  sourceUrl: string;
  warning?: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const { title, description, type, sourceUrl, warning, children } = props;

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
                : "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
            ].join(" ")}
          >
            {type}
          </span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors ml-auto"
            title="View source code"
          >
            {"</>"}
          </a>
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
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/placement-demo-fui.tsx"
      >
        <PlacementDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Placement"
        description="Places your floating element relative to another element."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/placement-demo-css.tsx"
      >
        <PlacementDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
        type="Floating UI"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/shift-demo-fui.tsx"
      >
        <ShiftDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Shift"
        description="Shifts your floating element to keep it in view."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/shift-demo-css.tsx"
        warning="Require Chrome Canary v145"
      >
        <ShiftDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
        type="Floating UI"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/flip-demo-fui.tsx"
      >
        <FlipDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Flip"
        description="Changes the placement of your floating element to keep it in view."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/flip-demo-css.tsx"
        warning=<span>
          Only works on Chrome v143. A{" "}
          <a
            className="underline underline-offset-2 hover:underline-offset-4 transition-all"
            href="https://github.com/w3c/csswg-drafts/issues/12607"
            target="_blank"
            rel="noopener noreferrer"
          >
            CSSWG Proposal
          </a>{" "}
          is being worked on.
        </span>
      >
        <FlipDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
        type="Floating UI"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/size-demo-fui.tsx"
      >
        <SizeDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Size"
        description="Changes the size of your floating element to keep it in view."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/size-demo-css.tsx"
        warning="Require Chrome Canary v145"
      >
        <SizeDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
        type="Floating UI"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/arrow-demo-fui.tsx"
      >
        <ArrowDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Arrow"
        description="Dynamically positions an arrow element that is center-aware."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/arrow-demo-css.tsx"
      >
        <ArrowDemoCSS />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
        type="Floating UI"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/virtual-demo-fui.tsx"
      >
        <VirtualDemoFUI />
      </DemoPanel>

      <DemoPanel
        title="Virtual"
        description="Anchor relative to any coordinates, such as your mouse cursor."
        type="CSS"
        sourceUrl="https://github.com/ocavue/youmightnotneedfloatingui/blob/master/src/components/demos/virtual-demo-css.tsx"
        warning="Require Chrome Canary v145"
      >
        <VirtualDemoCSS />
      </DemoPanel>
    </div>
  );
};
