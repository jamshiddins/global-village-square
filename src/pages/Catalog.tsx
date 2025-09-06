import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  GridIcon, 
  List,
  Building2,
  User,
  LogIn
} from 'lucide-react';

// Mock data for catalog
const catalogProducts = [
  {
    id: "1",
    name: "Экскаватор CATERPILLAR 320D - Гусеничный, 20 тонн",
    price: 2850000,
    originalPrice: 3200000,
    rating: 4.8,
    reviews: 127,
    image: "/src/assets/product-headphones.jpg",
    badge: "Хит Продаж",
    category: "Экскаваторы"
  },
  {
    id: "2",
    name: "Автокран LIEBHERR 50 тонн - Мобильный, телескопический",
    price: 4500000,
    originalPrice: 5000000,
    rating: 4.9,
    reviews: 89,
    image: "/src/assets/product-phone.jpg",
    badge: "Новинка",
    category: "Автокраны"
  },
  // Add more products...
];

const categories = [
  "Все категории",
  "Экскаваторы", 
  "Автокраны",
  "Грузовики",
  "Погрузчики",
  "Инструменты",
  "Стройтехника"
];

const Catalog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = catalogProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все категории" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
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

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
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

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Найдено {filteredProducts.length} предложений
            {selectedCategory !== "Все категории" && (
              <span> в категории "{selectedCategory}"</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Сортировка: По популярности</span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                <p>Попробуйте изменить параметры поиска или выберите другую категорию</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Все категории");
                }}
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Загрузить ещё
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;