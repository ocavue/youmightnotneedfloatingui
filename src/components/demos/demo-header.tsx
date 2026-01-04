import React from "react";

export function DemoHeader(props: { title: string; description: string }) {
  const { title, description } = props;
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}


