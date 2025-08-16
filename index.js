import"./assets/styles-JE8YjOlG.js";import{a as c,i}from"./assets/vendor-4yCzdkXl.js";const L="https://dummyjson.com",l={CATEGORIES:"/products/category-list",ALL_PRODUCTS:"/products?limit=12&skip="},d=12;c.defaults.baseURL=L;async function b(){const{data:t}=await c(`${l.CATEGORIES}`);return t}async function C(t){const{data:e}=await c(`${l.ALL_PRODUCTS}${(t-1)*d}`);return e}const o={categoriesList:document.querySelector(".categories"),productList:document.querySelector("ul.products"),loadMoreBtn:document.querySelector(".load-more-btn")};function P(t){const e=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>
`).join("");o.categoriesList.innerHTML=e}function $(t){const e=t.map(({id:s,thumbnail:p,title:g,brand:m,category:_,price:f,description:y})=>`<li class="products__item" data-id="${s}">
    <img class="products__image" src="${p}" alt="${y}"/>
    <p class="products__title">${g}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${m}</span></p>
    <p class="products__category">Category: ${_}</p>
    <p class="products__price">Price: ${f}$</p>
 </li>`).join("");o.productList.insertAdjacentHTML("beforeend",e)}const a={timeout:5e3,theme:"dark",messageColor:"white",iconColor:"#FFFFFF",closeOnClick:!0,backgroundColor:"#ef4040",position:"topCenter"};function E(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}function T(t){a.message=t.message,i.show(a)}let u=1,r=0;async function h(){try{const t=await b();P(["All",...t]),E()}catch(t){console.log(t),i.error({message:"Try again later!"})}}async function S(){try{const t=await C(u);r=t.total,console.log(t.total),$(t.products),r>d?(o.loadMoreBtn.classList.remove("is-hidden"),o.loadMoreBtn.addEventListener("click",n)):(o.loadMoreBtn.classList.add("is-hidden"),o.loadMoreBtn.removeEventListener("click",n)),r-=12}catch(t){console.log(t),T(t)}}async function n(){u+=1}h();S();
//# sourceMappingURL=index.js.map
