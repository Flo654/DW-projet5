//=======================================================
//===================== get products ====================
//=======================================================

 class Products{

    // commentaire
    async getProducts(url){
        try {
            let response = await fetch(url);
            let result = await response.json();
            return result
                     
        } catch (error) {
            console.log (error)           
        }
    }
}





//=======================================================
//================= display UI products =================
//=======================================================

 class AllProductsRendering{
    
    //=======================================================
    //================ display all products =================
    //=======================================================
    
    DisplayProducts(result) {
        result.forEach(product => {
            const convertedPrice = (product.price / 100);
            const productList = document.getElementById("products")
            let displayUI =  `
            
                    
                        <div class="card">
                            <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap" style="width:100%">
                            <div class="card-body">
                                <h4 class="card-title">${product.name}</h4>
                                <h5 class="card-title">${convertedPrice}€</h5>
                            </div>
                            <div class="card-footer">
                                <a href="product.html?id=${product._id}" class="btn  stretched-link"></a>
                                
                            </div>
                        </div>  
                    
               `
            productList.insertAdjacentHTML( "afterbegin" , displayUI);         
        });
   }
}

 class ProductSelectedRendering {
    //=======================================================
    //============= display product selected ================
    //=======================================================

    DisplaySeletedProduct(result){
         //generation du code HTML de la page product
        const itemProduct = document.getElementById("product")
        const convertedPrice = (result.price / 100);
        let generateHtmlProductItem = ` 
            <div class="card2">
                <img class="card-img-top" src="${result.imageUrl}" alt="Card image" >
                <div class="card-body">
                    <h4 class="card-title">${result.name}</h4>
                    <p class="card-text">${result.description}</p>
                    <div class="product-item-color">
                        <select name="colors" id="teddy-color-select"> 
                            <option value="">--Please choose a color--</option>
                        </select>
                    </div>  
                    <h5 class="card-title">Prix: <strong>${convertedPrice}€</strong></h5>  
                    <button class="product-item-btn--addToCart btn btn-primary" >Ajouter au panier</button>
                </div>
            </div>
        `;
        itemProduct.insertAdjacentHTML( "beforeend" , generateHtmlProductItem);  

        // creation du bouton pour le choix de la couleur de l'ourson
        const  colorLength = result.colors.length;
        const colorTag = document.getElementById("teddy-color-select");   
        for (let i = 0; i < colorLength; i++){
            colorTag.insertAdjacentHTML( "beforeend" ,
            `<option value="${result.colors[i]}">${result.colors[i]}</option>`); 
        };   
      
    }
    
    getAddProductToCart(result){

        let productSelected = {
            name: result.name,
            id: result._id,
            quantity: 1,
            Price: result.price/100,
            image : result.imageUrl,
            description : result.description,
            total: result.price/100
            
        };
                
        // creation de l'evenement 'ajouter au panier'  
        const card = document.querySelector(".product-item-btn--addToCart");
        card.addEventListener('click', addToCart );
        function addToCart () {
            if (!cart) { console.log(cart = []) } ;  //initialisation du panier s'il n'exite pas encore
            
            let productAlreadyInCart = cart.find(result=> result.name == productSelected.name);  //verification si l'objet selectionné existe deja dans le panier
            if (productAlreadyInCart){ // si oui modification de la quantité et du prix du produit dans le panier 
                productAlreadyInCart.quantity ++;
                productSelected.total = productSelected.Price * productAlreadyInCart.quantity
                localStorage.setItem('cartShopping', JSON.stringify(cart));
                updateCart() //affichage quantité et prix total rafraichi               
                
            }else{ // si non, push du produit dans le panier
                cart.push(productSelected);  
                localStorage.setItem('cartShopping', JSON.stringify(cart));
                updateCart()
            };              
        }       
    } 
}





//=======================================================
//=================== class cart ========================
//=======================================================

class Cart {

    DisplayCart(){
        if (cart === null){return}
        for (let product of cart) { 

            ////////////////////////////////////////////////////////////////
            ///////////////////display du panier ///////////////////////////
            ////////////////////////////////////////////////////////////////

            let cartHtmlCode = `
            <div class="cart-section-wrapper">
                <div class="cart-section-wrapper-image">
                    <img src="${product.image}" alt='photo product' style="width: 7rem">
                </div>
                <div class="cart-section-wrapper-infos">
                    <div class="cart-section-wrapper-infos-name">${product.name}</div>
                    <div class="cart-section-wrapper-infos-price">${product.Price}€</div>
                    <div class="cart-section-wrapper-infos-counterAndModifier">
                        <div class="cart-section-wrapper-infos-counterAndModifier-modify">
                            <button class="cart-section-wrapper-infos-counterAndModifier-modify-removeOne" id='${product.name}Remove'>-</button>
                            <p class="cart-section-wrapper-infos-counterAndModifier-modify-quantityValue" id='${product.name}Qty'>${product.quantity}</p>
                            <button class="cart-section-wrapper-infos-counterAndModifier-modify-addOne" id='${product.name}Add'>+</button>
                        </div>
                        <div class="cart-section-wrapper-infos-counterAndModifier-totalPrice" id='${product.name}Total'><strong>${product.Price*product.quantity}</strong> €</div>
                        <div class="cart-section-wrapper-infos-counterAndModifier-remove" id='${product.name}Delete'>
                            <button>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill"  xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                            </button>
                        </div>
            
                    </div>
                    
                </div>
            </div>`;
        
            document.getElementById('cart-section-title').insertAdjacentHTML('afterend', cartHtmlCode);
          
            ModifyQuantityProduct(product) 
            TotalPrice()          
        }           
    }
}


//=======================================================
//=================== class Contact =====================
//=======================================================

class Contact {
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName
        this.lastName = lastName,
        this.address = address,
        this.city = city,
        this.email = email        
    }
}


//=======================================================
//===================== send order ======================
//=======================================================

class SendCart{
    async SendProducts(url,contact, products){
        const options = {
            method: 'POST',
            body: JSON.stringify({
                contact : contact ,
                products: products 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            let response = await fetch(url, options);
            let result = await response.json();
            return result
                     
        } catch (error) {
            console.log (error)           
        }
    }
}

    













  
  
  //=======================================================
  //============= fonction update cart ====================
  //=======================================================
  
  let cart = JSON.parse(localStorage.getItem('cartShopping'));
  function updateCart() {
      if( cart !== null){
         let cartQuantity = cart.reduce(function (total,product){return total + product.quantity},0) ; 
         let cartTotalPrice = cart.reduce(function (total,product){return total + product.total },0) ;
         let cartTotalPriceTVA = (cartTotalPrice - (cartTotalPrice/1.20)).toFixed(2)    
         document.getElementById('quantite').innerHTML = cartQuantity
        // document.querySelector(".totalCartAmount").innerHTML =  cartTotalPrice + ' €'
         //document.querySelector(".totalTaxeAmount").innerHTML = cartTotalPriceTVA + ' €'
         
        
      } else {
        let cartQuantity = 0
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
        var r = confirm("Voulez-vous supprimer l'article ?");
        if (r == true) {
            let suppr = cart.indexOf(product)
            cart.splice(suppr,1)
            localStorage.setItem('cartShopping', JSON.stringify(cart));
            updateCart() //affichage quantité et prix total rafraichi  
            TotalPrice()
            document.location.reload();
        }                     
    })
  
  
  
  }    
   





