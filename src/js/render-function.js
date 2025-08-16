import { refs } from './refs';

export function renderCategories(data) {
  const markup = data
    .map(
      el => `<li class="categories__item">
   <button class="categories__btn" type="button">${el}</button>
 </li>
`
    )
    .join('');
  refs.categoriesList.innerHTML = markup;
}

export function renderProducts(products) {
  const markup = products
    .map(
      ({
        id,
        thumbnail,
        title,
        brand,
        category,
        price,
        description,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
  refs.productList.insertAdjacentHTML('beforeend', markup);
}
