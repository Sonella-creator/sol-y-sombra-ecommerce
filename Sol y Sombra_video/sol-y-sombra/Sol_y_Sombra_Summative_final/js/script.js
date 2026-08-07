/* ============================================================
   SOL & SOMBRA — script.js  (minimal version)
   JavaScript is used ONLY where the page must change after
   loading: the shopping basket, category filters, the contact
   form validation and the mobile menu. All product cards are
   plain HTML — this script reads their data-* attributes, so
   there is no product list duplicated in JavaScript.
   ============================================================ */

"use strict";

var CART_KEY = "solYSombraCart";

/* ---------- Basket storage (localStorage keeps the basket
              while the visitor moves between pages) ---------- */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  var badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }
}

/* ---------- Add to basket ----------
   One listener on the whole document (event delegation).
   The product details come from the button's data-* attributes,
   so adding a new product only requires editing the HTML.     */
document.addEventListener("click", function (event) {
  var btn = event.target.closest(".add-btn");
  if (!btn) { return; }

  var cart = getCart();
  var item = cart.find(function (i) { return i.id === btn.dataset.id; });

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      img: btn.dataset.img,
      qty: 1
    });
  }
  saveCart(cart);

  btn.textContent = "Added \u2713";
  setTimeout(function () { btn.textContent = "Add to basket"; }, 1200);
});

/* ---------- Category filters (products page) ----------
   The buttons and cards already exist in the HTML; this only
   shows and hides cards by comparing data-category.           */
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    document.querySelectorAll(".product-card").forEach(function (card) {
      var show = btn.dataset.filter === "All" || card.dataset.category === btn.dataset.filter;
      card.style.display = show ? "" : "none";
    });
  });
});

/* ---------- Basket page ----------
   The only part of the site that MUST be built by JavaScript,
   because its contents depend on what the visitor added.      */
function renderCart() {
  var root = document.getElementById("cart-root");
  if (!root) { return; }

  var cart = getCart();

  if (cart.length === 0) {
    root.innerHTML =
      '<div class="empty-state">' +
      '<p>Your basket is empty. The sun is out \u2014 go and find a pair.</p>' +
      '<a href="products.html" class="btn btn-primary">Browse sunglasses</a>' +
      '</div>';
    return;
  }

  var total = 0;
  var rows = cart.map(function (item) {
    var subtotal = item.price * item.qty;
    total += subtotal;
    return (
      '<tr>' +
      '<td><img src="' + item.img + '" alt="' + item.name + '"></td>' +
      '<td>' + item.name + '</td>' +
      '<td>\u20AC' + item.price.toFixed(2) + '</td>' +
      '<td><div class="qty-controls">' +
      '<button type="button" data-action="minus" data-id="' + item.id + '" aria-label="Decrease quantity of ' + item.name + '">\u2212</button>' +
      '<span>' + item.qty + '</span>' +
      '<button type="button" data-action="plus" data-id="' + item.id + '" aria-label="Increase quantity of ' + item.name + '">+</button>' +
      '</div></td>' +
      '<td>\u20AC' + subtotal.toFixed(2) + '</td>' +
      '<td><button type="button" class="btn btn-danger" data-action="remove" data-id="' + item.id + '">Remove</button></td>' +
      '</tr>'
    );
  }).join("");

  root.innerHTML =
    '<table class="cart-table">' +
    '<thead><tr><th scope="col">Item</th><th scope="col">Name</th><th scope="col">Price</th>' +
    '<th scope="col">Quantity</th><th scope="col">Subtotal</th><th scope="col"></th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>' +
    '<div class="cart-summary"><p>Total</p>' +
    '<p id="cart-total">\u20AC' + total.toFixed(2) + '</p>' +
    '<button type="button" class="btn btn-ghost" data-action="clear">Empty basket</button></div>';
}

/* One listener handles +, minus, remove and clear on the basket page */
document.addEventListener("click", function (event) {
  var btn = event.target.closest("[data-action]");
  if (!btn) { return; }

  var cart = getCart();

  if (btn.dataset.action === "clear") {
    cart = [];
  } else {
    var item = cart.find(function (i) { return i.id === btn.dataset.id; });
    if (!item) { return; }
    if (btn.dataset.action === "plus") { item.qty += 1; }
    if (btn.dataset.action === "minus") { item.qty -= 1; }
    if (btn.dataset.action === "remove" || item.qty <= 0) {
      cart = cart.filter(function (i) { return i.id !== btn.dataset.id; });
    }
  }

  saveCart(cart);
  renderCart();
});

/* ---------- Contact form validation ---------- */
var form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var message = document.getElementById("message");
    var valid = true;

    function check(field, ok, msg) {
      document.getElementById(field.id + "-error").textContent = ok ? "" : msg;
      if (!ok) { valid = false; }
    }

    check(name, name.value.trim().length >= 2, "Please enter your name (at least 2 characters).");
    check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Please enter a valid email address, e.g. name@example.com.");
    check(message, message.value.trim().length >= 10, "Please write a message of at least 10 characters.");

    var success = document.getElementById("form-success");
    success.hidden = !valid;
    if (valid) { form.reset(); }
  });
}

/* ---------- Mobile menu ---------- */
var toggle = document.getElementById("menu-toggle");
if (toggle) {
  toggle.addEventListener("click", function () {
    var open = document.getElementById("main-nav").classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Run on page load ---------- */
saveCart(getCart());   /* refreshes the badge in the header */
renderCart();          /* builds the basket page, if we are on it */
