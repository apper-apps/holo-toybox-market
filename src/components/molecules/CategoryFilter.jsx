import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = () => {
  const { selectedCategory, setCategory } = useAppContext();

  const categories = [
    { value: "all", label: "All Items", icon: "Grid3x3" },
    { value: "toys", label: "Toys", icon: "Gamepad2" },
    { value: "art supplies", label: "Art Supplies", icon: "Palette" },
    { value: "school items", label: "School Items", icon: "BookOpen" },
    { value: "games", label: "Games", icon: "Puzzle" },
    { value: "craft kits", label: "Craft Kits", icon: "Scissors" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Categories</h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategory(category.value)}
            className={`
              w-full p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
              flex items-center space-x-3 hover:scale-[1.02]
              ${selectedCategory === category.value
                ? "border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary" 
                : "border-gray-200 bg-white text-gray-600 hover:border-primary/30"
              }
            `}
          >
            <ApperIcon name={category.icon} size={18} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;