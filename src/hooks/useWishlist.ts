import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  created_at: string;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  // Save wishlist to localStorage
  const saveWishlist = (newItems: WishlistItem[]) => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newItems));
    }
    setItems(newItems);
  };

  const addToWishlist = async (productId: string, productName: string, productPrice: number, productImage: string) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в систему для добавления в избранное",
        variant: "destructive",
      });
      return false;
    }

    // Check if already in wishlist
    if (items.some(item => item.product_id === productId)) {
      toast({
        title: "Уже в избранном",
        description: "Этот товар уже добавлен в избранное",
        variant: "destructive",
      });
      return false;
    }

    const newItem: WishlistItem = {
      id: `wishlist_${Date.now()}_${productId}`,
      product_id: productId,
      product_name: productName,
      product_price: productPrice,
      product_image: productImage,
      created_at: new Date().toISOString(),
    };

    const newItems = [...items, newItem];
    saveWishlist(newItems);
    toast({
      title: "Добавлено в избранное",
      description: `${productName} добавлен в избранное`,
    });
    return true;
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    const newItems = items.filter(item => item.product_id !== productId);
    saveWishlist(newItems);
    toast({
      title: "Удалено из избранного",
      description: "Товар удален из избранного",
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.product_id === productId);
  };

  const fetchWishlistItems = async () => {
    // Already handled by useEffect
  };

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlistItems,
  };
};