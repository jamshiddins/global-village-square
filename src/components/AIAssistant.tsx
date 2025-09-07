import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'uz' | 'en'>('ru');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Приветственное сообщение
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: language === 'uz' ? 
          "Assalomu alaykum! Men MYDON Helper - sizning shaxsiy yordamchingizman. Qurilish texnikasi bo'yicha har qanday savolingizga javob berishga tayyorman!" :
          language === 'en' ?
          "Hello! I'm MYDON Helper - your personal AI assistant. I'm ready to help you with any questions about construction equipment!" :
          "Добро пожаловать! Я MYDON Helper - ваш персональный ИИ-помощник. Готов помочь с любыми вопросами о спецтехнике!",
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          language === 'uz' ? "Ekskavator kerak" : 
          language === 'en' ? "Need an excavator" : "Нужен экскаватор",
          
          language === 'uz' ? "Narxlarni solishtiring" :
          language === 'en' ? "Compare prices" : "Сравнить цены",
          
          language === 'uz' ? "Lizing hisobi" :
          language === 'en' ? "Leasing calculator" : "Лизинговый калькулятор"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  // Прокрутка к последнему сообщению
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Голосовой ввод
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Ошибка",
        description: "Голосовой ввод не поддерживается в вашем браузере",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'uz' ? 'uz-UZ' : language === 'en' ? 'en-US' : 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Ошибка",
        description: "Не удалось распознать речь",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const sendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message: text.trim(),
          language,
          context: `Current page: Equipment marketplace, User looking at products`
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date(),
        suggestions: data.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'uz' ? 
          "Kechirasiz, xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring." :
          language === 'en' ?
          "Sorry, an error occurred. Please try again." :
          "Извините, произошла ошибка. Попробуйте еще раз.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-ai-assistant-bg hover:bg-ai-assistant-hover shadow-ai transition-all duration-300 hover:scale-110 z-50"
          size="lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Чат окно */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-ai border-primary/20 z-50 flex flex-col bg-card">
          {/* Заголовок */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">MYDON Helper</h3>
                <p className="text-xs opacity-90">
                  {language === 'uz' ? 'AI Yordamchi' : 
                   language === 'en' ? 'AI Assistant' : 'ИИ Помощник'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Переключатель языка */}
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as 'ru' | 'uz' | 'en')}
                className="bg-primary-foreground/20 text-primary-foreground text-xs rounded px-2 py-1 border-0 outline-0"
              >
                <option value="ru">RU</option>
                <option value="uz">UZ</option>
                <option value="en">EN</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Сообщения */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-center gap-2 mb-1 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      {!message.isUser && <Bot className="w-4 h-4 text-primary" />}
                      {message.isUser && <User className="w-4 h-4 text-muted-foreground" />}
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      message.isUser 
                        ? 'bg-ai-bubble-user text-white' 
                        : 'bg-ai-bubble-bot border border-border'
                    }`}>
                      {message.text}
                    </div>
                    
                    {/* Предложения */}
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-xs justify-start"
                            onClick={() => sendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-ai-bubble-bot border border-border rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Ввод сообщения */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === 'uz' ? "Savolingizni yozing..." :
                  language === 'en' ? "Type your question..." :
                  "Напишите ваш вопрос..."
                }
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={startVoiceInput}
                disabled={isLoading || isListening}
                className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};