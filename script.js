const pages = document.querySelectorAll(".page");

const home = document.getElementById("home");
const collection = document.getElementById("collection");
const bookPage = document.getElementById("bookPage");
const cartPage = document.getElementById("cartPage");
const infoPage = document.getElementById("infoPage");

let cart = [];
let currentBook = null;

/* navigation */

function show(page){
pages.forEach(p=>p.classList.remove("active"));
page.classList.add("active");
}

function goHome(){
show(home);
document.getElementById("cartIcon").style.display="none";
}

function goCollection(){
show(collection);
document.getElementById("cartIcon").style.display="flex";
}

function goCart(){
show(cartPage);
displayCart();
}

/* gold light */

document.getElementById("goldLight").onclick = ()=>{
show(collection);
document.getElementById("cartIcon").style.display="flex";
};

/* books */

function openBook(n){

show(bookPage);

const books = [

{
title:"Tome 1",
price:7.50,
img:"https://i.imgur.com/DqsFBQV.jpeg",
desc:"Leo discovers the truth about his destiny.",
allowCart:true
},

{
title:"Tome 2",
price:7.50,
img:"https://i.imgur.com/7cOXoxy.jpeg",
desc:"COMING SOON",
allowCart:false
},

{
title:"Tome 3",
price:7.50,
img:"https://i.imgur.com/ud1FYlH.jpeg",
desc:"COMING SOON",
allowCart:false
}

];

currentBook = books[n-1];

document.getElementById("bookTitle").innerText=currentBook.title;
document.getElementById("bookPrice").innerText="$"+currentBook.price.toFixed(2);
document.getElementById("bookText").innerText=currentBook.desc;
document.getElementById("bookImage").src=currentBook.img;

if(currentBook.allowCart){
document.getElementById("addBookBtn").style.display="inline-block";
document.getElementById("formatSelect").innerHTML="Ebook";
}else{
document.getElementById("addBookBtn").style.display="none";
document.getElementById("formatSelect").innerHTML="COMING SOON";
}

}

/* add cart */

function addBookFromPage(){
cart.push(currentBook);
document.getElementById("cartCount").innerText = cart.length;
alert("Added to cart");
}

/* display cart */

function displayCart(){

let box = document.getElementById("cartItemsPage");
box.innerHTML="";

let total = 0;
let hasTome1 = false;

if(cart.length==0){
box.innerHTML="Cart empty";
document.getElementById("cartTotalPage").innerText="Total: $0.00";
document.getElementById("payhipContainer").innerHTML="";
return;
}

cart.forEach((item,index)=>{

total += item.price;

if(item.title === "Tome 1") hasTome1 = true;

box.innerHTML+=`
<div>
<img src="${item.img}" width="60">
${item.title} - $${item.price.toFixed(2)}
<button onclick="removeItem(${index})">Remove</button>
</div>
`;

});

document.getElementById("cartTotalPage").innerText="Total: $" + total.toFixed(2);

/* PAYHIP */

if(hasTome1){
document.getElementById("payhipContainer").innerHTML=`
<a href="https://payhip.com/b/5VfU8" target="_blank">
<button style="font-size:18px;padding:14px 28px;margin-top:20px">
Pay Now (Tome 1)
</button>
</a>
`;
}else{
document.getElementById("payhipContainer").innerHTML="";
}

}

/* remove */

function removeItem(i){
cart.splice(i,1);
document.getElementById("cartCount").innerText = cart.length;
displayCart();
}

/* info pages */

function openInfo(type){

show(infoPage);

let title="";
let text="";

if(type==="about"){
title="About The Author";
text="The True Heir is a fantasy adventure series created by Damio Mbuyu. The story explores destiny, power and courage through a cinematic universe.";
}

if(type==="contact"){
title="Contact";
text="For business inquiries or support:\nEmail: vanombuyu14@gmail.com";
}

if(type==="privacy"){
title="Privacy Policy";
text="This website does not collect personal data except information required for purchases handled securely by Payhip.";
}

if(type==="terms"){
title="Terms of Service";
text="All content on this website is protected by copyright. Redistribution or resale is prohibited.";
}

document.getElementById("infoTitle").innerText = title;
document.getElementById("infoText").innerText = text;

}
