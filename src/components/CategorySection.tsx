import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Sparkles,
  Smartphone,
  Car
} from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop,
    count: "50,000+",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    count: "75,000+",
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: Home,
    count: "30,000+",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Dumbbell,
    count: "25,000+",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    id: "books",
    name: "Books",
    icon: Book,
    count: "100,000+",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: Sparkles,
    count: "40,000+",
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950",
  },
  {
    id: "mobile",
    name: "Mobile & Tech",
    icon: Smartphone,
    count: "35,000+",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    count: "20,000+",
    color: "text-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-950",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our extensive collection of products across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card hover:bg-product-hover"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`${category.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.count} items
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Explore All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};