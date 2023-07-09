let itemList = {
    132541: {
        name: "Fall Limited Edition Sneakers",
        newPrice: 125,
        oldPrice: 250
    }
}

let itemId = {
    "Fall Limited Edition Sneakers": 132541
}

const refreshCart = () => {
    $("#picked-items").html("");
    let parsed = new Set(cart.items);
    if (cart.items.length > 0) {
        parsed.forEach(elem => {
            let itemName = itemList[elem].name;
            let itemPrice = parseFloat(itemList[elem].newPrice).toFixed(2);
            let itemAmount = cart.items.filter(x => x == elem).length;
            let sumPrice = parseFloat(itemPrice * itemAmount).toFixed(2);
            $("#picked-items").append(`<div class="d-flex align-items-center">
        <img src="./images/image-product-1-thumbnail.jpg" alt="thumb" height="50px">
        <div>
          <p>${itemName}</p>
          <p>$${itemPrice} * ${itemAmount} <span>$${sumPrice}</span></p>
        </div>
        <button class="btn" data-func="cart-rem"><img src="./images/icon-delete.svg" alt="remove"></button>
      </div>`)
        });
        $("#item-cart-counter").text(cart.items.length).css("display", "inline-block");
        $("#picked-items > div > button").on("click", function() {
            cart.remove($(this).siblings("div").children("p:first-of-type()").text());
        })
        $("#checkout-btn").prop("disabled", false);
    } else {
        $("#checkout-btn").prop("disabled", true);
        $("#item-cart-counter").text(cart.items.length).css("display", "none");
        $("#picked-items").append("<p>").text("Cart is empty").addClass("text-center")
    }
}

let images = {
    cur: 1,
    thumbs: {
        1: "./images/image-product-1-thumbnail.jpg",
        2: "./images/image-product-2-thumbnail.jpg",
        3: "./images/image-product-3-thumbnail.jpg",
        4: "./images/image-product-4-thumbnail.jpg"
    },
    full: {
        1: "./images/image-product-1.jpg",
        2: "./images/image-product-2.jpg",
        3: "./images/image-product-3.jpg",
        4: "./images/image-product-4.jpg"
    },

    placeFull: async function (index, dir) {
        if (dir.attr("src") != images.full[index]) {
            let prom = new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.classList.add("bluring", "main-photo");
                img.src = images.full[index];
            })
            let result = await prom;
            dir.addClass("bluring");
            setTimeout(() => {
                dir.after(result);
                dir.remove();
                $("#main-cont .main-photo").on("click", function() {
                    $("#full-screen").css("display", "grid")
                })
                setTimeout(() => {
                    dir.removeClass("bluring");
                }, 100)
            }, 100);
            images.cur = index;
        }
    }
}




$('#main-cont input[name="photo-carousel"]').on("click", function () {
    images.placeFull($(this).index(), $(".main-photo"));
})
$('#full-screen input[name="photo-carousel"]').on("click", function () {
    images.placeFull($(this).index() - 3, $("#full-screen .main-photo"));
})

$("#main-cont .main-photo").on("click", function() {
    $("#full-screen").css("display", "grid")
})


// Carousel from last and first images
$("#btn-next").on("click", function() {
    if(images.cur < 4) {
        images.cur += 1
    } else if (images.cur = 4) {
        images.cur = 1;
    }
    images.placeFull(images.cur, $("#full-screen .main-photo"))
})
$("#btn-prev").on("click", function() {
    if(images.cur > 1) {
        images.cur -= 1
    } else if (images.cur = 1) {
        images.cur = 4;
    }
    images.placeFull(images.cur, $("#full-screen .main-photo"))
})


// close fullscreen
$("#close-full").on("click", function() {
    $("#full-screen").css("display", "none");
})

// object for controlling cart
var cur_Product = "Fall Limited Edition Sneakers";
var pro_Amount = 1;
const cart = {
    add: (amount) => {
        for(let i = 0; i < amount; i++) {
        cart.items.push(itemId[cur_Product]);
        $("#item-amount").text(cart.items.filter(x => x == itemId[cur_Product]).length);
        }
        refreshCart();
    },
    remove: (item) => {
        if (cart.items.filter(x => x == itemId[item]).length > 0) {
            cart.items.splice(cart.items.indexOf(itemId[item]), 1)
            $("#item-amount").text(cart.items.filter(x => x == itemId[item]).length);
            refreshCart();
        }
    },
    items: []
}


// Add amount
$("#item-plus").on("click", () => {
    pro_Amount += 1;
    $("#item-amount").text(pro_Amount)
})
// minus amount
$("#item-minus").on("click", () => {
    if(pro_Amount > 1) {
    pro_Amount -= 1;
    $("#item-amount").text(pro_Amount)
    }
})
// Add item to cart
$("#add-btn").on("click", () => {
    cart.add(pro_Amount);
})


// Mobile menu
let opened = false;
$("#menu-btn").on("click", function() {
    if (opened) {
        $(this).children("img").attr("src", "./images/icon-menu.svg")
        $("#nav-menu").css("display", "none");
        $("body").css("overflow", "auto")
        opened = false;
    } else {
        $("body").css("overflow", "hidden")
        $(this).children("img").attr("src", "./images/icon-close.svg")
        $("#nav-menu").css("display", "flex");
        opened = true;
    }
})


window.addEventListener("resize", function() {
    if (window.innerWidth > 800) {
        $("#nav-menu").css("display","flex")
    } else {
        $("#nav-menu").css("display","none")
    }
})
window.addEventListener("load", function() {
    if (window.innerWidth > 800) {
        $("#nav-menu").css("display","flex")
    } else {
        $("#nav-menu").css("display","none")
    }
})