import productsData from "@/services/mockData/products.json";

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll(filters = {}) {
    await delay(300);
    
    let filteredProducts = [...productsData];
    
    // Filter by category
    if (filters.category && filters.category !== "all") {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Filter by age groups
    if (filters.ageGroups && filters.ageGroups.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        p.ageGroups.some(age => filters.ageGroups.includes(age))
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(p => 
        p.price >= min && p.price <= max
      );
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filteredProducts;
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },

  async getFeatured() {
    await delay(250);
    return productsData
      .filter(p => p.tags.includes("featured"))
      .slice(0, 8);
  },

  async getByCategory(category) {
    await delay(300);
    if (category === "all") return productsData;
    
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  },

  async search(query) {
    await delay(300);
    const searchQuery = query.toLowerCase();
    
    return productsData.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
  }
};