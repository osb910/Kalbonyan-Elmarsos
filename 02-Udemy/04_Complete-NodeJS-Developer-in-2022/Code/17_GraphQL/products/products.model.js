const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 42.12,
    reviews: [],
  },
  {
    id: 'bluejean',
    description: 'Blue Jeans',
    price: 55.55,
    reviews: [],
  },
];

const getAllProducts = () => {
  return products;
};

const getProductsByPrice = (min, max) => {
  return products.filter(product => {
    return product.price >= min && product.price <= max;
  });
};

const getProductById = id => {
  return products.find(product => product.id === id);
};

const addNewProduct = (id, description, price) => {
  const newProduct = {
    id,
    price,
    description,
    reviews: [],
  };

  products.push(newProduct);
  return newProduct;
};

const addNewProductReview = (id, rating, comment) => {
  const product = getProductById(id);
  if (!product) return;
  const review = {
    rating,
    comment,
  };

  product.reviews.push(review);
  return review;
};

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
};
