import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";

const AgeFilter = () => {
  const { selectedAgeGroups, setAgeGroups } = useAppContext();

  const ageGroups = [
    { value: "0-3", label: "0-3 years", icon: "Baby" },
    { value: "4-6", label: "4-6 years", icon: "Heart" },
    { value: "7-9", label: "7-9 years", icon: "BookOpen" },
    { value: "10+", label: "10+ years", icon: "Zap" }
  ];

  const toggleAgeGroup = (ageGroup) => {
    if (selectedAgeGroups.includes(ageGroup)) {
      setAgeGroups(selectedAgeGroups.filter(ag => ag !== ageGroup));
    } else {
      setAgeGroups([...selectedAgeGroups, ageGroup]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Age Groups</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {ageGroups.map((age) => (
          <button
            key={age.value}
            onClick={() => toggleAgeGroup(age.value)}
            className={`
              p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
              flex flex-col items-center space-y-1 hover:scale-105
              ${selectedAgeGroups.includes(age.value)
                ? "border-primary bg-gradient-to-br from-primary/10 to-purple-600/10 text-primary" 
                : "border-gray-200 bg-white text-gray-600 hover:border-primary/30"
              }
            `}
          >
            <ApperIcon name={age.icon} size={20} />
            <span>{age.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;