//=======================================================
//=======================================================
//===========creation de la page liste produits==========
//=======================================================
//=======================================================


import { Products, AllProductsRendering, DisplayAll, updateCart } from "./classes.js";


const teddyUi = new AllProductsRendering
const teddyProducts = new Products()
const teddyApi = 'http://localhost:3000/api/teddies/'


DisplayAll(teddyApi, teddyProducts, teddyUi)
updateCart()

console.log()