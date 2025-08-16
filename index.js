import"./assets/styles-JE8YjOlG.js";import{a as e,i as a}from"./assets/vendor-ZnMw6IGI.js";const i="https://dummyjson.com",r={CATEGORIES:"/products/category-list"};e.defaults.baseURL=i;async function c(){const{data:t}=await e(`${r.CATEGORIES}`);return t}const n={categoriesList:document.querySelector(".categories")};function u(t){const s=t.map(o=>`<li class="categories__item">
   <button class="categories__btn" type="button">${o}</button>
 </li>
`).join("");n.categoriesList.innerHTML=s}function g(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}async function l(){try{const t=await c();u(["All",...t]),g()}catch(t){console.log(t),a.error({message:"Try again later!"})}}l();
//# sourceMappingURL=index.js.map
