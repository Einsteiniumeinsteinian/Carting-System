console.log('connected')
const cartBtn = document.querySelector('#cart_btn')
const purchaseBtn = document.querySelector('#purchase_btn')
const refundBtn = document.querySelector('#refund_btn')
const checkLogsBtn = document.getElementById('check_logs_btn')
const viewUserBtn = document.getElementById('view_user_btn')


// ? CLASSES OOP
//*  Items Class
class Items{
    constructor(name, price) {
        this.name = name
        this.price = price
        this.tax = this.price * (3 / 100)
        this.totalPayment = this.price + this.tax
    }
}

// * Log Class
class NewLoggs{
    constructor(name){
        this.name = name
        this.time = `${new Date().getHours()}:${new Date().getMinutes()}`,
        this.user = user()
        this.activity = []
    }
    newActivity(newActivity){
        this.activity.push(newActivity)
        return this
    }
}

const item1 = new Items('Milk', 5200,)
const item2 = new Items('Milo', 3500,)
const item3 = new Items('Indomie', 2800,)


let Username = 'Kim'
let refundItem = 'Milk'
const userMethods = userActivity()

// ? Destructured Functions
const {
    user,
    userLogs,
    userCart,
    userPurchase,
    userRefund,
} = userMethods


// ? Event Listeners
cartBtn.addEventListener('click', function(){
 const cartLog = new NewLoggs('carted Items')
const  carted_items = userCart()
const logCart = cartLog.newActivity(carted_items)
trackUserActivity(logCart)
})
purchaseBtn.addEventListener('click', function () {
    const purchaseLog = new NewLoggs('purchased items')
    const purchases = userPurchase()
    const logPurchases = purchaseLog.newActivity(purchases)
    trackUserActivity(logPurchases)

})
refundBtn.addEventListener('click', function () {
    const refundLog = new NewLoggs('refunded item')
    const refunds = userRefund()
    const log_refunds = refundLog.newActivity(refunds)
    trackUserActivity(log_refunds)

})

checkLogsBtn.addEventListener('click', function () {
console.log(userLogs)
})

viewUserBtn.addEventListener('click', function () {
    console.log(user())
})




function userActivity() {
    const user = {
        name: Username,
        active: true,
        cart: [],
        purchases: [],
    }
    const itemsInCart = addItemToCart(user, item1, item2, item3)
    return function () {
        return {
            user:limitUserAccessibility(user),
            userLogs: [],
            userCart: itemsInCart,
            userPurchase: purchasedItem(user),
            userRefund: refund(user),
        }
    }()
}

// ? Add Item to Cart
function addItemToCart(user, ...items) {
    return function () {
        for (let item of items) {
            user.cart.push(item)
        }
        console.log('Added to user cart')
        return user.cart
    }
}

// ? Add Item to Purchases and clear cart
function purchasedItem(user) {
    return function(){
        let items = Array.from(user.cart)
        for (let item of items) {
            user.purchases.push(item)
        }
        user.cart = []
        console.log('Added to user purchases')
        return user.purchases
    }
}


function refund(user){
    return function(refundItem){
        if (!refundItem) return console.log('No cart Item')
        console.log('Refunding Item')
        for (let purchasedItem of user.purchases) {
            if (refundItem === purchasedItem.name) return {removedPurchase: user.purchases.splice(purchasedItem, 1), user: user}
        }
        return user
    }
   
}


// function limitUserAccessibility(user) {
//     return function () {
//         return user
//     }
// }

function limitUserAccessibility(user) {
    return () => user;
}

function trackUserActivity(objectLog){
    // Check if date exists
    for(let userLog of userLogs){
        if(userLog.date === new Date().toDateString()){
         console.log('no new  date log created date exist')
         userLog.logs.push(objectLog)
         return userLogs
        }
    }
    //  create an object
    // ? create date
    console.log('new date created')

    let newDate = {
        date: new Date().toDateString(),
        logs: [objectLog]
    }
    userLogs.push(newDate)
    return userLogs
}

// [
//     {
//         date: new Date(),
//         logs: [
//             {
//                 time: 'time',
//                 activity: 'activity'
//             }
//         ]
//     }
// ]


// userLogs.push({
//     date: new Date().toDateString,
//     logs: [
//         {
//             time: 'time',
//             activity: 'activity'
//         }
//     ]
// })

// userLogs.push({
//     date: new Date().toDateString(),
//     logs: [
//         {
//             time: 'time',
//             activity: 'activity'
//         }
//     ]
// })

