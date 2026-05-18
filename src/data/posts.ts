export interface Post {
  slug: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  content: { es: string; en: string };
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  image: string;
  imageAlt: { es: string; en: string };
  featured: boolean;
  seoTitle?: { es: string; en: string };
  seoDescription?: { es: string; en: string };
  faqs?: FAQ[];
  contentIsHtml?: boolean;
}

export interface Author {
  name: string;
  avatar: string;
  bio: { es: string; en: string };
  twitter?: string;
}

export interface FAQ {
  question: { es: string; en: string };
  answer: { es: string; en: string };
}

export interface Category {
  slug: string;
  name: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
  color: string;
  postCount?: number;
}

export const AUTHORS: Record<string, Author> = {
  carlos: {
    name: 'Carlos Mendoza',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    bio: {
      es: 'Editor jefe de TechPulse. Apasionado de la tecnología con más de 10 años de experiencia analizando gadgets y tendencias tech.',
      en: 'Editor-in-chief of TechPulse. Tech enthusiast with over 10 years of experience analyzing gadgets and tech trends.',
    },
    twitter: '@carlosmendoza',
  },
  sofia: {
    name: 'Sofía Reyes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    bio: {
      es: 'Especialista en IA y software. Ingeniera de software reconvertida en periodista tech.',
      en: 'AI and software specialist. Software engineer turned tech journalist.',
    },
    twitter: '@sofiareyes_tech',
  },
  miguel: {
    name: 'Miguel Torres',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    bio: {
      es: 'Reviewero de gadgets y audiófilo empedernido. Si tiene pantalla o speaker, lo ha probado.',
      en: 'Gadget reviewer and hardcore audiophile. If it has a screen or speaker, he has tested it.',
    },
    twitter: '@migueltorres_hw',
  },
};

export const CATEGORIES: Category[] = [
  {
    slug: 'smartphones',
    name: { es: 'Smartphones', en: 'Smartphones' },
    description: { es: 'Análisis y comparativas de los mejores móviles', en: 'Reviews and comparisons of the best phones' },
    icon: '📱',
    color: 'violet',
  },
  {
    slug: 'laptops',
    name: { es: 'Laptops & PCs', en: 'Laptops & PCs' },
    description: { es: 'Portátiles y ordenadores para trabajo y gaming', en: 'Laptops and desktops for work and gaming' },
    icon: '💻',
    color: 'blue',
  },
  {
    slug: 'ia',
    name: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    description: { es: 'Lo último en IA, LLMs y automatización', en: 'Latest in AI, LLMs and automation' },
    icon: '🤖',
    color: 'emerald',
  },
  {
    slug: 'gaming',
    name: { es: 'Gaming', en: 'Gaming' },
    description: { es: 'Consolas, periféricos y juegos', en: 'Consoles, peripherals and games' },
    icon: '🎮',
    color: 'red',
  },
  {
    slug: 'audio',
    name: { es: 'Audio & Sonido', en: 'Audio & Sound' },
    description: { es: 'Auriculares, altavoces y equipos de audio', en: 'Headphones, speakers and audio equipment' },
    icon: '🎧',
    color: 'amber',
  },
  {
    slug: 'wearables',
    name: { es: 'Wearables', en: 'Wearables' },
    description: { es: 'Smartwatches, fitness trackers y más', en: 'Smartwatches, fitness trackers and more' },
    icon: '⌚',
    color: 'sky',
  },
];

