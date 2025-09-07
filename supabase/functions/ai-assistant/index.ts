import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, language = 'ru' } = await req.json();
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Системный промпт для MYDON ассистента
    const systemPrompt = language === 'uz' ? 
      `Siz MYDON Helper - qurilish texnikasi bo'yicha yordamchisiz. Siz foydalanuvchilarga texnika tanlash, narxlarni hisoblash, savdo-sotiq jarayonida yordam berasiz. Siz do'stona, professional va foydali javoblar berishingiz kerak. Faqat O'zbek tilida javob bering.` :
      language === 'en' ?
      `You are MYDON Helper - an AI assistant for construction equipment marketplace. You help users choose equipment, calculate prices, and assist with purchasing decisions. Be friendly, professional, and helpful. Answer only in English.` :
      `Вы - MYDON Helper, ИИ-ассистент для маркетплейса спецтехники. Вы помогаете пользователям выбирать технику, рассчитывать стоимость, принимать решения о покупке. Будьте дружелюбными, профессиональными и полезными. Отвечайте только на русском языке.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt + (context ? `\n\nКонтекст: ${context}` : '')
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({
      message: assistantMessage,
      suggestions: [
        language === 'uz' ? "Texnika narxini hisoblash" : 
        language === 'en' ? "Calculate equipment cost" : "Рассчитать стоимость техники",
        
        language === 'uz' ? "Yetkazib berish xizmati" :
        language === 'en' ? "Delivery service" : "Доставка",
        
        language === 'uz' ? "Texnik ko'rsatkichlar" :
        language === 'en' ? "Technical specifications" : "Характеристики"
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI assistant:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: 'Извините, произошла ошибка. Попробуйте еще раз.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});