import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ViewHistoryItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product_name: string;
  product_price: number;
  product_image: string;
}

export const useViewHistory = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ViewHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchViewHistory = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('view_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching view history:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToViewHistory = async (productId: string, productName: string, productPrice: number, productImage: string) => {
    if (!user) return;

    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('view_history')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existing) {
        // Update timestamp
        await supabase
          .from('view_history')
          .update({ created_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        // Insert new record
        await supabase
          .from('view_history')
          .insert({
            user_id: user.id,
            product_id: productId,
            product_name: productName,
            product_price: productPrice,
            product_image: productImage,
          });
      }

      await fetchViewHistory();
    } catch (error) {
      console.error('Error adding to view history:', error);
    }
  };

  useEffect(() => {
    fetchViewHistory();
  }, [user]);

  return {
    items,
    loading,
    addToViewHistory,
    fetchViewHistory,
  };
};