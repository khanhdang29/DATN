//tạo secret ngẫu nhiên và lưu vào file .env
// Import module 'fs' để thao tác với file system
const fs = require("fs");
// Import module 'crypto' để tạo dữ liệu ngẫu nhiên bảo mật
const crypto = require("crypto");

// Tạo secret ngẫu nhiên 64 byte, chuyển sang chuỗi hex (128 ký tự)
const secret = crypto.randomBytes(64).toString("hex");

// Đặt tên file .env
const envFile = ".env";

// Khởi tạo biến chứa nội dung file .env
let envContent = "";

// Kiểm tra xem file .env có tồn tại không
if (fs.existsSync(envFile)) {
  // Nếu tồn tại, đọc nội dung file
  envContent = fs.readFileSync(envFile, "utf8");

  // Kiểm tra xem đã có dòng SESSION_SECRET trong file chưa
  if (/^SESSION_SECRET=.*/m.test(envContent)) {
    // Nếu có rồi, thay thế bằng secret mới
    envContent = envContent.replace(/^SESSION_SECRET=.*/m, `SESSION_SECRET=${secret}`);
  } else {
    // Nếu chưa có, thêm dòng SESSION_SECRET mới vào cuối file
    envContent += `\nSESSION_SECRET=${secret}`;
  }
} else {
  // Nếu file .env chưa tồn tại, tạo mới với secret
  envContent = `SESSION_SECRET=${secret}`;
}

// Ghi nội dung đã cập nhật trở lại file .env
fs.writeFileSync(envFile, envContent, "utf8");

// In thông báo ra console để biết đã tạo thành công
console.log("✅ SESSION_SECRET generated and saved to .env");
// In luôn giá trị secret mới tạo (nếu cần copy)
console.log("👉", secret);

