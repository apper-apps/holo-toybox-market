import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { productService } from "@/services/api/productService";
import { useAppContext } from "@/hooks/useAppContext";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ category = "all", limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { searchQuery, selectedCategory, selectedAgeGroups, priceRange } = useAppContext();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        category: category !== "all" ? category : selectedCategory,
        ageGroups: selectedAgeGroups,
        priceRange: priceRange,
        searchQuery: searchQuery
      };

      let result = await productService.getAll(filters);
      
      if (limit) {
        result = result.slice(0, limit);
      }
      
      setProducts(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery, selectedCategory, selectedAgeGroups, priceRange, limit]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;
  if (products.length === 0) return <Empty />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;