export const POSTS: Post[] = [
  {
    slug: 'mejor-smartphone-2024-guia-completa',
    title: {
      es: 'Mejor Smartphone 2024: Guía Completa con los 10 Teléfonos Más Potentes del Año',
      en: 'Best Smartphone 2024: Complete Guide with the 10 Most Powerful Phones of the Year',
    },
    excerpt: {
      es: 'Analizamos en profundidad los 10 mejores smartphones de 2024, comparando rendimiento, cámara, batería y precio para que encuentres el móvil perfecto para ti.',
      en: 'We analyze in depth the 10 best smartphones of 2024, comparing performance, camera, battery and price to help you find the perfect phone.',
    },
    content: {
      es: `## Por qué importa elegir bien tu smartphone en 2024

El mercado de smartphones en 2024 ha alcanzado un nivel de madurez sin precedentes. Con procesadores de 3nm, cámaras con IA integrada y pantallas de hasta 120Hz en gama media, la diferencia entre gamas ya no es tan obvia. En esta guía comparamos los 10 mejores smartphones del año con datos reales de rendimiento.

## Metodología de análisis

Para esta comparativa hemos analizado más de 40 smartphones durante 30 días cada uno, evaluando:

- **Rendimiento CPU/GPU**: benchmarks AnTuTu y GeekBench
- **Calidad de cámara**: comparativas bajo distintas condiciones de luz
- **Duración de batería**: uso real con pantalla activa 6h/día
- **Experiencia de software**: fluidez, actualizaciones y bloatware
- **Relación calidad-precio**: coste vs prestaciones reales

## Top 10 Smartphones 2024

### 1. Samsung Galaxy S24 Ultra — El Rey Absoluto

El Galaxy S24 Ultra sigue siendo la referencia en Android en 2024. Con el Snapdragon 8 Gen 3, 12GB de RAM y una cámara periscópica de 200MP, establece el estándar de la gama premium.

**Lo que nos gusta:**
- S Pen integrado con latencia casi nula
- Zoom óptico 10x genuino
- 7 años de actualizaciones garantizados
- Pantalla titanio brillante incluso bajo el sol

**Lo que nos gusta menos:**
- Precio de salida 1.319€
- Tamaño no apto para bolsillos pequeños

### 2. iPhone 15 Pro Max — Experiencia iOS Premium

Apple ha redefinido el procesamiento de vídeo móvil con el chip A17 Pro. La grabación ProRes en 4K60fps, el tetraedro de cámara y el titanio como material han elevado el iPhone a otro nivel.

### 3. Google Pixel 9 Pro — La Mejor Cámara con IA

Google ha integrado su chip Tensor G4 con el modelo Gemini Nano directamente en el dispositivo, ofreciendo funciones de IA on-device que ningún competidor iguala aún.

### 4. OnePlus 12 — El Más Rápido en Recarga

Con carga rápida de 100W cableada y 50W inalámbrica, el OnePlus 12 pasa de 0 a 100% en 26 minutos. Una hazaña técnica con Snapdragon 8 Gen 3 a precio ajustado.

### 5. Xiaomi 14 Ultra — Fotografía Leica Premium

La colaboración con Leica ha llevado los sistemas ópticos del Xiaomi 14 Ultra a un nuevo nivel. Su módulo de cámara de 1 pulgada captura detalles imposibles para sus rivales.

## Comparativa de rendimiento

| Modelo | AnTuTu | Batería | Cámara | Precio |
|--------|--------|---------|--------|--------|
| Galaxy S24 Ultra | 1.972.000 | 9h SoT | 9.2/10 | 1.319€ |
| iPhone 15 Pro Max | 1.891.000 | 10h SoT | 9.0/10 | 1.329€ |
| Pixel 9 Pro | 1.450.000 | 8h SoT | 9.4/10 | 1.099€ |
| OnePlus 12 | 1.960.000 | 7.5h SoT | 8.1/10 | 899€ |
| Xiaomi 14 Ultra | 1.950.000 | 8h SoT | 9.5/10 | 1.299€ |

## ¿Cuál deberías comprar?

**Si quieres lo mejor sin mirar el precio:** Samsung Galaxy S24 Ultra o iPhone 15 Pro Max.

**Si la fotografía es tu prioridad:** Xiaomi 14 Ultra o Google Pixel 9 Pro.

**Si buscas la mejor relación calidad-precio:** OnePlus 12 o Samsung Galaxy S24+.

## Preguntas frecuentes

### ¿Cuánto debería gastar en un smartphone en 2024?
Dependiendo de tu uso, entre 400€ y 700€ cubre perfectamente las necesidades de la mayoría de usuarios, con procesadores potentes y cámaras de calidad.

### ¿Vale la pena comprar el iPhone más nuevo?
Si ya tienes un iPhone de menos de 3 años, probablemente no. El salto generacional es más notable si vienes de modelos de 4 años o más.

### ¿Android o iOS en 2024?
Ambos ecosistemas están más parejos que nunca. Android ofrece más personalización y opciones; iOS, mayor integración con otros dispositivos Apple y actualizaciones más longevas.`,

      en: `## Why choosing your smartphone wisely matters in 2024

The smartphone market in 2024 has reached an unprecedented level of maturity. With 3nm processors, AI-integrated cameras and up to 120Hz screens in mid-range, the difference between tiers is no longer so obvious. In this guide we compare the 10 best smartphones of the year with real performance data.

## Analysis methodology

For this comparison we analyzed over 40 smartphones for 30 days each, evaluating CPU/GPU performance, camera quality, battery life, software experience and value for money.

## Top 10 Smartphones 2024

The Samsung Galaxy S24 Ultra remains the Android benchmark in 2024 with Snapdragon 8 Gen 3 and a 200MP periscope camera. The iPhone 15 Pro Max has redefined mobile video processing with the A17 Pro chip and ProRes 4K60fps recording. The Google Pixel 9 Pro integrates Gemini Nano directly on-device for AI features unmatched by competitors.

## Which should you buy?

**For the best regardless of price:** Samsung Galaxy S24 Ultra or iPhone 15 Pro Max. **For photography first:** Xiaomi 14 Ultra or Google Pixel 9 Pro. **For best value:** OnePlus 12 or Samsung Galaxy S24+.`,
    },
    category: 'smartphones',
    tags: ['smartphones', 'comparativa', 'Samsung', 'iPhone', 'Android'],
    author: AUTHORS.carlos,
    publishedAt: '2024-06-15',
    updatedAt: '2024-07-01',
    readingTime: 12,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Mejores smartphones 2024 comparativa', en: 'Best smartphones 2024 comparison' },
    featured: true,
    faqs: [
      {
        question: { es: '¿Cuál es el mejor smartphone de 2024?', en: 'What is the best smartphone of 2024?' },
        answer: { es: 'El Samsung Galaxy S24 Ultra es el mejor smartphone Android de 2024 por su cámara de 200MP, S Pen integrado y 7 años de actualizaciones garantizadas.', en: 'The Samsung Galaxy S24 Ultra is the best Android smartphone of 2024 for its 200MP camera, integrated S Pen and guaranteed 7 years of updates.' },
      },
      {
        question: { es: '¿Vale la pena comprar un iPhone en 2024?', en: 'Is it worth buying an iPhone in 2024?' },
        answer: { es: 'Sí, especialmente el iPhone 15 Pro Max ofrece la mejor experiencia iOS con grabación ProRes y el chip A17 Pro para usuarios exigentes.', en: 'Yes, especially the iPhone 15 Pro Max offers the best iOS experience with ProRes recording and A17 Pro chip for demanding users.' },
      },
    ],
  },
  {
    slug: 'mejores-auriculares-noise-cancelling-2024',
    title: {
      es: 'Los 8 Mejores Auriculares con Cancelación de Ruido de 2024: Análisis y Comparativa',
      en: '8 Best Noise-Cancelling Headphones of 2024: Review and Comparison',
    },
    excerpt: {
      es: 'Desde los Sony WH-1000XM5 hasta los AirPods Max, analizamos los mejores auriculares ANC del mercado para ayudarte a elegir.',
      en: 'From Sony WH-1000XM5 to AirPods Max, we review the best ANC headphones on the market to help you choose.',
    },
    content: {
      es: `## La mejor cancelación de ruido en 2024

Los auriculares con cancelación de ruido activa (ANC) han evolucionado enormemente. En 2024, los mejores modelos son capaces de silenciar prácticamente cualquier entorno, desde aviones hasta oficinas ruidosas.

## Top auriculares ANC 2024

### Sony WH-1000XM5 — El Rey Indiscutible

La quinta generación de los Sony XM continúa siendo la referencia en cancelación de ruido pasiva + activa combinada. Con 8 micrófonos y dos procesadores QN1 en paralelo, el silencio que genera es casi sobrenatural.

### Apple AirPods Max — Lujo y Ecosistema Apple

Si vives en el ecosistema Apple, los AirPods Max ofrecen la mejor integración imaginable. El audio espacial con seguimiento de cabeza crea una experiencia inmersiva sin rival en iOS.

### Bose QuietComfort Ultra — Confort Excepcional

Bose siempre ha ganado en confort y los QC Ultra no son excepción. Perfectos para vuelos largos gracias a su almohada de memoria en las almohadillas.`,
      en: `## Best noise-cancelling in 2024

Active noise-cancelling headphones have evolved enormously. In 2024, the best models can silence virtually any environment, from airplanes to noisy offices.

## Top ANC headphones 2024

Sony WH-1000XM5 remains the absolute reference in combined passive + active noise cancellation. With 8 microphones and two QN1 processors in parallel, the silence it generates is almost supernatural. Apple AirPods Max offers the best integration in the Apple ecosystem with spatial audio that creates an immersive experience.`,
    },
    category: 'audio',
    tags: ['auriculares', 'ANC', 'Sony', 'Apple', 'Bose', 'review'],
    author: AUTHORS.miguel,
    publishedAt: '2024-06-20',
    updatedAt: '2024-06-20',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Auriculares noise cancelling 2024', en: 'Best noise cancelling headphones 2024' },
    featured: true,
    faqs: [
      {
        question: { es: '¿Cuáles son los mejores auriculares ANC de 2024?', en: 'What are the best ANC headphones of 2024?' },
        answer: { es: 'Los Sony WH-1000XM5 son los mejores auriculares con cancelación de ruido de 2024 por su equilibrio entre ANC, calidad de sonido y duración de batería de 30 horas.', en: 'The Sony WH-1000XM5 are the best noise-cancelling headphones of 2024 for their balance of ANC, sound quality and 30-hour battery life.' },
      },
    ],
  },
  {
    slug: 'chatgpt-vs-gemini-vs-claude-comparativa-ia',
    title: {
      es: 'ChatGPT vs Gemini vs Claude: La Comparativa Definitiva de IAs en 2024',
      en: 'ChatGPT vs Gemini vs Claude: The Definitive AI Comparison of 2024',
    },
    excerpt: {
      es: 'Comparamos los tres grandes modelos de IA: GPT-4o, Gemini Ultra y Claude 3 Opus en 15 pruebas reales para determinar cuál es realmente el mejor.',
      en: 'We compare the three major AI models: GPT-4o, Gemini Ultra and Claude 3 Opus in 15 real tests to determine which is truly the best.',
    },
    content: {
      es: `## El gran enfrentamiento de la IA en 2024

La guerra de los modelos de lenguaje está en su punto más álgido. OpenAI, Google y Anthropic compiten ferozmente por el título de mejor IA general. Hemos realizado más de 200 pruebas para determinar cuál rinde mejor en tareas reales.

## Criterios de evaluación

Evaluamos cada modelo en: razonamiento lógico, generación de código, comprensión de textos largos, creatividad, factualidad y seguridad.

## ChatGPT (GPT-4o) — El más completo

GPT-4o brilla en versatilidad. Su integración multimodal (texto, imagen, audio en tiempo real) lo hace el asistente más completo del mercado. Su ecosistema de GPTs personalizados es imbatible.

## Gemini Ultra — El cerebro de Google

Gemini Ultra destaca en tareas que requieren conocimiento actualizado y búsqueda en tiempo real. Su integración con el ecosistema Google (Docs, Gmail, Drive) lo hace ideal para productividad.

## Claude 3 Opus — El más seguro y reflexivo

Claude de Anthropic destaca por sus respuestas más largas y reflexivas, mejor comprensión de contextos complejos y el mayor contexto de 200K tokens. Ideal para análisis profundos.`,
      en: `## The great AI showdown of 2024

The language model war is at its peak. OpenAI, Google and Anthropic compete fiercely for the title of best general AI. We conducted over 200 tests to determine which performs best in real tasks. ChatGPT (GPT-4o) shines in versatility with real-time multimodal integration. Gemini Ultra excels in tasks requiring updated knowledge and Google ecosystem integration. Claude 3 Opus stands out for longer, more thoughtful responses and 200K token context window.`,
    },
    category: 'ia',
    tags: ['IA', 'ChatGPT', 'Gemini', 'Claude', 'comparativa', 'LLM'],
    author: AUTHORS.sofia,
    publishedAt: '2024-07-01',
    updatedAt: '2024-07-10',
    readingTime: 14,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop',
    imageAlt: { es: 'ChatGPT vs Gemini vs Claude comparativa IA 2024', en: 'ChatGPT vs Gemini vs Claude AI comparison 2024' },
    featured: true,
    faqs: [
      {
        question: { es: '¿Cuál es la mejor IA de 2024?', en: 'What is the best AI of 2024?' },
        answer: { es: 'Depende del uso: GPT-4o es el más versátil, Gemini Ultra el mejor para productividad con Google, y Claude 3 Opus el más reflexivo para análisis complejos.', en: 'It depends on use: GPT-4o is the most versatile, Gemini Ultra the best for Google productivity, and Claude 3 Opus the most thoughtful for complex analysis.' },
      },
    ],
  },
  {
    slug: 'mejor-laptop-programadores-2024',
    title: {
      es: 'Mejor Laptop para Programadores en 2024: MacBook Pro M3 vs ThinkPad X1 vs Dell XPS',
      en: 'Best Laptop for Programmers in 2024: MacBook Pro M3 vs ThinkPad X1 vs Dell XPS',
    },
    excerpt: {
      es: 'Si programas para vivir o por hobby, esta es la guía que necesitas. Comparamos los mejores portátiles para desarrollo en 2024 con pruebas reales de compilación.',
      en: 'If you code for a living or as a hobby, this is the guide you need. We compare the best laptops for development in 2024 with real compilation benchmarks.',
    },
    content: {
      es: `## ¿Qué necesita un portátil para programadores?

Un portátil de desarrollo necesita: CPU potente para compilar rápido, RAM abundante (mínimo 16GB), SSD ultrarrápido, pantalla con buena resolución y batería que aguante el día entero.

## MacBook Pro M3 Pro — El Estándar Oro del Desarrollo

El Apple Silicon M3 Pro ha redefinido lo que significa eficiencia en desarrollo. Compila proyectos de Xcode en la mitad de tiempo que equivalentes Intel, con una autonomía que supera las 15 horas de trabajo real.

## ThinkPad X1 Carbon Gen 12 — El Mejor Windows para Devs

La décimo segunda generación del X1 Carbon trae el Intel Core Ultra 7 con arquitectura híbrida. Su teclado sigue siendo el mejor del mercado y su durabilidad militar certificada es insuperable.

## Dell XPS 15 — Potencia y Pantalla OLED

El XPS 15 es la opción para quienes necesitan máxima potencia en Windows: Core i9 + RTX 4060, pantalla OLED 3.5K perfecta para diseño y desarrollo frontend.`,
      en: `## What does a programmer's laptop need?

A development laptop needs: powerful CPU for fast compilation, abundant RAM (minimum 16GB), ultra-fast SSD, good resolution screen and battery that lasts the whole day. The MacBook Pro M3 Pro has redefined development efficiency, compiling Xcode projects in half the time of Intel equivalents with over 15 hours of real battery life.`,
    },
    category: 'laptops',
    tags: ['laptops', 'programadores', 'MacBook', 'ThinkPad', 'Dell XPS', 'desarrollo'],
    author: AUTHORS.sofia,
    publishedAt: '2024-06-28',
    updatedAt: '2024-06-28',
    readingTime: 11,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Mejor laptop programadores 2024', en: 'Best laptop for programmers 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿Es el MacBook Pro M3 el mejor portátil para programar?', en: 'Is the MacBook Pro M3 the best laptop for programming?' },
        answer: { es: 'Para desarrollo macOS/iOS sí es el mejor sin duda. Para proyectos que requieren Windows o Linux con más presupuesto, el ThinkPad X1 Carbon es una excelente alternativa.', en: 'For macOS/iOS development it is undoubtedly the best. For projects requiring Windows or Linux with more budget, the ThinkPad X1 Carbon is an excellent alternative.' },
      },
    ],
  },
  {
    slug: 'playstation-5-slim-vs-xbox-series-x-2024',
    title: {
      es: 'PS5 Slim vs Xbox Series X en 2024: ¿Cuál Comprar? Análisis Definitivo',
      en: 'PS5 Slim vs Xbox Series X in 2024: Which to Buy? Definitive Analysis',
    },
    excerpt: {
      es: 'La batalla de consolas de 2024 ya tiene ganador. Analizamos hardware, exclusivos, Game Pass vs PS Plus y precio final para ayudarte a decidir.',
      en: "The 2024 console battle has a winner. We analyze hardware, exclusives, Game Pass vs PS Plus and final price to help you decide.",
    },
    content: {
      es: `## PS5 Slim vs Xbox Series X: El análisis más completo

Dos años después de su lanzamiento, ambas consolas han madurado. Los catálogos son más ricos, los precios más accesibles y los servicios más completos. ¿Pero cuál sigue siendo la mejor opción en 2024?

## Especificaciones comparadas

Ambas consolas comparten ray-tracing en tiempo real, 4K/120fps y SSDs ultrarrápidos. La diferencia está en los detalles: el SSD propietario de PS5 (5.5GB/s vs 2.4GB/s del Xbox) sigue siendo ventaja técnica.

## Exclusivos: El factor determinante

PlayStation sigue ganando en exclusivos: Spider-Man 2, God of War Ragnarök y el próximo Death Stranding 2. Xbox apuesta por Game Pass con cientos de juegos day-one incluidos en la suscripción.`,
      en: `## PS5 Slim vs Xbox Series X: The most complete analysis

Two years after launch, both consoles have matured with richer catalogs, more accessible prices and more complete services. PS5's proprietary SSD (5.5GB/s vs Xbox's 2.4GB/s) remains a technical advantage. PlayStation still wins in exclusives while Xbox bets on Game Pass with hundreds of day-one games included.`,
    },
    category: 'gaming',
    tags: ['gaming', 'PS5', 'Xbox', 'consolas', 'comparativa'],
    author: AUTHORS.miguel,
    publishedAt: '2024-06-10',
    updatedAt: '2024-06-15',
    readingTime: 10,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&h=630&fit=crop',
    imageAlt: { es: 'PS5 Slim vs Xbox Series X comparativa 2024', en: 'PS5 Slim vs Xbox Series X comparison 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿PS5 o Xbox Series X en 2024?', en: 'PS5 or Xbox Series X in 2024?' },
        answer: { es: 'Si valoras los exclusivos (God of War, Spider-Man, etc.) elige PS5. Si prefieres Game Pass y jugar también en PC, Xbox Series X es la mejor opción.', en: 'If you value exclusives (God of War, Spider-Man, etc.) choose PS5. If you prefer Game Pass and playing on PC too, Xbox Series X is the best option.' },
      },
    ],
  },
  {
    slug: 'apple-watch-ultra-2-review-completo',
    title: {
      es: 'Apple Watch Ultra 2: Review Completo tras 6 Meses de Uso Real',
      en: 'Apple Watch Ultra 2: Complete Review After 6 Months of Real Use',
    },
    excerpt: {
      es: '¿Vale la pena gastarse 899€ en un smartwatch? Tras 6 meses con el Apple Watch Ultra 2 te damos nuestra respuesta honesta con datos reales.',
      en: 'Is it worth spending €899 on a smartwatch? After 6 months with the Apple Watch Ultra 2, we give you our honest answer with real data.',
    },
    content: {
      es: `## Apple Watch Ultra 2: ¿el mejor smartwatch del mundo?

El Apple Watch Ultra 2 es el smartwatch más ambicioso jamás creado por Apple. Con carcasa de titanio de grado aeroespacial, pantalla de 2000 nits y GPS de doble frecuencia, promete ser el compañero perfecto para atletas de élite y usuarios exigentes.

## Diseño y construcción

46mm de titanio grado 6 que pesa apenas 61 gramos. La pantalla plana de zafiro resiste impactos que destrozarían cualquier rival. El botón naranja de acción es genial para deportes con guantes.

## Salud y fitness: donde brilla

El Ultra 2 incluye sensor de temperatura en muñeca, ECG de alto rendimiento, medición de glucosa (solo en sangre con lanceta) y el algoritmo de natación más preciso del mercado.`,
      en: `## Apple Watch Ultra 2: the best smartwatch in the world?

The Apple Watch Ultra 2 is the most ambitious smartwatch Apple has ever created. With aerospace-grade titanium case, 2000 nits display and dual-frequency GPS. The 46mm Grade 6 titanium weighs just 61 grams. The Ultra 2 includes wrist temperature sensor, high-performance ECG and the most accurate swimming algorithm on the market.`,
    },
    category: 'wearables',
    tags: ['Apple Watch', 'smartwatch', 'wearables', 'review', 'fitness'],
    author: AUTHORS.carlos,
    publishedAt: '2024-05-20',
    updatedAt: '2024-06-01',
    readingTime: 13,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Apple Watch Ultra 2 review completo', en: 'Apple Watch Ultra 2 complete review' },
    featured: false,
    faqs: [
      {
        question: { es: '¿Vale la pena el Apple Watch Ultra 2?', en: 'Is the Apple Watch Ultra 2 worth it?' },
        answer: { es: 'Para deportistas serios o usuarios que usan activamente las funciones de salud avanzadas, sí. Para uso casual, el Series 9 ofrece el 90% de las funciones por la mitad de precio.', en: 'For serious athletes or users who actively use advanced health features, yes. For casual use, the Series 9 offers 90% of the features for half the price.' },
      },
    ],
  },
  {
    slug: 'mejores-monitores-gaming-4k-2024',
    title: {
      es: 'Mejores Monitores Gaming 4K de 2024: OLED, Mini-LED y las Mejores Frecuencias de Refresco',
      en: 'Best 4K Gaming Monitors of 2024: OLED, Mini-LED and the Best Refresh Rates',
    },
    excerpt: {
      es: 'Los monitores gaming han dado un salto enorme en 2024. OLED a 240Hz, Mini-LED con 1000 zonas de dimming... te explicamos cuál elegir según tu setup.',
      en: 'Gaming monitors have made a huge leap in 2024. OLED at 240Hz, Mini-LED with 1000 dimming zones... we explain which to choose based on your setup.',
    },
    content: {
      es: `## La revolución de los paneles OLED en gaming

2024 ha marcado el punto de inflexión para los monitores OLED gaming. Con paneles QD-OLED de segunda generación que alcanzan los 240Hz a 4K y precios cayendo por debajo de los 900€, ya es una opción real para el gamer exigente.

## Asus ROG Swift OLED PG32UCDM — El Mejor sin Compromiso

El monitor de referencia de 2024. 4K, 240Hz, OLED QD con 1000 nits peak brightness. El tiempo de respuesta de 0.03ms hace que los juegos de acción se vean como una película en cine.

## LG UltraGear OLED 27GR95QE — La Mejor Relación Precio-Calidad

A un precio más accesible, el LG 27GR95QE ofrece OLED a 1440p/240Hz. Ideal para quienes tienen GPU de gama media-alta y no quieren sacrificar fluidez por resolución.`,
      en: `## The OLED revolution in gaming

2024 has marked the turning point for OLED gaming monitors. Second-generation QD-OLED panels reaching 240Hz at 4K with prices falling below €900. The Asus ROG Swift OLED PG32UCDM is the reference monitor: 4K, 240Hz, QD-OLED with 1000 nits peak brightness and 0.03ms response time.`,
    },
    category: 'gaming',
    tags: ['monitores', 'gaming', 'OLED', '4K', '240Hz', 'setup'],
    author: AUTHORS.miguel,
    publishedAt: '2024-07-05',
    updatedAt: '2024-07-05',
    readingTime: 11,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Mejores monitores gaming 4K OLED 2024', en: 'Best 4K OLED gaming monitors 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿OLED o Mini-LED para gaming?', en: 'OLED or Mini-LED for gaming?' },
        answer: { es: 'OLED para la mejor calidad de imagen y tiempo de respuesta. Mini-LED si juegas mucho en HDR con escenas brillantes, ya que evita el riesgo de burn-in.', en: 'OLED for the best image quality and response time. Mini-LED if you play a lot in HDR with bright scenes, as it avoids the risk of burn-in.' },
      },
    ],
  },
  {
    slug: 'mejores-herramientas-ia-productividad-2024',
    title: {
      es: '20 Herramientas de IA para Productividad que Debes Conocer en 2024',
      en: '20 AI Productivity Tools You Need to Know in 2024',
    },
    excerpt: {
      es: 'La IA ha transformado la productividad personal y profesional. Estas 20 herramientas son las que realmente marcan la diferencia en tu día a día.',
      en: 'AI has transformed personal and professional productivity. These 20 tools are the ones that truly make a difference in your daily life.',
    },
    content: {
      es: `## IA y productividad: el matrimonio perfecto de 2024

El 2024 ha sido el año en que la IA dejó de ser una novedad para convertirse en una herramienta de trabajo imprescindible. Estas 20 aplicaciones han demostrado valor real en entornos profesionales.

### Para escritura y contenido

**1. Notion AI** — La integración de IA más completa en un workspace. Redacta, resume, traduce y organiza sin salir de Notion.

**2. Grammarly** — Más allá de la gramática: analiza tono, claridad y sugiere mejoras estilísticas. Imprescindible para comunicación profesional.

**3. Jasper AI** — El favorito de los equipos de marketing para generar contenido escalable sin perder la voz de marca.

### Para código y desarrollo

**4. GitHub Copilot** — El asistente de código más usado del mundo. Autocompleta, explica y refactoriza con contexto de tu codebase completo.

**5. Cursor IDE** — El editor que ha revolucionado el desarrollo con IA. Permite editar con lenguaje natural.

### Para reuniones y comunicación

**6. Otter.ai** — Transcripción y resumen automático de reuniones con identificación de hablantes.

**7. Fireflies.ai** — Integra con Zoom, Meet y Teams para capturar automáticamente todos los action items.`,
      en: `## AI and productivity: the perfect marriage of 2024

2024 has been the year AI stopped being a novelty and became an essential work tool. Notion AI offers the most complete AI integration in a workspace. GitHub Copilot is the world's most used code assistant. Otter.ai provides automatic meeting transcription with speaker identification. These 20 tools have demonstrated real value in professional environments.`,
    },
    category: 'ia',
    tags: ['IA', 'productividad', 'herramientas', 'Notion', 'Copilot', 'automatización'],
    author: AUTHORS.sofia,
    publishedAt: '2024-06-25',
    updatedAt: '2024-07-02',
    readingTime: 16,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Mejores herramientas IA productividad 2024', en: 'Best AI productivity tools 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿Cuál es la mejor herramienta de IA para productividad?', en: 'What is the best AI tool for productivity?' },
        answer: { es: 'Depende de tu trabajo: Notion AI para gestión de proyectos, GitHub Copilot para programadores, Otter.ai para equipos con muchas reuniones y Jasper para marketing.', en: 'It depends on your work: Notion AI for project management, GitHub Copilot for programmers, Otter.ai for teams with many meetings and Jasper for marketing.' },
      },
    ],
  },
  {
    slug: 'rtx-4090-vs-rx-7900-xtx-cual-comprar',
    title: {
      es: 'RTX 4090 vs RX 7900 XTX: La Comparativa de GPUs más Completa de 2024',
      en: 'RTX 4090 vs RX 7900 XTX: The Most Complete GPU Comparison of 2024',
    },
    excerpt: {
      es: 'Nvidia o AMD en 2024: analizamos rendimiento en gaming 4K, ray tracing, DLSS vs FSR y coste por frame para determinar qué GPU ofrece más valor.',
      en: 'Nvidia or AMD in 2024: we analyze 4K gaming performance, ray tracing, DLSS vs FSR and cost per frame to determine which GPU offers more value.',
    },
    content: {
      es: `## El debate GPU de 2024: ¿Nvidia o AMD?

La elección entre la RTX 4090 de Nvidia y la RX 7900 XTX de AMD es uno de los debates más encendidos de la comunidad PC gamer. Hemos realizado más de 50 benchmarks para darte una respuesta definitiva.

## Rendimiento puro en 4K

En gaming a 4K sin trazado de rayos, la diferencia es menor de lo esperado. La RX 7900 XTX ofrece entre el 85-95% del rendimiento de la RTX 4090 en rasterización pura, a 500€ menos.

## Ray tracing: Nvidia gana sin discusión

Con ray tracing activado, la RTX 4090 aplasta a la competencia. Gracias a sus núcleos RT de tercera generación y DLSS 3.5 Frame Generation, logra en promedio el doble de FPS que la AMD.

## DLSS 3.5 vs FSR 3: el juego de la upscaling

DLSS 3.5 con Frame Generation sigue siendo superior en calidad de imagen. FSR 3 de AMD ha mejorado enormemente y funciona en cualquier GPU, incluso en tarjetas Nvidia.`,
      en: `## The 2024 GPU debate: Nvidia or AMD?

In pure 4K gaming without ray tracing, the RX 7900 XTX offers 85-95% of the RTX 4090's performance at €500 less. With ray tracing enabled, the RTX 4090 crushes the competition. DLSS 3.5 with Frame Generation still leads in image quality while AMD's FSR 3 has improved enormously and works on any GPU.`,
    },
    category: 'gaming',
    tags: ['GPU', 'RTX 4090', 'RX 7900 XTX', 'Nvidia', 'AMD', 'gaming PC'],
    author: AUTHORS.miguel,
    publishedAt: '2024-05-15',
    updatedAt: '2024-06-10',
    readingTime: 15,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&h=630&fit=crop',
    imageAlt: { es: 'RTX 4090 vs RX 7900 XTX comparativa GPU 2024', en: 'RTX 4090 vs RX 7900 XTX GPU comparison 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿RTX 4090 o RX 7900 XTX en 2024?', en: 'RTX 4090 or RX 7900 XTX in 2024?' },
        answer: { es: 'Para gaming 4K rasterizado puro: RX 7900 XTX ofrece mejor valor. Para ray tracing, creación de contenido o renderizado 3D: RTX 4090 no tiene rival.', en: 'For pure 4K rasterized gaming: RX 7900 XTX offers better value. For ray tracing, content creation or 3D rendering: RTX 4090 has no rival.' },
      },
    ],
  },
  {
    slug: 'samsung-galaxy-watch-7-review',
    title: {
      es: 'Samsung Galaxy Watch 7 Review: El Smartwatch Android de Referencia en 2024',
      en: 'Samsung Galaxy Watch 7 Review: The Reference Android Smartwatch in 2024',
    },
    excerpt: {
      es: 'El Galaxy Watch 7 llega con el nuevo chip Exynos W1000 y mejoras en salud. ¿Es suficiente para competir con el Apple Watch? Nuestra opinión tras 3 semanas de uso.',
      en: 'The Galaxy Watch 7 arrives with the new Exynos W1000 chip and health improvements. Is it enough to compete with Apple Watch? Our opinion after 3 weeks of use.',
    },
    content: {
      es: `## Samsung Galaxy Watch 7: la evolución que esperábamos

Samsung ha lanzado su Galaxy Watch 7 con un salto significativo bajo el capó: el nuevo chip Exynos W1000 fabricado en 3nm es hasta 3.4x más rápido que el anterior y consume menos batería.

## Diseño y materiales

El Watch 7 mantiene el diseño circular que diferencia a Samsung de Apple. El cristal Corning Gorilla Glass Victus Plus y el aluminio aeroespacial dan solidez sin exceso de peso (28.9g).

## Salud avanzada: el punto fuerte

La nueva función de análisis de composición corporal avanzada, el ECG de segunda generación y la detección de arritmias certificada por la FDA hacen del Watch 7 el smartwatch Android más completo para salud.

## Batería: el eterno talón de Aquiles

Con uso normal, el Watch 7 de 44mm dura entre 38-44 horas. Activando el modo ahorro avanzado llega a 5 días. Mejor que su predecesor, pero aún lejos del Apple Watch Ultra 2.`,
      en: `## Samsung Galaxy Watch 7: the evolution we were waiting for

The new Exynos W1000 chip built on 3nm is up to 3.4x faster than the previous one and consumes less battery. The advanced body composition analysis, second-generation ECG and FDA-certified arrhythmia detection make the Watch 7 the most complete Android smartwatch for health. Battery life reaches 38-44 hours with normal use on the 44mm model.`,
    },
    category: 'wearables',
    tags: ['Samsung', 'Galaxy Watch', 'smartwatch', 'wearables', 'review', 'Android'],
    author: AUTHORS.carlos,
    publishedAt: '2024-07-10',
    updatedAt: '2024-07-10',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=630&fit=crop',
    imageAlt: { es: 'Samsung Galaxy Watch 7 review 2024', en: 'Samsung Galaxy Watch 7 review 2024' },
    featured: false,
    faqs: [
      {
        question: { es: '¿Cuánto dura la batería del Samsung Galaxy Watch 7?', en: 'How long does the Samsung Galaxy Watch 7 battery last?' },
        answer: { es: 'El Samsung Galaxy Watch 7 de 44mm dura entre 38-44 horas con uso normal y hasta 5 días activando el modo de ahorro de energía avanzado.', en: 'The Samsung Galaxy Watch 7 44mm lasts between 38-44 hours with normal use and up to 5 days with advanced power saving mode enabled.' },
      },
    ],
  },
  {
    slug: 'iphone-17-vs-samsung-galaxy-s25-comparativa',
    title: {
      es: 'iPhone 17 vs Samsung Galaxy S25: ¿Cuál es Mejor en 2025? Comparativa Completa',
      en: 'iPhone 17 vs Samsung Galaxy S25: Which is Better in 2025? Full Comparison',
    },
    excerpt: {
      es: 'La batalla definitiva de 2025: comparamos el iPhone 17 y el Samsung Galaxy S25 en rendimiento, cámara, batería y precio para que elijas con criterio.',
      en: 'The ultimate 2025 battle: we compare the iPhone 17 and Samsung Galaxy S25 on performance, camera, battery and price so you can choose wisely.',
    },
    content: {
      es: `## iPhone 17 vs Galaxy S25: el duelo del año

Cada año millones de personas se hacen la misma pregunta: iPhone o Samsung? En 2025 la decision es mas dificil que nunca. Ambos fabricantes han lanzado sus mejores dispositivos.

## Diseño y construcción

El iPhone 17 llega con un nuevo diseño mas delgado, titanio en toda la gama y el modulo de camara rediseñado. Apple ha apostado por un panel OLED de 6.1 pulgadas con 120Hz en todos los modelos.

El Samsung Galaxy S25 mantiene su diseño refinado con bordes curvos y Gorilla Glass Armor. Disponible en 6.2 pulgadas, es ligeramente mas grande pero tambien mas ligero.

## Rendimiento: A19 Pro vs Snapdragon 8 Elite

El chip A19 Pro de Apple sigue siendo muy rapido. Sin embargo, el Snapdragon 8 Elite del Galaxy S25 ha cerrado la brecha enormemente. En benchmarks AnTuTu el S25 alcanza los 2.3 millones de puntos frente a los 2.1 millones del iPhone 17.

## Camara: el factor decisivo

El iPhone 17 incorpora un sensor principal de 48MP con apertura f/1.6. Los videos en 4K Dolby Vision siguen siendo la referencia del sector. El Galaxy S25 Ultra eleva la apuesta con su sensor de 200MP y zoom optico 10x.

## Bateria y carga

Samsung gana claramente. El Galaxy S25 carga a 45W con cable, pasando de 0 a 100% en 55 minutos. El iPhone 17 por fin supera los 20W pero sigue por detras.

## Precio y conclusion

El iPhone 17 parte desde 999 euros y el Galaxy S25 desde 899 euros. Si buscas la mejor integracion con Apple: iPhone 17. Si quieres mas flexibilidad y mejor precio: Galaxy S25.`,
      en: `## iPhone 17 vs Galaxy S25: the duel of the year

Every year millions ask the same question: iPhone or Samsung? In 2025 the decision is harder than ever. The iPhone 17 arrives with a redesigned thinner body and titanium. The Samsung Galaxy S25 features the Snapdragon 8 Elite closing the performance gap significantly. In cameras the iPhone wins in natural low-light while Samsung leads in zoom. Samsung wins on charging speed at 45W. iPhone 17 starts at 999 euros, Galaxy S25 at 899 euros.`,
    },
    category: 'smartphones',
    tags: ['iPhone 17', 'Samsung Galaxy S25', 'comparativa', 'smartphones', '2025'],
    author: AUTHORS.carlos,
    publishedAt: '2025-05-16',
    updatedAt: '2025-05-16',
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=630&fit=crop',
    imageAlt: {
      es: 'iPhone 17 vs Samsung Galaxy S25 comparativa 2025',
      en: 'iPhone 17 vs Samsung Galaxy S25 comparison 2025',
    },
    featured: false,
    faqs: [
      {
        question: {
          es: 'Es mejor el iPhone 17 o el Samsung Galaxy S25?',
          en: 'Is the iPhone 17 or Samsung Galaxy S25 better?',
        },
        answer: {
          es: 'Depende de tu ecosistema. El iPhone 17 es mejor si usas Mac, iPad o AirPods. El Galaxy S25 ofrece mejor relacion calidad-precio y mas personalizacion en Android.',
          en: 'It depends on your ecosystem. iPhone 17 is better if you use Mac, iPad or AirPods. Galaxy S25 offers better value and more customization on Android.',
        },
      },
    ],
  },
];

export function getPostsByCategory(categorySlug: string): Post[] {
  return POSTS.filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts(): Post[] {
  return POSTS.filter((p) => p.featured);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
  return POSTS.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit);
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return POSTS.filter(
    (p) =>
      p.title.es.toLowerCase().includes(q) ||
      p.title.en.toLowerCase().includes(q) ||
      p.excerpt.es.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
