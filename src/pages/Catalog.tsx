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
import { products } from '@/data/products';
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

const Catalog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });

  // Get unique categories from products
  const categories = [
    { id: 'all', name: 'Все категории', count: products.length },
    ...Array.from(new Set(products.map(p => p.category))).map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      count: products.filter(p => p.category === category).length
    }))
  ];

  // Filter products
  let filteredProducts = products;

  // Filter by category
  if (selectedCategory !== 'all') {
    const categoryName = categories.find(c => c.id === selectedCategory)?.name;
    if (categoryName) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryName);
    }
  }

  // Filter by search query
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by price range
  if (priceRange.min || priceRange.max) {
    filteredProducts = filteredProducts.filter(product => {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      return product.price >= min && product.price <= max;
    });
  }

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('relevance');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery || priceRange.min || priceRange.max;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Access Bar */}
      {!user && (
        <div className="bg-primary/10 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Войдите для доступа к личному кабинету и расширенным функциям</span>
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

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Каталог техники</h1>
            <p className="text-muted-foreground">
              Найдено {filteredProducts.length} товаров
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="hidden md:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-md bg-background"
            >
              <option value="relevance">По релевантности</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
              <option value="reviews">По отзывам</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Фильтры
                  </h3>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-destructive"
                    >
                      Очистить
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Поиск по каталогу..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Категории</h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-between text-left"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Цена (₽)</h4>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="От"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="До"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Быстрые фильтры</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter for products with discount
                        const discountProducts = products.filter(p => p.originalPrice);
                        console.log('Discount products:', discountProducts);
                      }}
                    >
                      Со скидкой ({products.filter(p => p.originalPrice).length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter for products in stock
                        const inStockProducts = products.filter(p => p.inStock);
                        console.log('In stock products:', inStockProducts);
                      }}
                    >
                      В наличии ({products.filter(p => p.inStock).length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter for new products
                        const newProducts = products.filter(p => p.isNew);
                        console.log('New products:', newProducts);
                      }}
                    >
                      Новинки ({products.filter(p => p.isNew).length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter for popular products
                        const popularProducts = products.filter(p => p.isPopular);
                        console.log('Popular products:', popularProducts);
                      }}
                    >
                      Популярные ({products.filter(p => p.isPopular).length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Товары не найдены</h2>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры поиска или очистить фильтры
                </p>
                <Button onClick={clearFilters}>Очистить фильтры</Button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
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
                
                {filteredProducts.length > 12 && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                      Загрузить ещё товары
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;