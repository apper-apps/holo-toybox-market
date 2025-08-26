import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "font-semibold rounded-xl transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "btn-primary focus:ring-primary",
    secondary: "btn-secondary focus:ring-secondary", 
    accent: "btn-accent focus:ring-accent",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-primary bg-transparent hover:bg-primary/10 focus:ring-primary",
    danger: "bg-gradient-to-r from-error to-red-500 text-white hover:scale-105 shadow-md hover:shadow-lg focus:ring-error"
  };
  
  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base", 
    lg: "py-4 px-8 text-lg",
    xl: "py-5 px-10 text-xl"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "hover:scale-100",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;