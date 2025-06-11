function capNhatSoLuongGioHang(soLuongSanPham) {
  const spanSoLuong = document.getElementById("soluonggiohang");
  if (soLuongSanPham > 0) {
    spanSoLuong.textContent = soLuongSanPham;
    spanSoLuong.style.display = "inline-block"; // hiển thị số
  } else {
    spanSoLuong.style.display = "none"; // ẩn số nếu không có sản phẩm
  }
}

// Ví dụ cập nhật số lượng:
capNhatSoLuongGioHang(9);
