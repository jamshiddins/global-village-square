import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const navigateToCategory = useCallback((categoryId: string) => {
    navigate(`/catalog?category=${encodeURIComponent(categoryId)}`);
  }, [navigate]);

  const navigateToProduct = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  const navigateToCatalog = useCallback(() => {
    navigate('/catalog');
  }, [navigate]);

  const navigateToCart = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const navigateToWishlist = useCallback(() => {
    navigate('/wishlist');
  }, [navigate]);

  const handleAction = useCallback((action: string) => {
    toast({
      title: "Действие",
      description: action,
    });
  }, [toast]);

  return {
    navigateToCategory,
    navigateToProduct,
    navigateToCatalog,
    navigateToCart,
    navigateToWishlist,
    handleAction,
  };
};