export interface Product {
    id: string;
    code: string;
    name: string;
    category: string;
    price: number;
    description: string;
    outerMaterial: string;
    innerMaterial: string;
    isNew?: boolean;
    isSoldOut?: boolean;
    image: string;
    detailImages: string[];
}

export const featuredProducts: Product[] = [
    {
        id: '1',
        code: 'NV-FW24-001',
        name: 'Obsidian Parka',
        category: 'Outerwear',
        price: 1250,
        description: 'Constructed from a premium water-resistant shell, the Obsidian Parka features modular hardware, deep storm-hood geometries, and laser-fused thermal bonding for maximum structural integrity.',
        outerMaterial: '85% Technical Polyamide, 15% Polyurethane membrane',
        innerMaterial: '100% Compressed Micro-Thermid quilted lining',
        isNew: true,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '2',
        code: 'NV-FW24-002',
        name: 'Tactical Cargo',
        category: 'Bottoms',
        price: 850,
        description: 'Features precision double-welt cargo geometries, articulated knee-dart tailoring for dynamic drape, and integrated technical strap systems to alter vertical garment compression.',
        outerMaterial: '100% Heavy Gabardine Weave Cotton',
        innerMaterial: 'Reinforced dual-stitching tape',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '3',
        code: 'NV-FW24-003',
        name: 'Heavyweight Pullover',
        category: 'Fleece',
        price: 450,
        description: 'Knitted with structured heavy-gauge yarn, the pullover offers an elegant enveloping neck collar, dropped-shoulder symmetry, and seamless minimal edge treatments.',
        outerMaterial: '70% Soft Merino Fleece Wool, 30% Fine Cashmere',
        innerMaterial: 'Organic self-lined ribbing',
        isSoldOut: true,
        image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '4',
        code: 'NV-FW24-004',
        name: 'Utility Harness',
        category: 'Accessories',
        price: 320,
        description: 'An asymmetrical geometric equipment belt with custom laser-etched black hardware and double reinforced nylon tactical webbing designed to overlay heavy overcoats.',
        outerMaterial: '100% High-Density Tactical Nylon',
        innerMaterial: 'Full-grain Horween steer hide inserts',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop'
        ]
    }
];

export const allArchiveProducts: Product[] = [
    ...featuredProducts,
    {
        id: '5',
        code: 'NV-FW24-005',
        name: 'Asymmetrical Wool Vest',
        category: 'Outerwear',
        price: 780,
        description: 'Redefining modular layering, this piece presents an angular front zip crossover, thick organic virgin wool canvas, and completely concealed security seams.',
        outerMaterial: '100% Virgin Alpaca Wool, heavy-gauge face',
        innerMaterial: 'Delicate Cupro stretch liner',
        isNew: true,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '6',
        code: 'NV-FW24-006',
        name: 'Gabardine Drawstring Pants',
        category: 'Bottoms',
        price: 640,
        description: 'Featuring an ultra-relaxed profile with an adjustable high-rise cotton drawstring. Masterfully pleated at our heritage partner atelier in Kojima, Japan.',
        outerMaterial: '100% Cotton Japan-weave Gabardine',
        innerMaterial: 'Cotton lined pocket bag details',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '7',
        code: 'NV-FW24-007',
        name: 'Ribbed Compressed Knit',
        category: 'Fleece',
        price: 520,
        description: 'A heavyweight, highly compressed knit thermal structure that molds elegantly to the body without losing geometric tightness. Tailored for under-layer warmth.',
        outerMaterial: '90% Compressed Virgin Wool, 10% Elastane braid',
        innerMaterial: 'Organic seamless edge stitch',
        isSoldOut: true,
        image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: '8',
        code: 'NV-FW24-008',
        name: 'Modular Chest Ring Pack',
        category: 'Accessories',
        price: 290,
        description: 'Crafted from mil-spec nylon webbing and custom-molded matte steel. Built for modular chest accessory layouts with a completely sleek horizontal profile.',
        outerMaterial: 'Custom 1200D CORDURA weave',
        innerMaterial: 'Structured micro-alloy core',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
        detailImages: [
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
        ]
    }
];

export const detailImages = [
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop'
];
