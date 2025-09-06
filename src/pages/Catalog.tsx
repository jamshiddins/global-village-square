import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  GridIcon, 
  List,
  Building2,
  User,
  LogIn,
  SlidersHorizontal
} from 'lucide-react';
import headphonesImg from "@/assets/product-headphones.jpg";
import phoneImg from "@/assets/product-phone.jpg";
import shoesImg from "@/assets/product-shoes.jpg";
import laptopImg from "@/assets/product-laptop.jpg";

// Mock data for catalog
const catalogProducts = [
  {
    id: "1",
    name: "Экскаватор CATERPILLAR 320D - Гусеничный, 20 тонн",
    price: 2850000,
    originalPrice: 3200000,
    rating: 4.8,
    reviews: 127,
    image: headphonesImg,
    badge: "Хит Продаж",
    category: "excavators"
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
    category: "cranes"
  },
  {
    id: "3",
    name: "Бульдозер KOMATSU D65 - Гусеничный, мощность 190 л.с.",
    price: 3200000,
    rating: 4.6,
    reviews: 156,
    image: shoesImg,
    category: "bulldozers"
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
    category: "loaders"
  },
  {
    id: "5",
    name: "Самосвал KAMAZ 65115 - Грузоподъемность 15 тонн",
    price: 1850000,
    originalPrice: 2100000,
    rating: 4.5,
    reviews: 234,
    image: headphonesImg,
    category: "trucks"
  },
  {
    id: "6",
    name: "Компрессор Atlas Copco - Передвижной, производительность 12 м³/мин",
    price: 850000,
    rating: 4.4,
    reviews: 67,
    image: phoneImg,
    badge: "Проф",
    category: "tools"
  },
  {
    id: "7",
    name: "Виброкаток BOMAG 120 - Двухвальцовый, вес 12 тонн",
    price: 1950000,
    originalPrice: 2200000,
    rating: 4.3,
    reviews: 43,
    image: shoesImg,
    category: "construction"
  },
  {
    id: "8",
    name: "Телескопический погрузчик MANITOU MLT 634 - Высота подъема 6 м",
    price: 1650000,
    rating: 4.6,
    reviews: 78,
    image: laptopImg,
    badge: "Надежный",
    category: "loaders"
  }
];

const categories = [
  { id: "all", label: "Все категории", count: catalogProducts.length },
  { id: "excavators", label: "Экскаваторы", count: catalogProducts.filter(p => p.category === "excavators").length },
  { id: "cranes", label: "Автокраны", count: catalogProducts.filter(p => p.category === "cranes").length },
  { id: "trucks", label: "Грузовики", count: catalogProducts.filter(p => p.category === "trucks").length },
  { id: "loaders", label: "Погрузчики", count: catalogProducts.filter(p => p.category === "loaders").length },
  { id: "tools", label: "Инструменты", count: catalogProducts.filter(p => p.category === "tools").length },
  { id: "construction", label: "Стройтехника", count: catalogProducts.filter(p => p.category === "construction").length },
  { id: "bulldozers", label: "Бульдозеры", count: catalogProducts.filter(p => p.category === "bulldozers").length }
];

const Catalog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getFilteredProducts = (categoryId: string) => {
    return catalogProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryId === "all" || product.category === categoryId;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredProducts = getFilteredProducts(selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Access Bar */}
      {!user && (
        <div className="bg-primary/10 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Войдите для доступа к расширенным функциям</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Войти</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Каталог техники</h1>
              <p className="text-muted-foreground mt-2">
                Найдите нужную спецтехнику из {catalogProducts.length} предложений
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-primary font-bold">MAYDON</span>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, модели, характеристикам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Вид:</span>
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs lg:text-sm"
              >
                <div className="flex flex-col items-center">
                  <span>{category.label}</span>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {getFilteredProducts(category.id).length}
                  </Badge>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content for each category */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {getFilteredProducts(category.id).length}
                  </span>
                  {" "}предложений
                  {category.id !== "all" && (
                    <span> в категории "{category.label}"</span>
                  )}
                  {searchQuery && (
                    <span> по запросу "{searchQuery}"</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Сортировка: По популярности</span>
                </div>
              </div>

              {/* Products Display */}
              {getFilteredProducts(category.id).length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1 max-w-4xl mx-auto'
                }`}>
                  {getFilteredProducts(category.id).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-12 text-center">
                    <div className="text-muted-foreground mb-4">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                      <p>
                        {searchQuery ? 
                          `Не найдено товаров по запросу "${searchQuery}" в категории "${category.label}"` :
                          `В категории "${category.label}" пока нет товаров`
                        }
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                    >
                      Показать все товары
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Load More */}
              {getFilteredProducts(category.id).length > 8 && (
                <div className="text-center pt-8">
                  <Button variant="outline" size="lg">
                    Загрузить ещё ({getFilteredProducts(category.id).length - 8} товаров)
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;