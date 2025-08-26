import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  placeholder,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "input-field",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;