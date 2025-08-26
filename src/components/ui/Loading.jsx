import ApperIcon from "@/components/ApperIcon";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <ApperIcon name="Gift" size={24} className="text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-20 animate-ping"></div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading amazing toys...</h3>
          <p className="text-gray-600">Please wait while we fetch the best products for you!</p>
        </div>
        
        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-card">
              <div className="animate-pulse">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded w-3/4"></div>
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-3 rounded w-full"></div>
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-3 rounded w-2/3"></div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="bg-gradient-to-r from-primary/30 to-purple-600/30 h-6 rounded w-16"></div>
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-8 rounded-lg w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;