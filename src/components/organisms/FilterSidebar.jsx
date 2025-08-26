import CategoryFilter from "@/components/molecules/CategoryFilter";
import AgeFilter from "@/components/molecules/AgeFilter";
import PriceRange from "@/components/molecules/PriceRange";
import Button from "@/components/atoms/Button";
import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ className = "" }) => {
  const { setCategory, setAgeGroups, setPriceRange } = useAppContext();

  const clearAllFilters = () => {
    setCategory("all");
    setAgeGroups([]);
    setPriceRange([0, 200]);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <Button
          onClick={clearAllFilters}
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1"
        >
          <ApperIcon name="RotateCcw" size={14} />
          <span>Clear All</span>
        </Button>
      </div>

      <div className="space-y-6">
        <CategoryFilter />
        <AgeFilter />
        <PriceRange />
      </div>
    </div>
  );
};

export default FilterSidebar;