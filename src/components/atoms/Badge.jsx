import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md",
  className 
}) => {
const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-purple-600 text-white",
    secondary: "bg-gradient-to-r from-secondary to-pink-300 text-gray-800", 
    accent: "bg-gradient-to-r from-accent to-orange-400 text-white",
    success: "bg-gradient-to-r from-success to-green-400 text-white",
    warning: "bg-gradient-to-r from-warning to-yellow-400 text-white",
    danger: "bg-gradient-to-r from-error to-red-400 text-white",
    age: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
    inStock: "bg-gradient-to-r from-success to-green-400 text-white",
    lowStock: "bg-gradient-to-r from-warning to-yellow-400 text-gray-800",
    outOfStock: "bg-gradient-to-r from-error to-red-400 text-white"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;