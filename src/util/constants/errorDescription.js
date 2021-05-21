exports = {
	ID_NOT_VALID: 1, // id người dùng không hợp lệ : người dùng chuyển vào 1 id không phải là số
	SIGNED_IN: 2,// người dùng đã đăng nhập
	NOT_SIGNED_IN: 3,// người dùng chưa đăng nhập
	NOT_AUTHORIZATED: 4, // Người dùng không có quyền thực hiện thao tác này
	NO_DATA: 5, // Dữ liệu mà bạn đang tìm không tồn tại
	TOKEN_KHONG_HOP_LE: 6, // Token gửi từ client lên không hợp liệu
	TOKEN_HET_HAN: 7, // Token gửi lên đã hết hạn, cần phải đăng nhập lại
	EMAIL_NOT_VALID: 8, // Email người dùng nhập vào không hợp lệ
	EXIST: 9, // Đã tồn tại
	NOT_ACTIVE: 10, // Tài khoản người dùng 
	ACTIVED: 11, // Tài khoản đã được kích hoạt
	NOT_VALID_INFO: 12, // Thông tin tài khoản không chính xác
};
