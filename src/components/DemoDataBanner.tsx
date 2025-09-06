import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";
import { useState } from "react";

export const DemoDataBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="bg-primary/5 border-primary/20 mb-4">
      <Info className="h-4 w-4 text-primary" />
      <div className="flex items-center justify-between">
        <AlertDescription className="text-sm">
          <strong>Демо-режим:</strong> Все данные в этом приложении являются тестовыми. 
          Для входа используйте: <code className="bg-muted px-1 rounded">test@maydon.ru</code> / <code className="bg-muted px-1 rounded">maydon123</code>
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-auto p-1 ml-2"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Alert>
  );
};