import { Products, UI } from "./classes.js";
//=======================================================
//=======================================================
//===========creation de la page d'un produit============
//=======================================================
//=======================================================

var teddyApi = 'http://localhost:3000/api/teddies/'
let urlIdProduct = new URLSearchParams( window.location.search).get("id");//recuperation de l'id du produit choisi
let urlProduct =  teddyApi + urlIdProduct; // generation du lien vers l'api du produit choisi

const teddySeletedUI = new UI(); 
const teddySelectedProduct = new Products()
const teddySeletedApi = urlProduct

DisplayOne(teddySeletedApi,teddySelectedProduct,teddySeletedUI ) // fonction 'catch & display'
 
updateCart() 
