import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children,
  className,
  hover = true,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "card p-6",
        hover && "hover:shadow-lift hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;