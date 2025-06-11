// Lấy các phần tử HTML cần dùng để hiển thị giỏ hàng
const cartItems = document.getElementById("cart-items"); // Danh sách sản phẩm
const cartTotal = document.getElementById("cart-total"); // Tổng tiền
const soluong = document.getElementById("soluonggiohang"); // Tổng số lượng

// Lấy dữ liệu giỏ hàng từ localStorage (hoặc khởi tạo rỗng)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm hiển thị lại toàn bộ giỏ hàng
function renderCart() {
  if (cartItems) cartItems.innerHTML = "";

  let total = 0;
  let totalQty = 0;

  if (cart.length === 0) {
    if (cartItems) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="5">Giỏ hàng của bạn đang trống.</td>`;
      cartItems.appendChild(tr);
    }
    if (cartTotal) cartTotal.textContent = "";
    if (soluong) soluong.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    totalQty += item.qty;

    if (cartItems && cartItems.tagName === "TBODY") {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>
          <button onclick="changeQty(${index}, -1)">➖</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">➕</button>
        </td>
        <td>${(item.price * item.qty).toLocaleString()}đ</td>
        <td><button onclick="removeItem(${index})">🗑 Xoá</button></td>
      `;
      cartItems.appendChild(row);
    } else if (cartItems) {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong><br>
        Giá: ${item.price.toLocaleString()}đ <br>
        Số lượng: 
        <button onclick="changeQty(${index}, -1)">➖</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">➕</button>
        <button onclick="removeItem(${index})">🗑 Xoá</button><br>
        Thành tiền: ${(item.price * item.qty).toLocaleString()}đ
      `;
      cartItems.appendChild(li);
    }
  });

  if (cartTotal)
    cartTotal.textContent = `Tổng tiền: ${total.toLocaleString()}đ`;
  if (soluong) soluong.textContent = totalQty;
}

// Hàm thay đổi số lượng
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Hàm xoá sản phẩm
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Gọi khi trang tải xong
document.addEventListener("DOMContentLoaded", renderCart);
