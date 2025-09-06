import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart(item.product_id, item.product_name, item.product_price, item.product_image);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Избранное пусто</h1>
            <p className="text-muted-foreground mb-6">Добавьте товары в избранное</p>
            <Button onClick={() => navigate('/catalog')}>
              Перейти в каталог
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/catalog')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Каталог</span>
          </Button>
          <h1 className="text-2xl font-bold">
            Избранное ({items.length} товаров)
          </h1>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={item.product_image} 
                    alt={item.product_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => removeFromWishlist(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {item.product_name}
                  </h3>

                  <div className="text-lg font-bold text-price">
                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(item.product_price)}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      В корзину
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/product/${item.product_id}`)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;