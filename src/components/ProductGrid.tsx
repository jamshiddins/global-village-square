import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import headphonesImg from "@/assets/product-headphones.jpg";
import phoneImg from "@/assets/product-phone.jpg";
import shoesImg from "@/assets/product-shoes.jpg";
import laptopImg from "@/assets/product-laptop.jpg";

const sampleProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones with Noise Cancellation",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.5,
    reviews: 2847,
    image: headphonesImg,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Latest Smartphone with Advanced Camera System",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.8,
    reviews: 1923,
    image: phoneImg,
    badge: "New",
  },
  {
    id: "3",
    name: "Professional Running Shoes for Athletes",
    price: 129.99,
    rating: 4.6,
    reviews: 856,
    image: shoesImg,
  },
  {
    id: "4",
    name: "High-Performance Laptop for Professionals",
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.7,
    reviews: 743,
    image: laptopImg,
    badge: "Sale",
  },
  {
    id: "5",
    name: "Ultra-Portable Wireless Earbuds",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviews: 1234,
    image: headphonesImg,
  },
  {
    id: "6",
    name: "Gaming Smartphone with RGB Lighting",
    price: 749.99,
    rating: 4.4,
    reviews: 567,
    image: phoneImg,
    badge: "Gaming",
  },
  {
    id: "7",
    name: "Comfortable Daily Wear Sneakers",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.2,
    reviews: 432,
    image: shoesImg,
  },
  {
    id: "8",
    name: "Lightweight Business Laptop",
    price: 899.99,
    rating: 4.5,
    reviews: 321,
    image: laptopImg,
    badge: "Business",
  },
];

export const ProductGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of top-quality products from trusted sellers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};