import {
  fetchCategories,
  fetchProducts,
  fetchOneProduct,
} from './products-api';

import {
  renderCategories,
  renderProducts,
  renderCardProduct,
} from './render-function';

import {
  activeFirstBtn,
  iziToastErrorMessage,
  loadMoreVisibleStatus,
} from './helpers';

import { PAGE_SIZE } from './constants';
import { refs } from './refs';
import { openModal } from './modal';

let currentPage = 1;
let totalPages = 0;

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    console.log(error);
    iziToastErrorMessage({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
  try {
    const data = await fetchProducts(currentPage);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    renderProducts(data.products);

    refs.productList.addEventListener('click', event => {
      event.preventDefault();
      getCardProduct(event);
    });

    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    totalPages = 0;
    console.log(error);
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  currentPage += 1;

  try {
    loadMoreVisibleStatus(currentPage, totalPages);
    const data = await fetchProducts(currentPage);
    renderProducts(data.products);
  } catch (error) {
    console.log(error);
    iziToastErrorMessage(error);
  }
}

export async function getCardProduct(event) {
  try {
    if (!event.target.closest('.products__item')) {
      return;
    }

    const productID = event.target.closest('.products__item').dataset.id;
    const data = await fetchOneProduct(`${productID}`);

    renderCardProduct(data);
    openModal();
  } catch (error) {
    iziToastErrorMessage(error);
  }
}
