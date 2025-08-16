import { getCategories, getAllProducts, getCardProduct } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
getCategories();
getAllProducts();

refs.productList.addEventListener('click', event => {
  getCardProduct(event);
});
