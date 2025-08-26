import { useState, useEffect } from "react";
import { useAppContext } from "@/hooks/useAppContext";

const PriceRange = () => {
  const { priceRange, setPriceRange } = useAppContext();
  const [min, max] = priceRange;
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPriceRange([localMin, localMax]);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [localMin, localMax, setPriceRange]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Price Range</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 w-8">$0</span>
          <input
            type="range"
            min="0"
            max="200"
            value={localMin}
            onChange={(e) => setLocalMin(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-gray-600 w-12">$200+</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 w-8">$0</span>
          <input
            type="range"
            min="0"
            max="200"
            value={localMax}
            onChange={(e) => setLocalMax(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-gray-600 w-12">$200+</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm font-medium text-primary">
        <span>${localMin}</span>
        <span>-</span>
        <span>${localMax === 200 ? "200+" : localMax}</span>
      </div>
    </div>
  );
};

export default PriceRange;