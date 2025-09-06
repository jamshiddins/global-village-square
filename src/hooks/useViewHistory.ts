import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface ViewHistoryItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  created_at: string;
}

export const useViewHistory = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ViewHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load view history from localStorage
  useEffect(() => {
    if (user) {
      const savedHistory = localStorage.getItem(`viewHistory_${user.id}`);
      if (savedHistory) {
        setItems(JSON.parse(savedHistory));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  // Save view history to localStorage
  const saveViewHistory = (newItems: ViewHistoryItem[]) => {
    if (user) {
      localStorage.setItem(`viewHistory_${user.id}`, JSON.stringify(newItems));
    }
    setItems(newItems);
  };

  const addToViewHistory = async (productId: string, productName: string, productPrice: number, productImage: string) => {
    if (!user) return;

    // Remove existing entry if it exists
    const filteredItems = items.filter(item => item.product_id !== productId);
    
    // Add new entry at the beginning
    const newItem: ViewHistoryItem = {
      id: `history_${Date.now()}_${productId}`,
      product_id: productId,
      product_name: productName,
      product_price: productPrice,
      product_image: productImage,
      created_at: new Date().toISOString(),
    };

    // Keep only last 20 items
    const newItems = [newItem, ...filteredItems].slice(0, 20);
    saveViewHistory(newItems);
  };

  const fetchViewHistory = async () => {
    // Already handled by useEffect
  };

  return {
    items,
    loading,
    addToViewHistory,
    fetchViewHistory,
  };
};
