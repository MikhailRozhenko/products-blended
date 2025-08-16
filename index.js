import"./assets/styles-JE8YjOlG.js";import{a as s,i as f}from"./assets/vendor-4yCzdkXl.js";const C="https://dummyjson.com",m={CATEGORIES:"/products/category-list",ALL_PRODUCTS:"/products?limit=12&skip=",ONE_PRODUCT:"/products/"},y=12;s.defaults.baseURL=C;async function b(){const{data:t}=await s(`${m.CATEGORIES}`);return t}async function k(t){const{data:o}=await s(`${m.ALL_PRODUCTS}${(t-1)*y}`);return o}async function v(t){const{data:o}=await s(`${m.ONE_PRODUCT}${t}`);return o}const e={categoriesList:document.querySelector(".categories"),productList:document.querySelector("ul.products"),loadMoreBtn:document.querySelector(".load-more-btn"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),modalClose:document.querySelector(".modal__close-btn")};function T(t){const o=t.map(c=>`<li class="categories__item">
   <button class="categories__btn" type="button">${c}</button>
 </li>
`).join("");e.categoriesList.innerHTML=o}function h(t){const o=t.map(({id:c,thumbnail:r,title:n,brand:i,category:d,price:l,description:u})=>`<li class="products__item" data-id="${c}">
    <img class="products__image" src="${r}" alt="${u}"/>
    <p class="products__title">${n}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${i}</span></p>
    <p class="products__category">Category: ${d}</p>
    <p class="products__price">Price: ${l}$</p>
 </li>`).join("");e.productList.insertAdjacentHTML("beforeend",o)}function S({thumbnail:t,title:o,shippingInformation:c,price:r,description:n,tags:i,returnPolicy:d}){const l=`<img class="modal-product__img" src="${t}" alt="${o}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${o}</p>
        <ul class="modal-product__tags">${i.map(u=>`<li>${u}</li>`).join("")}</ul>
        <p class="modal-product__description">${n}</p>
        <p class="modal-product__shipping-information">Shipping: ${c}</p>
        <p class="modal-product__return-policy">Return Policy: ${d}</p>
        <p class="modal-product__price">Price: ${r}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;e.modalProduct.innerHTML=l}const _={timeout:5e3,theme:"dark",messageColor:"white",iconColor:"#FFFFFF",closeOnClick:!0,backgroundColor:"#ef4040",position:"topCenter"};function M(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}function L(t){_.message=t.message,f.show(_)}function O(){e.modal.classList.add("modal--is-open"),e.modalClose.addEventListener("click",a),document.addEventListener("keydown",E),e.modal.addEventListener("click",$)}function a(){e.modal.classList.remove("modal--is-open"),e.modalClose.removeEventListener("click",a),document.removeEventListener("keydown",E),e.modal.removeEventListener("click",$)}function $(t){t.target===t.currentTarget&&a()}function E(t){t.code==="Escape"&&a()}let P=1,p=0;async function B(){try{const t=await b();T(["All",...t]),M()}catch(t){console.log(t),f.error({message:"Try again later!"})}}async function w(){try{const t=await k(P);p=t.total,console.log(t.total),h(t.products),p>y?(e.loadMoreBtn.classList.remove("is-hidden"),e.loadMoreBtn.addEventListener("click",g)):(e.loadMoreBtn.classList.add("is-hidden"),e.loadMoreBtn.removeEventListener("click",g)),p-=12}catch(t){console.log(t),L(t)}}async function g(){P+=1}async function R(t){try{if(!t.target.closest(".products__item"))return;const o=t.target.closest(".products__item").dataset.id,c=await v(`${o}`);S(c),O()}catch(o){L(o)}}B();w();e.productList.addEventListener("click",t=>{R(t)});
//# sourceMappingURL=index.js.map
