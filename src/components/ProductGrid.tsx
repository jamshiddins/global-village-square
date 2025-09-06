import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import headphonesImg from "@/assets/product-headphones.jpg";
import phoneImg from "@/assets/product-phone.jpg";
import shoesImg from "@/assets/product-shoes.jpg";
import laptopImg from "@/assets/product-laptop.jpg";

const sampleProducts = [
  {
    id: "1",
    name: "Экскаватор CATERPILLAR 320D - Гусеничный, 20 тонн",
    price: 2850000,
    originalPrice: 3200000,
    rating: 4.8,
    reviews: 127,
    image: headphonesImg,
    badge: "Хит Продаж",
  },
  {
    id: "2",
    name: "Автокран LIEBHERR 50 тонн - Мобильный, телескопический",
    price: 4500000,
    originalPrice: 5000000,
    rating: 4.9,
    reviews: 89,
    image: phoneImg,
    badge: "Новинка",
  },
  {
    id: "3",
    name: "Бульдозер KOMATSU D65 - Гусеничный, мощность 190 л.с.",
    price: 3200000,
    rating: 4.6,
    reviews: 156,
    image: shoesImg,
  },
  {
    id: "4",
    name: "Погрузчик VOLVO L120H - Фронтальный, ковш 3.5 м³",
    price: 2750000,
    originalPrice: 3100000,
    rating: 4.7,
    reviews: 98,
    image: laptopImg,
    badge: "Акция",
  },
  {
    id: "5",
    name: "Самосвал KAMAZ 65115 - Грузоподъемность 15 тонн",
    price: 1850000,
    originalPrice: 2100000,
    rating: 4.5,
    reviews: 234,
    image: headphonesImg,
  },
  {
    id: "6",
    name: "Компрессор Atlas Copco - Передвижной, производительность 12 м³/мин",
    price: 850000,
    rating: 4.4,
    reviews: 67,
    image: phoneImg,
    badge: "Проф",
  },
  {
    id: "7",
    name: "Виброкаток BOMAG 120 - Двухвальцовый, вес 12 тонн",
    price: 1950000,
    originalPrice: 2200000,
    rating: 4.3,
    reviews: 43,
    image: shoesImg,
  },
  {
    id: "8",
    name: "Телескопический погрузчик MANITOU MLT 634 - Высота подъема 6 м",
    price: 1650000,
    rating: 4.6,
    reviews: 78,
    image: laptopImg,
    badge: "Надежный",
  },
];

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
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
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