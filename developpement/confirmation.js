import{cart} from "./classes.js"

let OrderID = JSON.parse(sessionStorage.orderConfirm)


let customerFirstName = OrderID[0].contact.firstName
let customerLastName = OrderID[0].contact.lastName
let customerOrderId = OrderID[0].orderId
let orderNumber = customerOrderId.substr(25)
let cartTotalPrice = cart.reduce(function (total,product){return total + product.total },0) ;
let message = document.querySelector('.confirmName')
let messageText = document.querySelector('.confirmOrder')
let displayCart = document.getElementById('quantite')
displayCart.style.display = 'none'
message.innerHTML = ` ${customerLastName} ${customerFirstName}  `
messageText.insertAdjacentHTML('afterbegin',  
`<p class="confirmOrder"> votre commande N°: <span class="Order">${orderNumber}</span> d'un montant de <span class="Order">${cartTotalPrice}</span> € vous sera expédiée prochainement ! `)


localStorage.removeItem('cartShopping')
sessionStorage.removeItem('orderConfirm')
let cartQuantity = 0
