import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops! Something went wrong"
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-error to-red-500 rounded-2xl flex items-center justify-center mx-auto">
            <ApperIcon name="AlertTriangle" size={32} className="text-white" />
          </div>
          <div className="absolute -inset-3 bg-error/20 rounded-2xl animate-pulse"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              <span>Try Again</span>
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Home" size={16} />
            <span>Go Home</span>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            If this problem persists, please contact our support team. 
            We're here to help make your shopping experience amazing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;