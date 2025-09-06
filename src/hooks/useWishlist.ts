import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product_name: string;
  product_price: number;
  product_image: string;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlistItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
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

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          product_image: productImage,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchWishlistItems();
      toast({
        title: "Добавлено в избранное",
        description: `${productName} добавлен в избранное`,
      });
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить в избранное",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchWishlistItems();
      toast({
        title: "Удалено из избранного",
        description: "Товар удален из избранного",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.product_id === productId);
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [user]);

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlistItems,
  };
};