import"./assets/styles-LHsz4fpJ.js";import{a as s,i as C}from"./assets/vendor-Cbhu4xvy.js";const h="https://dummyjson.com",f={CATEGORIES:"/products/category-list",ALL_PRODUCTS:"/products?limit=12&skip=",ONE_PRODUCT:"/products/"},L=12;s.defaults.baseURL=h;async function v(){const{data:t}=await s(`${f.CATEGORIES}`);return t}async function $(t){const{data:o}=await s(`${f.ALL_PRODUCTS}${(t-1)*L}`);return o}async function M(t){const{data:o}=await s(`${f.ONE_PRODUCT}${t}`);return o}const e={categoriesList:document.querySelector(".categories"),productList:document.querySelector("ul.products"),loadMoreBtn:document.querySelector(".load-more-btn"),modal:document.querySelector(".modal"),modalBackdrop:document.querySelector(".js-modal-backdrop"),modalProduct:document.querySelector(".modal-product"),modalClose:document.querySelector(".modal__close-btn")};function S(t){const o=t.map(c=>`<li class="categories__item">
   <button class="categories__btn" type="button">${c}</button>
 </li>
`).join("");e.categoriesList.innerHTML=o}function E(t){const o=t.map(({id:c,thumbnail:i,title:l,brand:u,category:p,price:m,description:_})=>`<li class="products__item" data-id="${c}">
    <img class="products__image" src="${i}" alt="${_}"/>
    <p class="products__title">${l}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${u}</span></p>
    <p class="products__category">Category: ${p}</p>
    <p class="products__price">Price: ${m}$</p>
 </li>`).join("");e.productList.insertAdjacentHTML("beforeend",o)}function B({thumbnail:t,title:o,shippingInformation:c,price:i,description:l,tags:u,returnPolicy:p}){const m=`<img class="modal-product__img" src="${t}" alt="${o}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${o}</p>
        <ul class="modal-product__tags">${u.map(_=>`<li>${_}</li>`).join("")}</ul>
        <p class="modal-product__description">${l}</p>
        <p class="modal-product__shipping-information">Shipping: ${c}</p>
        <p class="modal-product__return-policy">Return Policy: ${p}</p>
        <p class="modal-product__price">Price: ${i}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;e.modalProduct.innerHTML=m}const y={timeout:5e3,theme:"dark",messageColor:"white",iconColor:"#FFFFFF",closeOnClick:!0,backgroundColor:"#ef4040",position:"topCenter"};function T(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}function n(t){y.message=t.message,C.show(y)}function k(t,o){if(t<o)w(),e.loadMoreBtn.removeEventListener("click",g),e.loadMoreBtn.addEventListener("click",g);else throw O(),e.loadMoreBtn.removeEventListener("click",g),new Error("No more products to load")}function w(){e.loadMoreBtn.classList.remove("is-hidden")}function O(){e.loadMoreBtn.classList.add("is-hidden")}function A(){e.modal.classList.add("modal--is-open"),e.modalClose.addEventListener("click",d),e.modalBackdrop.addEventListener("click",b),document.addEventListener("keydown",P)}function d(){e.modal.classList.remove("modal--is-open"),e.modalClose.removeEventListener("click",d),e.modalBackdrop.removeEventListener("click",b),document.removeEventListener("keydown",P)}function b(t){t.target===t.currentTarget&&d()}function P(t){t.code==="Escape"&&d()}let r=1,a=0;async function R(){try{const t=await v();S(["All",...t]),T()}catch(t){console.log(t),n({message:"Try again later!"})}}async function q(){try{const t=await $(r),o=t.total;a=Math.ceil(o/L),E(t.products),e.productList.addEventListener("click",c=>{c.preventDefault(),D(c)}),k(r,a)}catch(t){a=0,console.log(t),n(t)}}async function g(){r+=1;try{k(r,a);const t=await $(r);E(t.products)}catch(t){console.log(t),n(t)}}async function D(t){try{if(!t.target.closest(".products__item"))return;const o=t.target.closest(".products__item").dataset.id,c=await M(`${o}`);B(c),A()}catch(o){n(o)}}R();q();
//# sourceMappingURL=index.js.map
