import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';
import { Search as SearchIcon, Filter, X, ArrowLeft } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    filterProducts(query);
  }, [searchParams]);

  const filterProducts = (query: string) => {
    let filtered = products;

    // Search by query
    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('relevance');
  };

  useEffect(() => {
    filterProducts(searchQuery);
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

  const categories = [...new Set(products.map(p => p.category))];
  const hasActiveFilters = selectedCategories.length > 0 || priceRange.min || priceRange.max;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>На главную</span>
          </Button>
          
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск техники..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Найти</Button>
            </form>
          </div>
        </div>

        {/* Search Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Поиск техники'}
            </h1>
            <p className="text-muted-foreground">
              Найдено {filteredProducts.length} товаров
            </p>
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
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
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
                      <X className="h-4 w-4 mr-1" />
                      Очистить
                    </Button>
                  )}
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Категории</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded"
                        />
                        <span className="text-sm">{category}</span>
                        <Badge variant="outline" className="text-xs">
                          {products.filter(p => p.category === category).length}
                        </Badge>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
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
                        const inStockProducts = products.filter(p => p.inStock);
                        setFilteredProducts(inStockProducts);
                      }}
                    >
                      В наличии ({products.filter(p => p.inStock).length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        const discountProducts = products.filter(p => p.originalPrice);
                        setFilteredProducts(discountProducts);
                      }}
                    >
                      Со скидкой ({products.filter(p => p.originalPrice).length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        const newProducts = products.filter(p => p.isNew);
                        setFilteredProducts(newProducts);
                      }}
                    >
                      Новинки ({products.filter(p => p.isNew).length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Ничего не найдено</h2>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры поиска или очистить фильтры
                </p>
                <Button onClick={clearFilters}>Очистить фильтры</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;