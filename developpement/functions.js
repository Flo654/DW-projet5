//=======================================================
//============= fonctions Catch & Display=================
//=======================================================

 function DisplayAll(urlApi, nameProducts, uiProduct){
  nameProducts.getProducts(urlApi) //appel de la fonction'fetch' depuis la classe Products qui renvoie la promesse
  .then (result => {
      uiProduct.DisplayProducts(result)
  })// traitement de la promesse et appel de la fonction display qui affiche le result HTML 
};


function DisplayOne (urlApi, nameProduct, uiProduct ){
  nameProduct.getProducts(urlApi)
  .then (result =>{
      uiProduct.DisplaySeletedProduct(result);
      uiProduct.getAddProductToCart(result)
  })
  
}
  



//=======================================================
//============= fonction update cart ====================
//=======================================================

var cart = JSON.parse(localStorage.getItem('cartShopping'));
function updateCart() {
    if( cart !== null){
       let cartQuantity = cart.reduce(function (total,product){return total + product.quantity},0) ; 
       let cartTotalPrice = cart.reduce(function (total,product){return total + product.total },0) ;
       let cartTotalPriceTVA = (cartTotalPrice - (cartTotalPrice/1.20)).toFixed(2)    
       document.getElementById('quantite').innerHTML = cartQuantity
      // document.querySelector(".totalCartAmount").innerHTML =  cartTotalPrice + ' €'
       //document.querySelector(".totalTaxeAmount").innerHTML = cartTotalPriceTVA + ' €'
       
      
    } else {
      cartQuantity = 0
      document.getElementById('quantite').innerHTML = cartQuantity
    }
};




//=======================================================
//========== fonction display total price ===============
//=======================================================

function TotalPrice (){
    if (cart === null){return}
    let cartTotalPrice = cart.reduce(function (total,product){return total + product.total },0) ;
    let cartTotalPriceTVA = (cartTotalPrice - (cartTotalPrice/1.20)).toFixed(2)    
    document.querySelector(".totalCartAmount").innerHTML =  cartTotalPrice + ' €'
    document.querySelector(".totalTaxeAmount").innerHTML = cartTotalPriceTVA + ' €'
}



//=======================================================
//============ fonction add remove clear ================
//=======================================================

 function ModifyQuantityProduct(product){

  ////////////////////////////////////////////////////////////////
  ///ajout de la fonction incrementer la quantité de l'article////
  ////////////////////////////////////////////////////////////////

  var incrementation = document.getElementById(`${product.name}Add`);// variable des cibles a écouter
  incrementation.addEventListener('click',function(){                
      let quantityInCart = document.getElementById(`${product.name}Qty`);
      let totalPriceItem = document.getElementById(`${product.name}Total`); 
      product.quantity ++;
      product.total = product.quantity * product.Price 
      quantityInCart.innerHTML = product.quantity
      totalPriceItem.innerHTML = `<strong>${product.Price * product.quantity}</strong> €`
      localStorage.setItem('cartShopping', JSON.stringify(cart));
      updateCart() //affichage quantité et prix total rafraichi   
      TotalPrice()    
  })

  /////////////////////////////////////////////////////////////////
  ////ajout de la fonction decrementer  la quantité de l'article///
  /////////////////////////////////////////////////////////////////

  var decrementation = document.getElementById(`${product.name}Remove`);// variable des cibles a écouter
  decrementation.addEventListener('click',function(){
      let quantityInCart = document.getElementById(`${product.name}Qty`);
      let totalPriceItem = document.getElementById(`${product.name}Total`); 
      product.quantity --;
      product.total = product.quantity * product.Price
      if(product.quantity == 0){
          document.getElementById(`${product.name}Delete`)
          let suppr = cart.indexOf(product)
          cart.splice(suppr,1)
          console.log(cart)
          localStorage.setItem('cartShopping', JSON.stringify(cart));
          updateCart() //affichage quantité et prix total rafraichi  
          TotalPrice()
      document.location.reload();         
      }else{
      
          quantityInCart.innerHTML = product.quantity
          totalPriceItem.innerHTML = `<strong>${product.Price * product.quantity}</strong> €`      
          localStorage.setItem('cartShopping', JSON.stringify(cart));
          updateCart() //affichage quantité et prix total rafraichi  
          TotalPrice()
      }
  })

  ///////////////////////////////////////////////
  //ajout de la fonction suppression du produit//
  ///////////////////////////////////////////////

  let deleteItem = document.getElementById(`${product.name}Delete`)
  deleteItem.addEventListener('click', function(){
      var txt;
      var r = confirm("Voulez-vous supprimer l'article");
      if (r == true) {console.log(deleteItem)
          console.log(cart)
          let suppr = cart.indexOf(product)
          console.log(suppr)
          cart.splice(suppr,1)
          console.log(cart)
          localStorage.setItem('cartShopping', JSON.stringify(cart));
          updateCart() //affichage quantité et prix total rafraichi  
          TotalPrice()
          document.location.reload();
      }                     
  })



}
