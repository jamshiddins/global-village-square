import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  // Save cart to localStorage
  const saveCart = (newItems: CartItem[]) => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newItems));
    }
    setItems(newItems);
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

    const existingItem = items.find(item => item.product_id === productId);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = items.map(item =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${productId}`,
        product_id: productId,
        product_name: productName,
        product_price: productPrice,
        product_image: productImage,
        quantity: quantity,
      };
      newItems = [...items, newItem];
    }

    saveCart(newItems);
    toast({
      title: "Добавлено в корзину",
      description: `${productName} добавлен в корзину`,
    });
    return true;
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    const newItems = items.filter(item => item.product_id !== productId);
    saveCart(newItems);
    toast({
      title: "Удалено из корзины",
      description: "Товар удален из корзины",
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;

    const newItems = items.map(item =>
      item.product_id === productId
        ? { ...item, quantity }
        : item
    );
    saveCart(newItems);
  };

  const clearCart = async () => {
    if (!user) return;

    saveCart([]);
    toast({
      title: "Корзина очищена",
      description: "Все товары удалены из корзины",
    });
  };

  const fetchCartItems = async () => {
    // Already handled by useEffect
  };

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