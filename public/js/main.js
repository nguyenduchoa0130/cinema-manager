$(document).ready(function () {});
function sendOTP(mail) {
    $.ajax({
        type: 'POST',
        url: '/api/v1/auth/otp',
        data: {
            mail,
        },
        dataType: 'json',
		//TODO In ra thông báo
        success: function (response) {
			// Xử lý nếu gửi thành công 
		},
		fail: function(xhr, status, err){
			// Nếu gửi nếu gửi thất bại 
		}
    });
}
