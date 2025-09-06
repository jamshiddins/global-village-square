import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/hooks/useNavigation";
import { useState } from "react";

export const Header = () => {
  const { handleAction, navigateToCategory } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems] = useState(3);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleAction(`Поиск: ${searchQuery}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => handleAction("Меню")}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              СпецТехМаркет
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative flex w-full">
              <Input
                type="text"
                placeholder="Поиск спецтехники..."
                className="flex-1 pr-12 border-2 border-border focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8"
                variant="default"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => handleAction("Избранное")}
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => handleAction("Корзина")}
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItems}
              </Badge>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => handleAction("Вход в аккаунт")}
            >
              <User className="h-4 w-4 mr-2" />
              Войти
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-4 md:hidden">
          <div className="relative flex w-full">
            <Input
              type="text"
              placeholder="Поиск спецтехники..."
              className="flex-1 pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1 h-8 w-8"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex pb-4 space-x-6">
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Экскаваторы")}
          >
            Экскаваторы
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Автокраны")}
          >
            Автокраны
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Грузовики")}
          >
            Грузовики
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Погрузчики")}
          >
            Погрузчики
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Инструменты")}
          >
            Инструменты
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm font-medium"
            onClick={() => navigateToCategory("Сервис")}
          >
            Сервис
          </Button>
        </nav>
      </div>
    </header>
  );
};