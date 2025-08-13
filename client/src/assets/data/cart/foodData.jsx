
const foodData = [
  {
    id: 1,
    name: "Classic Spaghetti Bolognese",
    price: 14.99,
    category: "spaghetti",
    image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2070&auto=format&fit=crop",
    description: "Traditional Italian spaghetti with rich meat sauce, topped with parmesan."
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    price: 15.99,
    category: "spaghetti",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop",
    description: "Creamy pasta with pancetta, eggs, pecorino cheese, and freshly ground black pepper."
  },
  {
    id: 3,
    name: "Vegetable Fried Rice",
    price: 12.99,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2000&auto=format&fit=crop",
    description: "Flavorful rice stir-fried with mixed vegetables and aromatic spices."
  },
  {
    id: 4,
    name: "Chicken Biryani",
    price: 17.99,
    category: "rice",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
    description: "Fragrant basmati rice cooked with tender chicken, saffron, and traditional spices."
  },
  {
    id: 5,
    name: "Beef Burger",
    price: 13.99,
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
    description: "Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun."
  },
  {
    id: 6,
    name: "Veggie Burger",
    price: 12.99,
    category: "burger",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2070&auto=format&fit=crop",
    description: "Plant-based patty with avocado, fresh vegetables, and vegan mayo."
  },
  {
    id: 7,
    name: "Margherita Pizza",
    price: 14.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop",
    description: "Classic pizza with tomato sauce, fresh mozzarella, basil, and olive oil."
  },
  {
    id: 8,
    name: "Pepperoni Pizza",
    price: 16.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080&auto=format&fit=crop",
    description: "Traditional pizza topped with tomato sauce, mozzarella, and spicy pepperoni slices."
  }
];

export default foodData;

export const categories = [
  { id: "all", name: "All" },
  { id: "spaghetti", name: "Spaghetti" },
  { id: "rice", name: "Rice" },
  { id: "burger", name: "Burger" },
  { id: "pizza", name: "Pizza" }
];
