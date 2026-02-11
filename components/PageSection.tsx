import React from "react";
import {BottomGradient, TopGradient} from "./PageGradient";

type PageSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export default function PageSection({ className, children }: PageSectionProps) {
  return (
    <section className={`relative pt-28 pb-16 w-full bg ${className}`}>
      <TopGradient/>
      {children}
      
    </section>
  );
}
