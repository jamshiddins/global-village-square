import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface VoiceSearchProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearch, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Голосовой поиск не поддерживается",
        description: "Ваш браузер не поддерживает голосовой ввод",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Голосовой поиск активен",
        description: "Говорите... Например: 'Найди экскаватор до 5 миллионов'",
      });
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);

      if (finalTranscript) {
        handleVoiceCommand(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Ошибка распознавания",
        description: "Не удалось распознать речь. Попробуйте еще раз.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopVoiceSearch = () => {
    setIsListening(false);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Обработка команд поиска
    if (lowerCommand.includes('найди') || lowerCommand.includes('покажи') || lowerCommand.includes('ищу')) {
      let searchQuery = '';
      
      // Извлекаем поисковый запрос
      if (lowerCommand.includes('экскаватор')) {
        searchQuery = 'экскаватор';
      } else if (lowerCommand.includes('кран') || lowerCommand.includes('автокран')) {
        searchQuery = 'автокран';
      } else if (lowerCommand.includes('погрузчик')) {
        searchQuery = 'погрузчик';
      } else if (lowerCommand.includes('бульдозер')) {
        searchQuery = 'бульдозер';
      } else if (lowerCommand.includes('грузовик')) {
        searchQuery = 'грузовик';
      } else {
        // Извлекаем запрос после ключевых слов
        const keywords = ['найди', 'покажи', 'ищу'];
        for (const keyword of keywords) {
          const index = lowerCommand.indexOf(keyword);
          if (index !== -1) {
            searchQuery = command.substring(index + keyword.length).trim();
            break;
          }
        }
      }

      if (searchQuery) {
        toast({
          title: "Поиск запущен",
          description: `Ищем: ${searchQuery}`,
        });
        
        if (onSearch) {
          onSearch(searchQuery);
        } else {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      }
    }
    
    // Обработка навигационных команд
    else if (lowerCommand.includes('корзина') || lowerCommand.includes('корзину')) {
      navigate('/cart');
      toast({
        title: "Переход в корзину",
        description: "Открываем вашу корзину",
      });
    }
    
    else if (lowerCommand.includes('избранное') || lowerCommand.includes('избранные')) {
      navigate('/wishlist');
      toast({
        title: "Переход в избранное",
        description: "Открываем избранные товары",
      });
    }
    
    else if (lowerCommand.includes('каталог')) {
      navigate('/catalog');
      toast({
        title: "Переход в каталог",
        description: "Открываем каталог товаров",
      });
    }
    
    else {
      // Если команда не распознана, делаем обычный поиск
      if (command.trim()) {
        if (onSearch) {
          onSearch(command);
        } else {
          navigate(`/search?q=${encodeURIComponent(command)}`);
        }
        toast({
          title: "Поиск",
          description: `Ищем: ${command}`,
        });
      }
    }
    
    setTranscript('');
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        onClick={isListening ? stopVoiceSearch : startVoiceSearch}
        className={`${isListening ? 'animate-pulse' : ''} transition-all duration-200`}
        title="Голосовой поиск"
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        {isListening && (
          <span className="ml-2 text-xs">Слушаю...</span>
        )}
      </Button>
      
      {transcript && (
        <div className="absolute top-full mt-2 p-2 bg-popover border rounded-md shadow-md text-sm min-w-48 z-10">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span>{transcript}</span>
          </div>
        </div>
      )}
    </div>
  );
};