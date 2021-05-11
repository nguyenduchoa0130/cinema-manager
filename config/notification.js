function Noti(isSuccess = true, status, msg, data = null) {
    this.isSucess = isSuccess;
    this.status = status;
    this.msg = msg;
    this.data = data;
}
module.exports = {
    signals: {
        SUCCESSFULL: 'Successful',
        FAILED: 'Failed',
    },
    Noti,
};
