import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNavigation = () => {
  const { toast } = useToast();

  const navigateToCategory = useCallback((categoryId: string) => {
    window.location.href = `/catalog?category=${encodeURIComponent(categoryId)}`;
  }, []);

  const navigateToProduct = useCallback((productId: string) => {
    toast({
      title: "Продукт",
      description: `Открытие товара: ${productId}`,
    });
  }, [toast]);

  const navigateToCatalog = useCallback(() => {
    window.location.href = '/catalog';
  }, []);

  const handleAction = useCallback((action: string) => {
    toast({
      title: "Действие",
      description: `Выполнение: ${action}`,
    });
  }, [toast]);

  return {
    navigateToCategory,
    navigateToProduct,
    navigateToCatalog,
    handleAction,
  };
};