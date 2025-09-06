import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { 
  Menu, 
  Home, 
  Grid3x3, 
  ShoppingCart, 
  Heart, 
  User, 
  Search,
  Building2,
  LogIn,
  LogOut
} from 'lucide-react';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Grid3x3, label: 'Каталог', path: '/catalog' },
    { icon: Search, label: 'Поиск', path: '/search' },
    { 
      icon: ShoppingCart, 
      label: 'Корзина', 
      path: '/cart',
      badge: totalItems > 0 ? totalItems.toString() : undefined
    },
    { 
      icon: Heart, 
      label: 'Избранное', 
      path: '/wishlist',
      badge: wishlistItems.length > 0 ? wishlistItems.length.toString() : undefined
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">MAYDON</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4">
          {/* User Section */}
          {user ? (
            <div className="border-b border-border pb-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/profile')}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Личный кабинет
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleNavigation('/auth')}
            >
              <LogIn className="h-4 w-4 mr-3" />
              Войти в систему
            </Button>
          )}
          
          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start relative"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>
          
          {/* Categories */}
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Категории</h3>
            <div className="space-y-2">
              {['Экскаваторы', 'Автокраны', 'Погрузчики', 'Грузовики', 'Инструменты'].map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm"
                  onClick={() => handleNavigation(`/catalog?category=${encodeURIComponent(category)}`)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Sign Out */}
          {user && (
            <div className="border-t border-border pt-4 mt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Выйти
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};