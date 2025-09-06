import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { products } from "@/data/products";

export const ProductGrid = () => {
  const { navigateToCatalog } = useNavigation();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Рекомендуемая Техника
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Проверенная спецтехника от ведущих производителей с гарантией качества и сервисным обслуживанием
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviews={product.reviews}
              image={product.image}
              badge={product.badge}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigateToCatalog()}
          >
            Весь Каталог Техники
          </Button>
        </div>
      </div>
    </section>
  );
};