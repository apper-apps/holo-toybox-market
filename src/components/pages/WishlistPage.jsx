import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";
import WishlistItem from "@/components/molecules/WishlistItem";
import Badge from "@/components/atoms/Badge";
import Empty from "@/components/ui/Empty";

const WishlistPage = () => {
const { wishlist } = useAppContext();


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="text-center py-8 lg:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-secondary to-pink-300 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ApperIcon name="Heart" size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-800">
            My Wishlist
          </h1>
        </div>
        
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
All your favorite toys and games are saved here!
        </p>
      </motion.div>

{wishlist.length === 0 ? (
        <Empty 
          title="Your wishlist is empty"
          description="Start exploring and add your favorite toys to your wishlist!"
          actionText="Start Shopping"
          actionLink="/"
        />
      ) : (
        <div className="space-y-12">
{/* Approved/All Items Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-success to-green-400 rounded-xl flex items-center justify-center">
                <ApperIcon name="Check" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
Your Wishlist ({wishlist.length})
                </h2>
                <p className="text-gray-600">
                  All your favorite items in one place
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
{wishlist.map((item) => (
                  <WishlistItem key={item.productId} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;