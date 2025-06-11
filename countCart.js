// Gộp tất cả các hàm xử lý giỏ hàng

// ✅ Hàm đếm tổng số lượng sản phẩm trong giỏ hàng
function countCartQty() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ✅ Hàm cập nhật số lượng hiển thị ở biểu tượng giỏ hàng
function updateCartCountDisplay() {
  const qtySpan = document.getElementById("soluonggiohang");
  if (qtySpan) {
    qtySpan.textContent = countCartQty();
  }
}

// ✅ Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountDisplay(); // cập nhật ngay khi thêm
}

// ✅ Khi trang load, luôn cập nhật số giỏ hàng
document.addEventListener("DOMContentLoaded", updateCartCountDisplay);
