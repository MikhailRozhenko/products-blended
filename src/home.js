//Логіка сторінки Home

import {
  getCategories,
  getAllProducts,
  getQueryProduct,
  onClearBtn,
} from './js/handlers';
import { refs } from './js/refs';

getCategories();
getAllProducts();
getQueryProduct();
onClearBtn();

refs.formSearch.reset();
