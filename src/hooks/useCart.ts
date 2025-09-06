import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product_name: string;
  product_price: number;
  product_image: string;
}

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, productName: string, productPrice: number, productImage: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в систему для добавления товаров в корзину",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity,
          product_name: productName,
          product_price: productPrice,
          product_image: productImage,
        }, {
          onConflict: 'user_id,product_id'
        })
        .select()
        .single();

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Добавлено в корзину",
        description: `${productName} добавлен в корзину`,
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар в корзину",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Удалено из корзины",
        description: "Товар удален из корзины",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      toast({
        title: "Корзина очищена",
        description: "Все товары удалены из корзины",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  return {
    items,
    loading,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartItems,
  };
};