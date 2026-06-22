window.BPS_LIST_DATA = (function () {
  const IMGS = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617806117938-529d34949e8f?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1617103996701-966ffc08c9b0?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=480&h=480&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=480&h=480&fit=crop',
  ];

  const PRODUCT_TITLE = 'Oxygen Wood Grain Sintered s...';

  const MAIN_CATS = [
    { id: 'living', name: 'Living Room' },
    { id: 'linsy', name: 'Linsy Living' },
    { id: 'kids', name: 'Kids Furniture' },
    { id: 'inspire', name: 'Inspire Series' },
    { id: 'dining', name: 'Dining Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'study', name: 'Study' },
  ];

  const SUB_CATS = {
    living: [
      { name: 'Side Table', img: IMGS[10] },
      { name: 'Coffee Table', img: IMGS[0] },
      { name: 'Recliner Sofa', img: IMGS[1] },
      { name: 'Bean Bag Sofa', img: IMGS[2] },
      { name: 'Sofa Bed', img: IMGS[3] },
      { name: 'Storage Cabinet', img: IMGS[4], slug: 'storage-cabinet' },
      { name: 'Solid Wood Sofa', img: IMGS[5] },
      { name: 'Leather Sofa', img: IMGS[6] },
      { name: 'Fabric Sofa', img: IMGS[7] },
      { name: 'Sofa Accessories', img: IMGS[8] },
    ],
  };

  const PRODUCTS = Array.from({ length: 20 }, (_, i) => {
    const imgIdx = i % IMGS.length;
    return {
      id: `p${i + 1}`,
      item: `LSC25ZH07589${i}`,
      price: 78.56,
      estDel: '7d',
      moq: 5,
      images: 12,
      image: IMGS[imgIdx],
      gallery: [
        IMGS[imgIdx],
        IMGS[(imgIdx + 1) % IMGS.length],
        IMGS[(imgIdx + 2) % IMGS.length],
      ],
    };
  });

  return { PRODUCTS, MAIN_CATS, SUB_CATS, PRODUCT_TITLE };
})();
