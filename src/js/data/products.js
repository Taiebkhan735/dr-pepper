/** Shared product catalog for demo site */
export const products = [
  {
    id: 'original',
    slug: 'original',
    name: 'Dr Pepper Original',
    tagline: '23 flavors. One legend.',
    short: 'Bold, complex, unmistakable.',
    description:
      'A symphony of spice, fruit, and caramel-kissed mystery — smooth on the sip, electric on the finish. The original that started the obsession.',
    notes: ['Vanilla warmth', 'Dark fruit', 'Snap of spice'],
    calories: 150,
    sugar: '39g',
    caffeine: '41mg (12 fl oz)',
    limited: false,
    color: 'from-amber-900/30 to-brand-burgundy/40',
  },
  {
    id: 'zero',
    slug: 'dr-pepper-zero',
    name: 'Dr Pepper Zero Sugar',
    tagline: 'Full flavor. Zero compromise.',
    short: 'All the attitude, none of the sugar.',
    description:
      'Crisp, confident, and built for late-night sessions and midday wins. Same layered taste profile — tuned for zero-sugar seekers.',
    notes: ['Clean finish', 'Bold aromatics', 'Sessionable'],
    calories: 0,
    sugar: '0g',
    caffeine: '41mg (12 fl oz)',
    limited: false,
    color: 'from-slate-800/40 to-brand-burgundy-deep/50',
  },
  {
    id: 'cherry',
    slug: 'cherry',
    name: 'Dr Pepper Cherry',
    tagline: 'Cherry on top of 23.',
    short: 'Juicy cherry rush meets signature depth.',
    description:
      'Bright cherry leads, then the classic blend steps in — playful upfront, serious underneath. Built for playlists and victory screens.',
    notes: ['Stone fruit pop', 'Silky mouthfeel', 'Bright nose'],
    calories: 150,
    sugar: '39g',
    caffeine: '41mg (12 fl oz)',
    limited: false,
    color: 'from-rose-900/40 to-brand-crimson/40',
  },
  {
    id: 'cream-soda',
    slug: 'cream-soda',
    name: 'Dr Pepper Cream Soda',
    tagline: 'Creamy plot twist.',
    short: 'Velvet cream meets signature spice.',
    description:
      'Dessert energy without the fork — swirly, nostalgic, and dangerously sippable. Pairs with neon lights and your favorite drops.',
    notes: ['Vanilla cream', 'Soft fizz', 'Round sweetness'],
    calories: 170,
    sugar: '46g',
    caffeine: '0mg (varies by market — demo)',
    limited: true,
    color: 'from-amber-200/20 to-brand-burgundy/30',
  },
  {
    id: 'strawberry',
    slug: 'strawberries-cream',
    name: 'Dr Pepper Strawberries & Cream',
    tagline: 'Limited drop energy.',
    short: 'Berry bright + lounge smooth.',
    description:
      'A limited-run flex: strawberry high-notes over a Cream Soda base. If you see it, grab it — these shelves turn over fast.',
    notes: ['Berry top', 'Cream mid', 'Short finish'],
    calories: 160,
    sugar: '44g',
    caffeine: '0mg (demo)',
    limited: true,
    color: 'from-pink-500/20 to-rose-900/40',
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || products[0]
}
