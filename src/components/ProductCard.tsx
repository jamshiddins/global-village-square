import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye, Star, Share2, ArrowRight } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/hooks/use-toast';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isWishlisted?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
  isWishlisted = false,
  className = ''
}) => {
  const { navigateToProduct } = useNavigation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInWishlistState = isInWishlist(id) || isWishlisted;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Войдите в аккаунт",
        description: "Для добавления в избранное необходимо войти в систему",
        variant: "destructive"
      });
      return;
    }

    if (isInWishlistState) {
      removeFromWishlist(id);
      toast({
        title: "Удалено из избранного",
        description: name,
      });
    } else {
      addToWishlist(id, name, price, image);
      toast({
        title: "Добавлено в избранное",
        description: name,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(id, name, price, image);
    toast({
      title: "Добавлено в корзину",
      description: name,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Посмотрите на ${name} на MYDON`,
        url: window.location.origin + `/product/${id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/product/${id}`);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на товар скопирована в буфер обмена",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      className={`group cursor-pointer overflow-hidden bg-product-card hover:bg-product-hover border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-product hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateToProduct(id)}
    >
      <CardContent className="p-0">
        {/* Изображение товара */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
              <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-muted-foreground/40" />
              </div>
            </div>
          )}
          
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {badge && (
              <Badge 
                variant={badge === 'ХИТ' ? 'default' : badge === 'НОВИНКА' ? 'secondary' : 'outline'}
                className={`text-xs font-bold ${
                  badge === 'ХИТ' ? 'bg-badge-success text-white' :
                  badge === 'НОВИНКА' ? 'bg-badge-info text-white' :
                  badge === 'СКИДКА' ? 'bg-badge-warning text-white' :
                  'bg-badge-info text-white'
                }`}
              >
                {badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs font-bold bg-badge-danger text-white">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Действия при наведении */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <Button
              variant="secondary"
              size="sm"
              className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-md"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isInWishlistState ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-md"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* Быстрый просмотр */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full bg-white/90 hover:bg-white text-gray-900 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                navigateToProduct(id);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Быстрый просмотр
            </Button>
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="p-4 space-y-3">
          {/* Название */}
          <h3 className="font-semibold text-foreground line-clamp-2 min-h-[3rem] text-sm leading-tight">
            {name}
          </h3>

          {/* Рейтинг */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-rating text-rating" />
              <span className="text-sm font-medium text-foreground">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviews} отзывов)</span>
          </div>

          {/* Цена */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-price">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <p className="text-xs text-badge-success font-medium">
                Экономия {formatPrice(originalPrice! - price)}
              </p>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              В корзину
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="px-3 border-primary/20 hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                navigateToProduct(id);
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};