import { Children, cloneElement } from "react";

export default function Stagger({ children, staggerDelay = 60, initialDelay = 0 }) {
  const validChildren = Children.toArray(children).filter(Boolean);
  
  return (
    <>
      {validChildren.map((child, index) => {
        // Cap at 8 items for stagger as requested
        const delay = initialDelay + Math.min(index, 7) * staggerDelay;
        return cloneElement(child, { delay, key: child.key || index });
      })}
    </>
  );
}
