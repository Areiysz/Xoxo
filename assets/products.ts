import { Product } from './types/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Macbook Pro (2024)',
    slug: 'macbook-pro-2024',
    heroImage: require('../assets/images/mac-book-1.jpg'),
    imagesUrl: [
      require('../assets/images/mac-book-1.jpg'),
      require('../assets/images/mac-book-2.jpg'),
      require('../assets/images/mac-book-3.jpg'),
    ],
    price: 13999999, // Rp13.999.999
    category: {
      imageUrl: require('../assets/images/mac-book-1.jpg'),
      name: 'Laptop',
      slug: 'laptops',
    },
    maxQuantity: 5,
  },
  {
    id: 5,
    title: 'Dell XPS 13',
    slug: 'dell-xps-13',
    heroImage: require('../assets/images/dell-1.jpg'),
    imagesUrl: [
      require('../assets/images/dell-1.jpg'),
      require('../assets/images/dell-2.jpg'),
    ],
    price: 16999999, // Rp16.999.999
    category: {
      imageUrl: require('../assets/images/mac-book-1.jpg'),
      name: 'Laptop',
      slug: 'laptops',
    },
    maxQuantity: 7,
  },
  {
    id: 2,
    title: 'IPhone 15',
    slug: 'i-phone-15',
    heroImage: require('../assets/images/i-phone-1.jpg'),
    imagesUrl: [
      require('../assets/images/i-phone-2.jpg'),
      require('../assets/images/i-phone-3.jpg'),
    ],
    price: 15999999, // Rp15.999.999
    category: {
      imageUrl: require('../assets/images/i-phone-1.jpg'),
      name: 'Ponsel',
      slug: 'phones',
    },
    maxQuantity: 10,
  },
  {
    id: 6,
    title: 'Samsung Galaxy S21',
    slug: 'samsung-galaxy-s21',
    heroImage: require('../assets/images/samsung-1.jpg'),
    imagesUrl: [
      require('../assets/images/samsung-1.jpg'),
      require('../assets/images/samsung-2.jpg'),
    ],
    price: 12499999, // Rp12.499.999
    category: {
      imageUrl: require('../assets/images/i-phone-1.jpg'),
      name: 'Ponsel',
      slug: 'phones',
    },
    maxQuantity: 12,
  },
  {
    id: 3,
    title: 'Headset',
    slug: 'headset',
    heroImage: require('../assets/images/head-set-1.jpg'),
    imagesUrl: [
      require('../assets/images/head-set-1.jpg'),
      require('../assets/images/head-set-2.jpg'),
    ],
    price: 799999, // Rp799.999
    category: {
      imageUrl: require('../assets/images/head-set-1.jpg'),
      name: 'Aksesori',
      slug: 'accessories',
    },
    maxQuantity: 15,
  },
  {
    id: 4,
    title: 'PlayStation 5',
    slug: 'playstation-5',
    heroImage: require('../assets/images/ps-5-1.jpg'),
    imagesUrl: [
      require('../assets/images/ps-5-1.jpg'),
      require('../assets/images/ps-5-2.jpg'),
      require('../assets/images/ps-5-3.jpg'),
    ],
    price: 10499999, // Rp10.499.999
    category: {
      imageUrl: require('../assets/images/ps-5-1.jpg'),
      name: 'Permainan',
      slug: 'gaming',
    },
    maxQuantity: 3,
  },
  {
    id: 7,
    title: 'Nintendo Switch',
    slug: 'nintendo-switch',
    heroImage: require('../assets/images/nintendo-switch-1.jpg'),
    imagesUrl: [
      require('../assets/images/nintendo-switch-1.jpg'),
      require('../assets/images/nintendo-switch-2.jpg'),
    ],
    price: 4799999, // Rp4.799.999
    category: {
      imageUrl: require('../assets/images/ps-5-1.jpg'),
      name: 'Permainan',
      slug: 'gaming',
    },
    maxQuantity: 8,
  },
];