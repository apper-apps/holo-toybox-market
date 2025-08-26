import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/hooks/useAppContext";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { mode } = useAppContext();

  const getCategoryInfo = (category) => {
    const categories = {
      "toys": {
        title: "Toys",
        icon: "Gamepad2",
        description: "Educational and entertaining toys for every age group",
        color: "from-blue-500 to-indigo-600"
      },
      "art-supplies": {
        title: "Art Supplies", 
        icon: "Palette",
        description: "Creative supplies to inspire young artists",
        color: "from-pink-500 to-rose-600"
      },
      "school-items": {
        title: "School Items",
        icon: "BookOpen", 
        description: "Essential supplies for academic success",
        color: "from-green-500 to-emerald-600"
      },
      "games": {
        title: "Games",
        icon: "Puzzle",
        description: "Board games and puzzles for family fun",
        color: "from-purple-500 to-violet-600"
      },
      "craft-kits": {
        title: "Craft Kits",
        icon: "Scissors",
        description: "DIY kits for creative hands-on projects", 
        color: "from-orange-500 to-amber-600"
      },
      "all": {
        title: "All Products",
        icon: "Grid3x3",
        description: "Browse our complete collection of educational toys and supplies",
        color: "from-primary to-purple-600"
      }
    };
    
    return categories[category] || categories["all"];
  };

  const categoryInfo = getCategoryInfo(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <motion.div
        className="text-center py-8 lg:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="primary" size="md" className="mb-4">
          {mode === "parent" ? "🛡️ Parent Mode" : "❤️ Kid Mode"}
        </Badge>
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className={`
            w-16 h-16 bg-gradient-to-r ${categoryInfo.color} rounded-2xl 
            flex items-center justify-center text-white shadow-lg
          `}>
            <ApperIcon name={categoryInfo.icon} size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-800">
            {categoryInfo.title}
          </h1>
        </div>
        
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          {categoryInfo.description}
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card p-6 sticky top-8">
            <FilterSidebar />
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ProductGrid category={categoryName === "all" ? "all" : categoryInfo.title} />
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;