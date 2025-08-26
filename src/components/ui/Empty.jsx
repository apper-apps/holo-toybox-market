import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Nothing to see here yet",
  description = "But that's about to change! Start exploring our amazing collection.",
  actionText = "Start Shopping",
  actionLink = "/",
  icon = "Gift"
}) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-secondary to-pink-300 rounded-3xl flex items-center justify-center mx-auto">
            <ApperIcon name={icon} size={32} className="text-white" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-pink-300/20 rounded-3xl animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        <div className="pt-2">
          <Link to={actionLink}>
            <Button 
              variant="primary" 
              size="lg"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Search" size={18} />
              <span>{actionText}</span>
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="Shield" size={20} className="text-primary" />
            </div>
            <p className="text-xs text-gray-600">100% Safe</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-success/20 to-green-400/20 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="BookOpen" size={20} className="text-success" />
            </div>
            <p className="text-xs text-gray-600">Educational</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-orange-400/20 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="Heart" size={20} className="text-accent" />
            </div>
            <p className="text-xs text-gray-600">Kid Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;