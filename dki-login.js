// ✅ Tạo tài khoản admin mặc định nếu chưa có
(function () {
  const users = JSON.parse(localStorage.getItem("okulaUsers")) || [];
  if (!users.some((u) => u.username === "admin")) {
    users.push({
      username: "admin",
      password: "huyenbach8174",
      role: "admin",
    });
    localStorage.setItem("okulaUsers", JSON.stringify(users));
  }
})();

// ✅ Nếu đã đăng nhập và truy cập login.html → chuyển trang phù hợp
(function () {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedUser && window.location.pathname.includes("login.html")) {
    window.location.href =
      loggedUser.role === "admin" ? "admin.html" : "index.html";
  }
})();

// ✅ Xử lý đăng ký
function handleRegister(e) {
  e.preventDefault();

  const username = document
    .querySelector("input[name='username']")
    .value.trim();
  const email = document.querySelector("input[name='email']").value.trim();
  const password = document.querySelector("input[name='password']").value;
  const confirmPassword = document.querySelector(
    "input[name='confirm_password']"
  ).value;

  if (!username || !email || !password || !confirmPassword) {
    alert("❗ Vui lòng điền đầy đủ thông tin.");
    return;
  }

  if (password.length < 6) {
    alert("❌ Mật khẩu phải có ít nhất 6 ký tự.");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Mật khẩu xác nhận không khớp.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("okulaUsers")) || [];
  if (users.some((u) => u.username === username)) {
    alert("⚠️ Tên đăng nhập đã tồn tại!");
    return;
  }

  users.push({ username, email, password, role: "user" });
  localStorage.setItem("okulaUsers", JSON.stringify(users));
  alert("✅ Đăng ký thành công! Mời bạn đăng nhập.");
  window.location.href = "login.html";
}

// ✅ Xử lý đăng nhập
function handleLogin(e) {
  e.preventDefault();
  const username = document
    .querySelector("input[name='username']")
    .value.trim();
  const password = document.querySelector("input[name='password']").value;

  const users = JSON.parse(localStorage.getItem("okulaUsers")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    alert("❌ Sai tên đăng nhập hoặc mật khẩu.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  alert("✅ Đăng nhập thành công!");
  window.location.href = user.role === "admin" ? "admin.html" : "index.html";
}

// ✅ Cập nhật nút Đăng nhập thành Đăng xuất nếu đã đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  const loginMenu = document.querySelector(".menu-item-login");
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedUser && loginMenu) {
    loginMenu.textContent = "Đăng Xuất";
    loginMenu.href = "#";
    loginMenu.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        localStorage.removeItem("loggedInUser");
        alert("✅ Bạn đã đăng xuất.");
        window.location.href = "login.html";
      }
    });
  }

  const loginForm = document.getElementById("form-login");
  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  const registerForm = document.getElementById("form-register");
  if (registerForm) registerForm.addEventListener("submit", handleRegister);
});

// ✅ Nếu là trang giỏ hàng → yêu cầu đăng nhập
if (window.location.pathname.includes("giohang.html")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("❌ Vui lòng đăng nhập để sử dụng giỏ hàng.");
    window.location.href = "login.html";
  }
}

// ✅ Nếu là trang thanh toán → yêu cầu đăng nhập và xử lý đơn hàng
if (window.location.pathname.includes("thanhtoan.html")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("❌ Vui lòng đăng nhập trước khi thanh toán.");
    window.location.href = "login.html";
  }

  const form = document.getElementById("form-register");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (form) {
    const cartInput = document.createElement("input");
    cartInput.type = "hidden";
    cartInput.name = "cartData";
    cartInput.value = JSON.stringify(cartItems);
    form.appendChild(cartInput);

    const thankYouMsg = document.createElement("p");
    thankYouMsg.id = "thank-you-msg";
    thankYouMsg.style.display = "none";
    thankYouMsg.style.marginTop = "16px";
    thankYouMsg.style.color = "green";
    thankYouMsg.style.fontStyle = "italic";
    thankYouMsg.textContent =
      "🎉 Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ sớm nhất.";
    form.appendChild(thankYouMsg);

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Ngăn reload
      localStorage.removeItem("cart");
      form.reset();
      thankYouMsg.style.display = "block";
    });
  }
}
