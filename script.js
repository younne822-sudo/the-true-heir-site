const home = document.getElementById("home");
const collection = document.getElementById("collection");
const bookPage = document.getElementById("bookPage");
const cartPage = document.getElementById("cartPage");

const goldLight = document.getElementById("goldLight");
const cartIcon = document.getElementById("cartIcon");

let cart = [];
let total = 0;
let currentBook = null;

/* navigation */

function show(page){
home.classList.remove("active");
collection.classList.remove("active");
bookPage.classList.remove("active");
cartPage.classList.remove("active");
page.classList.add("active");
}

function goHome(){
show(home);
cartIcon.style.display="none";
}

function goCollection(){
show(collection);
cartIcon.style.display="block";
}

function goCart(){
show(cartPage);
displayCartPage();
}

/* gold animation */

goldLight.addEventListener("click",()=>{
show(collection);
cartIcon.style.display="block";
});

/* books */

function openBook(n){

show(bookPage);

let books = [

{
title:"Tome 1",
price:7.50,
img:"https://i.imgur.com/DqsFBQV.jpeg",
desc:"In a distant world, two rival kingdoms are divided by war. Leo must choose between destiny and loyalty.",
sell:true
},

{
title:"Tome 2",
price:"Coming Soon",
img:"https://i.imgur.com/7cOXoxy.jpeg",
desc:"The journey continues. Coming soon.",
sell:false
},

{
title:"Tome 3",
price:"Coming Soon",
img:"https://i.imgur.com/ud1FYlH.jpeg",
desc:"The final destiny awaits.",
sell:false
}

];

currentBook = books[n-1];

document.getElementById("bookTitle").innerText=currentBook.title;
document.getElementById("bookText").innerText=currentBook.desc;
document.getElementById("bookImage").src=currentBook.img;
document.getElementById("bookPrice").innerText=currentBook.price;

let format = document.getElementById("formatSelect");

if(currentBook.sell){

format.innerHTML=`
<label><input type="radio" name="format" checked> Ebook</label><br>
<label><input type="radio" disabled> Paper (COMING SOON)</label>
`;

document.getElementById("addBookBtn").style.display="inline-block";

}else{

format.innerHTML=`<p>COMING SOON</p>`;
document.getElementById("addBookBtn").style.display="none";

}

}

/* cart */

function addBookFromPage(){
addToCart(currentBook.title,7.50,currentBook.img);
}

function addToCart(name,price,img){

cart.push({name,price,img});
total+=price;

document.getElementById("cartCount").innerText=cart.length;

cartIcon.classList.add("cartBounce");

setTimeout(()=>{
cartIcon.classList.remove("cartBounce");
},600);

}

function removeFromCart(i){
total-=cart[i].price;
cart.splice(i,1);
displayCartPage();
document.getElementById("cartCount").innerText=cart.length;
}

function displayCartPage(){

const box=document.getElementById("cartItemsPage");
box.innerHTML="";

if(cart.length==0){
box.innerHTML="<p>Cart empty</p>";
document.getElementById("cartTotalPage").innerText="";
document.getElementById("payhipBox").innerHTML="";
return;
}

cart.forEach((item,index)=>{

box.innerHTML+=`
<div>
<img src="${item.img}" width="80"><br>
${item.name} - $${item.price}
<br>
<button onclick="removeFromCart(${index})">Remove</button>
</div>
<br>
`;

});

document.getElementById("cartTotalPage").innerText="Total : $"+total.toFixed(2);

/* PAYHIP BUTTON */

document.getElementById("payhipBox").innerHTML=`
<a class="payhip-btn" href="https://payhip.com/b/5VfU8" target="_blank">
Pay Now
</a>
`;

}
