export interface DetailedProduct {
  id: string;
  name: string;
  collectionName: string;
  categoryId: string; // matches the URL slug
  description: string;
  material: string;
  constructionType: string;
  designStyle: string;
  availableSizes: string[];
  colorVariants: string[];
  customizationAvailability: string;
  productFeatures: string[];
  careInstructions: string[];
  images: string[];
}

export const CATEGORIES = [
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Classical motifs reborn through meticulous hand-knotting techniques.',
    image: '/Carpet_04.jpg'
  },
  {
    id: 'urban',
    name: 'Urban',
    description: 'Contemporary geometric abstraction perfect for modern architectural spaces.',
    image: '/Carpet_05.jpg'
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    description: 'Luminous pure silk rugs that shimmer under varying light conditions.',
    image: '/Carpet_03.jpg'
  },
  {
    id: 'nomad',
    name: 'Nomad',
    description: 'Textured, organic flatweaves designed for high-traffic environments.',
    image: '/Carpet_06.jpg'
  }
];

export const PRODUCTS: DetailedProduct[] = [
  {
    id: '1',
    name: 'Persian Royal Blue',
    collectionName: 'Heritage Silk Collection',
    categoryId: 'heritage',
    description: 'A masterful blend of traditional motifs, hand-knotted over 6 months to create an heirloom quality piece with deep sapphire tones. The Persian Royal Blue stands as a premier example of elite flooring artwork.',
    material: 'Pure Chinese Silk & Premium New Zealand Wool blend',
    constructionType: 'Traditional Hand-Knotted (150 Knots per square inch)',
    designStyle: 'Classical Persian / Royal Antique Heritage',
    availableSizes: ['5x8 ft', '6x9 ft', '8x10 ft', '9x12 ft', '10x14 ft'],
    colorVariants: ['Royal Blue', 'Crimson Red', 'Antique Gold', 'Ivory Cream'],
    customizationAvailability: 'Bespoke tailoring available for custom proportions, alternative primary backgrounds, and density scaling upon request.',
    productFeatures: [
      'Hand-spun, hand-dyed wool',
      'Ethically sourced materials',
      'Naturally stain-resistant',
      'Suitable for high-end residential use'
    ],
    careInstructions: [
      'Vacuum regularly without a beater bar',
      'Professional cleaning recommended every 1-2 years',
      'Rotate every 6 months for even wear',
      'Blot spills immediately with a clean, dry cloth'
    ],
    images: ['/Carpet_01.jpg', '/Carpet_02.jpg', '/Carpet_03.jpg']
  },
  {
    id: '2',
    name: 'Crimson Medallion',
    collectionName: 'Heritage Silk Collection',
    categoryId: 'heritage',
    description: 'A deeply saturated crimson foundation supporting an intricate central medallion, woven using centuries-old techniques. This rug brings warmth and historic gravitas to any room.',
    material: '100% Premium New Zealand Wool',
    constructionType: 'Traditional Hand-Knotted (120 Knots per square inch)',
    designStyle: 'Traditional Medallion',
    availableSizes: ['6x9 ft', '8x10 ft', '9x12 ft'],
    colorVariants: ['Crimson Red', 'Sapphire Blue'],
    customizationAvailability: 'Available for custom sizing with a 12-16 week lead time.',
    productFeatures: [
      'Natural vegetable dyes',
      'Heavy pile for acoustic dampening',
      'Heirloom quality durability'
    ],
    careInstructions: [
      'Vacuum regularly',
      'Professional wash only',
      'Avoid direct prolonged sunlight'
    ],
    images: ['/Carpet_04.jpg', '/Carpet_05.jpg']
  },
  {
    id: '3',
    name: 'Modernist Charcoal',
    collectionName: 'Urban Abstract',
    categoryId: 'urban',
    description: 'Minimalist geometric abstraction intersecting with deep charcoal and ash tones. Designed specifically for contemporary architectural spaces, offering a sharp yet grounded aesthetic.',
    material: 'Bamboo Silk & Wool Blend',
    constructionType: 'Hand-Tufted',
    designStyle: 'Contemporary / Minimalist',
    availableSizes: ['8x10 ft', '9x12 ft', '10x14 ft'],
    colorVariants: ['Charcoal/Ash', 'Navy/Slate', 'Taupe/Cream'],
    customizationAvailability: 'Color matching and custom dimensioning available within 8 weeks.',
    productFeatures: [
      'Soft, lustrous finish',
      'Modern geometric layout',
      'Ideal for corporate or modern residential settings'
    ],
    careInstructions: [
      'Vacuum carefully with suction only',
      'Blot spills immediately',
      'Professional cleaning for deep stains'
    ],
    images: ['/Carpet_05.jpg', '/Carpet_06.jpg', '/Carpet_07.jpg']
  },
  {
    id: '4',
    name: 'Oasis Ivory Circle',
    collectionName: 'Ethereal Shimmer',
    categoryId: 'ethereal',
    description: 'A luminous, pure silk circular rug that shimmers under varying light conditions. The Oasis creates a soft, luxurious focal point in foyers or beneath statement furniture.',
    material: '100% Pure Silk',
    constructionType: 'Hand-Knotted (200 Knots per square inch)',
    designStyle: 'Transitional Solid / Shimmer',
    availableSizes: ['6 ft Diameter', '8 ft Diameter', '10 ft Diameter'],
    colorVariants: ['Ivory', 'Champagne', 'Silver Pearl'],
    customizationAvailability: 'Fully customizable up to 15 ft diameter.',
    productFeatures: [
      'High luster finish',
      'Incredibly soft underfoot',
      'Dynamic color shifting based on lighting angle'
    ],
    careInstructions: [
      'Professional dry cleaning only',
      'Do not use liquid spot cleaners',
      'Keep away from high moisture areas'
    ],
    images: ['/Carpet_03.jpg', '/Carpet_08.jpg']
  },
  {
    id: '5',
    name: 'Sahara Runner',
    collectionName: 'Nomad Terrains',
    categoryId: 'nomad',
    description: 'Textured, organic and incredibly resilient. The Sahara Runner is designed specifically for high-traffic gallery spaces and long corridors, bringing a raw, earthy warmth.',
    material: 'Jute, Sisal & Wool',
    constructionType: 'Flatweave / Kilm',
    designStyle: 'Bohemian / Organic Modern',
    availableSizes: ['2.5x10 ft', '2.5x14 ft', '3x12 ft'],
    colorVariants: ['Natural Sand', 'Terracotta', 'Olive'],
    customizationAvailability: 'Available by the linear foot.',
    productFeatures: [
      'Extremely durable flatweave',
      'Reversible design for extended lifespan',
      'Sustainable, fast-growing natural fibers'
    ],
    careInstructions: [
      'Vacuum without brush roll',
      'Shake outside to remove dust',
      'Spot clean with mild detergent'
    ],
    images: ['/Carpet_06.jpg', '/Carpet_09.jpg']
  }
];

export function getCategory(id: string) {
  return CATEGORIES.find(c => c.id === id);
}

export function getProductsByCategory(categoryId: string) {
  return PRODUCTS.filter(p => p.categoryId === categoryId);
}

export function getProduct(id: string) {
  return PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(productId: string, categoryId: string) {
  return PRODUCTS.filter(p => p.categoryId === categoryId && p.id !== productId).slice(0, 3);
}
