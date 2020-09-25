import { Cart , Contact, SendCart} from "./classes.js";

//=======================================================
//=======================================================
//================affichage du panier====================
//=======================================================
//=======================================================

if (cart === null) { alert('panier vide');
 };
let shoppingCart = new Cart;//instanciation de la classe Cart
shoppingCart.DisplayCart();// affichage des données à l'ecran
updateCart();
TotalPrice(); 



// gestion de l'envoi du formulaire quand on clique sur le bouton 'passer la commande           
document.getElementById('submitButton').addEventListener('click', function (e) {
    e.preventDefault
    // creation des variables où sont stockées les valeurs du formulaire de contact
    let nom = document.getElementById('firstName').value;
    let nomIsValid = document.getElementById('firstName').checkValidity();
    let prenom = document.getElementById('lastName').value;
    let prenomIsValid = document.getElementById('lastName').checkValidity();
    let email = document.getElementById('Email').value;
    let emailIsValid = document.getElementById('Email').checkValidity();
    let adresse = document.getElementById('address').value;
    let adresseIsValid = document.getElementById('address').checkValidity();
    let codePostal = document.getElementById('zipCode').value;
    let codePostalIsValid = document.getElementById('zipCode').checkValidity();
    let ville = document.getElementById('city').value;
    let villeIsValid = document.getElementById('city').checkValidity();
    let conditions = document.getElementById('invalidCheck2').checked  
    
    // si le panier est vide on ne peut pas envoyer le formulaire
    if (cart == null) { alert('panier vide vous ne pouvez pas envoyer le formulaire')
        return
    };
   
    //si tous les champs ne sont pas valides on ne peut pas envoyer le formulaire
    if (prenomIsValid == false | nomIsValid ==false | emailIsValid== false | codePostalIsValid==false | villeIsValid==false | conditions == false ) {
        return
     }
    

    function SendDatasToServer(){
        let contact = new Contact(nom, prenom, adresse, ville, email)
        let products = [] //initialisation de l'objet qui va contenir les id des produits 
        for (let i=0; i< cart.length; i++){ //boucle pour recuperer les id 
            products.push(cart[i].id) //envoie des id dans la variable products
        };

        let urlOrderApi = "http://localhost:3000/api/teddies/order"
        let sendCart = new SendCart // instanciation de la classe SendCart       
        sendCart.SendProducts(urlOrderApi,contact,products) //appel de la fonction SendProducts avec les arguments
        .then (result => {
            
            //creation d'une variable dans le sessionStorage pour y sauvegarder les données au serveur dans le but de les utiliser pour la page confirmation
            var  order = JSON.parse(sessionStorage.getItem('orderId')); 
            order = []
            order.push(result)
            console.log(order )
            sessionStorage.setItem('orderConfirm', JSON.stringify(order));
            // redirection vers la page confirmation
            document.location.href='confirmation.html';
        })
    }
    SendDatasToServer()

    
})