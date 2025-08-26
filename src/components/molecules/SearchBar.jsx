import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useAppContext } from "@/hooks/useAppContext";

const SearchBar = ({ onSearch, placeholder = "Search for toys, games, and more..." }) => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-4 rounded-l-xl rounded-r-none border-r-0 focus:z-10"
        />
      </div>
      <Button 
        type="submit"
        variant="primary"
        className="rounded-l-none rounded-r-xl px-6"
      >
        <ApperIcon name="Search" size={16} />
      </Button>
    </form>
  );
};

export default SearchBar;