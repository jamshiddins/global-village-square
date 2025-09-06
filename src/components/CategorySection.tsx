import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigation } from "@/hooks/useNavigation";
import { 
  Construction, 
  Truck, 
  Drill, 
  Wrench, 
  Building, 
  Car,
  HardHat,
  Forklift
} from "lucide-react";

const categories = [
  {
    id: "excavators",
    name: "Экскаваторы",
    icon: Construction,
    count: "500+",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    id: "cranes",
    name: "Автокраны",
    icon: Car,
    count: "300+",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: "trucks",
    name: "Грузовики",
    icon: Truck,
    count: "800+",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: "forklifts",
    name: "Погрузчики",
    icon: Forklift,
    count: "400+",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    id: "tools",
    name: "Инструменты",
    icon: Drill,
    count: "2000+",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    id: "services",
    name: "Сервис",
    icon: Wrench,
    count: "150+",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    id: "construction",
    name: "Стройтехника",
    icon: Building,
    count: "600+",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  {
    id: "safety",
    name: "Безопасность",
    icon: HardHat,
    count: "350+",
    color: "text-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-950",
  },
];

export const CategorySection = () => {
  const { navigateToCategory, navigateToCatalog } = useNavigation();
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Категории Техники
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите нужную категорию спецтехники из нашего обширного каталога профессионального оборудования
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card hover:bg-product-hover"
              onClick={() => navigateToCategory(category.name)}
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
                    {category.count} единиц
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigateToCatalog()}
          >
            Посмотреть Все Категории
          </Button>
        </div>
      </div>
    </section>
  );
};