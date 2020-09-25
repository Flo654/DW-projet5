//=======================================================
//=======================================================
//===========creation de la page liste produits==========
//=======================================================
//=======================================================

import { Products, UI} from "./classes.js";

const teddyUi = new UI()
const teddyProducts = new Products()
const teddyApi = 'http://localhost:3000/api/teddies/'


DisplayAll(teddyApi, teddyProducts, teddyUi)
updateCart()

console.log()