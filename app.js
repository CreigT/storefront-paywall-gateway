function money() {
  return window.STORE || {};
}

function fillText() {
  const s = money();
  document.querySelectorAll("[data-brand]").forEach((el) => { el.textContent = s.brand || "Shop"; });
  document.querySelectorAll("[data-product]").forEach((el) => { el.textContent = s.productName || "Product"; });
  document.querySelectorAll("[data-price]").forEach((el) => { el.textContent = s.priceLabel || ""; });
  document.querySelectorAll("[data-summary]").forEach((el) => { el.textContent = s.productSummary || ""; });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = s.supportEmail || "";
    if (el.tagName === "A") el.href = "mailto:" + (s.supportEmail || "");
  });
  document.querySelectorAll("[data-refund]").forEach((el) => { el.textContent = String(s.refundDays || 14); });
  document.querySelectorAll("[data-owner]").forEach((el) => { el.textContent = s.ownerName || ""; });
  document.querySelectorAll("[data-tagline]").forEach((el) => { el.textContent = s.tagline || ""; });
  document.title = (s.brand || "Shop") + " — " + (s.productName || "Store");
}

function fillList(selector, items) {
  const node = document.querySelector(selector);
  if (!node || !items) return;
  node.innerHTML = items.map((item) => "<li>" + item + "</li>").join("");
}

function paywallButton(selector) {
  const s = money();
  const node = document.querySelector(selector);
  if (!node) return;
  const link = (s.stripePaymentLink || "").trim();
  if (!link) {
    node.textContent = "Add a payment link in config.js";
    node.classList.add("disabled");
    node.removeAttribute("href");
    const note = document.querySelector("[data-pay-note]");
    if (note) note.hidden = false;
    return;
  }
  const join = link.includes("?") ? "&" : "?";
  node.href = link + join + "prefilled_email=&client_reference_id=storefront";
  node.textContent = "Pay " + (s.priceLabel || "") + " and unlock";
}

function gateMembers() {
  const box = document.querySelector("[data-members]");
  if (!box) return;
  const params = new URLSearchParams(window.location.search);
  const paid = params.get("paid") === "1" || sessionStorage.getItem("nl_paid") === "1";
  if (params.get("paid") === "1") sessionStorage.setItem("nl_paid", "1");
  if (!paid) {
    box.hidden = true;
    const wall = document.querySelector("[data-wall]");
    if (wall) wall.hidden = false;
    return;
  }
  box.hidden = false;
  const wall = document.querySelector("[data-wall]");
  if (wall) wall.hidden = true;
}

document.addEventListener("DOMContentLoaded", () => {
  fillText();
  const s = money();
  fillList("[data-includes]", s.includes);
  fillList("[data-sample]", s.sample);
  paywallButton("[data-pay]");
  gateMembers();
});
