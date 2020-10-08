//=======================================================
//=======================================================
//===========creation de la page liste produits==========
//=======================================================
//=======================================================


//import { Products, AllProductsRendering, updateCart } from "./classes.js";


const teddyUi = new AllProductsRendering
const teddyProducts = new Products
const teddyApi = 'http://localhost:3000/api/teddies/'



teddyProducts.getProducts(teddyApi) //Appel de la methode getProducts (fetch) de la classe Product qui recupere les données
.then (result => {
    teddyUi.DisplayProducts(result)// Appel de la methode DisplayProducts de la classe AllProductsRendering qui affiche les données
})

updateCart()

