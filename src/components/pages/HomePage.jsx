import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productService } from "@/services/api/productService";
import { useAppContext } from "@/hooks/useAppContext";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mode } = useAppContext();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const featured = await productService.getFeatured();
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const categories = [
    {
      name: "Toys",
      icon: "Gamepad2",
      color: "from-blue-500 to-indigo-600",
      description: "Educational and fun toys for all ages"
    },
    {
      name: "Art Supplies",
      icon: "Palette",
      color: "from-pink-500 to-rose-600",
      description: "Creative supplies for budding artists"
    },
    {
      name: "School Items",
      icon: "BookOpen",
      color: "from-green-500 to-emerald-600",
      description: "Essential supplies for school success"
    },
    {
      name: "Games",
      icon: "Puzzle",
      color: "from-purple-500 to-violet-600",
      description: "Board games and puzzles for family fun"
    },
    {
      name: "Craft Kits",
      icon: "Scissors",
      color: "from-orange-500 to-amber-600",
      description: "DIY kits for creative projects"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        className="text-center py-12 lg:py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge variant="primary" size="md" className="mb-4">
            {mode === "parent" ? "🛡️ Parent Mode Active" : "❤️ Kid Mode Active"}
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-800 leading-tight">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
              Educational Toys
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {mode === "parent" 
              ? "Shop safely for high-quality educational toys and supplies. Every item is age-appropriate and safety certified."
              : "Explore colorful toys and games! Add your favorites to your wishlist for grown-ups to see."
            }
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <ApperIcon name="Search" size={20} className="mr-2" />
              Start Shopping
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <ApperIcon name="Heart" size={20} className="mr-2" />
              View Wishlist
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Categories Section */}
      <section className="py-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="group block"
              >
                <div className={`
                  p-8 rounded-2xl bg-gradient-to-br ${category.color} text-white 
                  transform hover:scale-105 transition-all duration-300 hover:shadow-lift
                `}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <ApperIcon name={category.icon} size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-4">
            ⭐ Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites that kids love and parents trust
          </p>
        </motion.div>

        <ProductGrid limit={8} />

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/category/all">
            <Button variant="outline" size="lg">
              View All Products
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-purple-600/5 to-secondary/5 rounded-3xl my-12">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-12">
            Why Parents Choose Toybox Market
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-success to-green-400 rounded-full flex items-center justify-center">
                <ApperIcon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">100% Safe</h3>
              <p className="text-gray-600">All products are safety tested and certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                <ApperIcon name="BookOpen" size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Educational</h3>
              <p className="text-gray-600">Carefully selected for learning and development</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-orange-400 rounded-full flex items-center justify-center">
                <ApperIcon name="Heart" size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Kid Approved</h3>
              <p className="text-gray-600">Tested by real kids for maximum fun</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;