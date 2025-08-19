import {
  fetchCategories,
  fetchProducts,
  fetchOneProduct,
  fetchQueryProduct,
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
  clearGallery,
  hideNotFoundProducts,
  showNotFoundProducts,
  hideLoadMore,
} from './helpers';

import { PAGE_SIZE } from './constants';
import { refs } from './refs';
import { openModal } from './modal';

let currentPage = 1;
let query;
let totalPages = 0;
let previousQuery;
let inputContext = refs.formSearch.querySelector('.search-form__input');

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    iziToastErrorMessage({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
  try {
    clearGallery();
    const data = await fetchProducts(currentPage);
    renderProducts(data.products);

    refs.productList.addEventListener('click', event => {
      getCardProduct(event);
    });

    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  currentPage += 1;
  let data;
  try {
    if (query) {
      data = await fetchQueryProduct(query, currentPage);
    } else {
      data = await fetchProducts(currentPage);
    }
    renderProducts(data.products);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
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

export function getQueryProduct() {
  refs.formSearch.addEventListener('submit', async event => {
    event.preventDefault();

    // window.location.href = './index.html';
    query = event.target.searchValue.value.trim();
    try {
      if (!query) {
        refs.formSearch.reset();
        throw new Error('Sorry, this name images is empty. Please try again!');
      }

      if (query !== previousQuery) {
        currentPage = 1;
        previousQuery = query;
      }

      clearGallery();
      const data = await fetchQueryProduct(query, currentPage);
      const totalProducts = data.total;
      totalPages = Math.ceil(totalProducts / PAGE_SIZE);

      if (totalProducts === 0) {
        showNotFoundProducts();
      } else {
        renderProducts(data.products);
        loadMoreVisibleStatus(currentPage, totalPages);
      }
    } catch (error) {
      iziToastErrorMessage(error);
    }
  });
}

export function onClearBtn() {
  refs.clearBtn.addEventListener('click', event => {
    event.preventDefault();
    inputContext.value = '';
    query = '';
    getAllProducts();
  });
}
