import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const ModeToggle = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-card">
        <motion.button
          onClick={() => setMode("parent")}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
            ${mode === "parent" 
              ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md" 
              : "text-gray-600 hover:bg-gray-50"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Shield" size={16} />
          <span>Parent Mode</span>
        </motion.button>
        
        <motion.button
          onClick={() => setMode("kid")}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
            ${mode === "kid" 
              ? "bg-gradient-to-r from-secondary to-pink-300 text-gray-800 shadow-md" 
              : "text-gray-600 hover:bg-gray-50"
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Heart" size={16} />
          <span>Kid Mode</span>
        </motion.button>
      </div>
      
      <div className="text-sm text-gray-600">
        {mode === "parent" ? "Full shopping experience" : "Browse & wishlist only"}
      </div>
    </div>
  );
};

export default ModeToggle;