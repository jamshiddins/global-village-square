export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  specifications: Record<string, string>;
  seller: {
    name: string;
    rating: number;
    location: string;
    phone: string;
  };
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Экскаватор Caterpillar 320D',
    price: 5500000,
    originalPrice: 6000000,
    rating: 4.8,
    reviews: 127,
    image: '/src/assets/product-headphones.jpg',
    category: 'Экскаваторы',
    badge: 'ХИТ',
    description: 'Мощный гусеничный экскаватор Caterpillar 320D с рабочим весом 20 тонн. Идеально подходит для земляных работ, строительства и коммунальных нужд.',
    specifications: {
      'Мощность двигателя': '122 кВт (163 л.с.)',
      'Рабочий вес': '20 100 кг',
      'Глубина копания': '6 520 мм',
      'Высота выгрузки': '6 100 мм',
      'Радиус копания': '9 640 мм',
      'Объем ковша': '1,0 м³'
    },
    seller: {
      name: 'ТехноСпец',
      rating: 4.9,
      location: 'Москва, Россия',
      phone: '+7 (495) 123-45-67'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Автокран КАМАЗ 65115',
    price: 4200000,
    rating: 4.6,
    reviews: 89,
    image: '/src/assets/product-laptop.jpg',
    category: 'Автокраны',
    description: 'Автокран на шасси КАМАЗ с грузоподъемностью 25 тонн. Надежная техника для строительных работ.',
    specifications: {
      'Грузоподъемность': '25 000 кг',
      'Длина стрелы': '28 м',
      'Двигатель': 'КАМАЗ-740.50',
      'Мощность': '260 л.с.',
      'Радиус поворота': '12,5 м'
    },
    seller: {
      name: 'КранСервис',
      rating: 4.7,
      location: 'Санкт-Петербург, Россия',
      phone: '+7 (812) 345-67-89'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Погрузчик JCB 3CX',
    price: 3800000,
    originalPrice: 4100000,
    rating: 4.7,
    reviews: 156,
    image: '/src/assets/product-phone.jpg',
    category: 'Погрузчики',
    badge: 'НОВИНКА',
    description: 'Экскаватор-погрузчик JCB 3CX - универсальная техника для различных работ.',
    specifications: {
      'Мощность двигателя': '81 кВт (109 л.с.)',
      'Максимальная скорость': '40 км/ч',
      'Глубина копания': '5,72 м',
      'Высота разгрузки': '2,74 м',
      'Грузоподъемность': '3000 кг'
    },
    seller: {
      name: 'МашСтрой',
      rating: 4.8,
      location: 'Екатеринбург, Россия',
      phone: '+7 (343) 567-89-01'
    },
    inStock: true,
    isNew: true
  },
  {
    id: '4',
    name: 'Грузовик МАЗ 6312',
    price: 2800000,
    rating: 4.4,
    reviews: 203,
    image: '/src/assets/product-shoes.jpg',
    category: 'Грузовики',
    description: 'Седельный тягач МАЗ для дальних перевозок. Надежность и экономичность.',
    specifications: {
      'Мощность двигателя': '330 л.с.',
      'Полная масса': '33 500 кг',
      'Грузоподъемность': '18 000 кг',
      'Расход топлива': '32 л/100км',
      'Коробка передач': 'ZF 9S1310'
    },
    seller: {
      name: 'АвтоТранс',
      rating: 4.5,
      location: 'Минск, Беларусь',
      phone: '+375 17 234-56-78'
    },
    inStock: true
  },
  {
    id: '5',
    name: 'Бульдозер Т-170',
    price: 3200000,
    originalPrice: 3600000,
    rating: 4.5,
    reviews: 95,
    image: '/src/assets/product-headphones.jpg',
    category: 'Бульдозеры',
    badge: 'СКИДКА',
    description: 'Гусеничный бульдозер Т-170 для тяжелых земляных работ.',
    specifications: {
      'Мощность двигателя': '180 л.с.',
      'Эксплуатационная масса': '16 500 кг',
      'Отвал': 'неповоротный',
      'Ширина отвала': '3,74 м',
      'Высота отвала': '1,35 м'
    },
    seller: {
      name: 'СтройТех',
      rating: 4.6,
      location: 'Новосибирск, Россия',
      phone: '+7 (383) 123-45-67'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Каток ДУ-85',
    price: 1800000,
    rating: 4.3,
    reviews: 67,
    image: '/src/assets/product-laptop.jpg',
    category: 'Дорожная техника',
    description: 'Дорожный каток для уплотнения асфальта и грунта.',
    specifications: {
      'Тип': 'вибрационный',
      'Рабочая ширина': '1,68 м',
      'Масса': '8 500 кг',
      'Мощность': '85 л.с.',
      'Частота вибрации': '45 Гц'
    },
    seller: {
      name: 'ДорСтрой',
      rating: 4.4,
      location: 'Казань, Россия',
      phone: '+7 (843) 234-56-78'
    },
    inStock: false
  },
  {
    id: '7',
    name: 'Перфоратор Makita HR2630',
    price: 15500,
    originalPrice: 18000,
    rating: 4.9,
    reviews: 324,
    image: '/src/assets/product-phone.jpg',
    category: 'Инструменты',
    badge: 'ТОП',
    description: 'Профессиональный перфоратор для строительных работ.',
    specifications: {
      'Мощность': '800 Вт',
      'Энергия удара': '2,4 Дж',
      'Частота ударов': '4600 уд/мин',
      'Вес': '2,8 кг',
      'Патрон': 'SDS-Plus'
    },
    seller: {
      name: 'ИнструментПро',
      rating: 4.8,
      location: 'Москва, Россия',
      phone: '+7 (495) 789-01-23'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: '8',
    name: 'Генератор Hyundai HHY9000FE',
    price: 85000,
    rating: 4.6,
    reviews: 178,
    image: '/src/assets/product-shoes.jpg',
    category: 'Инструменты',
    description: 'Бензиновый генератор для автономного электроснабжения.',
    specifications: {
      'Мощность': '6,5 кВт',
      'Объем топливного бака': '25 л',
      'Время работы': '13 часов',
      'Вес': '72 кг',
      'Тип запуска': 'электростартер'
    },
    seller: {
      name: 'ЭнергоТех',
      rating: 4.7,
      location: 'Ростов-на-Дону, Россия',
      phone: '+7 (863) 456-78-90'
    },
    inStock: true
  }
];

export const categories = [
  {
    id: 'excavators',
    name: 'Экскаваторы',
    count: products.filter(p => p.category === 'Экскаваторы').length,
    image: '/src/assets/category-excavator.jpg'
  },
  {
    id: 'cranes',
    name: 'Автокраны',
    count: products.filter(p => p.category === 'Автокраны').length,
    image: '/src/assets/category-crane.jpg'
  },
  {
    id: 'loaders',
    name: 'Погрузчики',
    count: products.filter(p => p.category === 'Погрузчики').length,
    image: '/src/assets/category-loader.jpg'
  },
  {
    id: 'trucks',
    name: 'Грузовики',
    count: products.filter(p => p.category === 'Грузовики').length,
    image: '/src/assets/category-truck.jpg'
  },
  {
    id: 'bulldozers',
    name: 'Бульдозеры',
    count: products.filter(p => p.category === 'Бульдозеры').length,
    image: '/src/assets/category-bulldozer.jpg'
  },
  {
    id: 'road-equipment',
    name: 'Дорожная техника',
    count: products.filter(p => p.category === 'Дорожная техника').length,
    image: '/src/assets/category-road.jpg'
  },
  {
    id: 'tools',
    name: 'Инструменты',
    count: products.filter(p => p.category === 'Инструменты').length,
    image: '/src/assets/category-tools.jpg'
  }
];