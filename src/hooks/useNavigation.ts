import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNavigation = () => {
  const { toast } = useToast();

  const navigateToCategory = useCallback((categoryId: string) => {
    toast({
      title: "Навигация",
      description: `Переход в категорию: ${categoryId}`,
    });
  }, [toast]);

  const navigateToProduct = useCallback((productId: string) => {
    toast({
      title: "Продукт",
      description: `Открытие товара ID: ${productId}`,
    });
  }, [toast]);

  const navigateToCatalog = useCallback(() => {
    toast({
      title: "Каталог",
      description: "Открытие полного каталога",
    });
  }, [toast]);

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