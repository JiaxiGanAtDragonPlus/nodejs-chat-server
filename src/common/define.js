// 基础错误码定义
exports.ErrCode = {
    SUCCESS: 1, // 成功
    FAILED: 2, // 失败
    PASSWORDERROR: 3, // 密码错误
    UNKNOWN: 4, // 未知错误
}

// 网络状态码，值域[3000, 5000)
exports.NetStatusCode = {
    HB_TIMEOUT: 3000, // 心跳包超时
    LOGIN_TIMEOUT: 3001, // 登录超时
}

// 消息id定义
exports.MSG_ID = {
    // client to login server
    C2L_USER_LOGIN: '10001', // 登录
    C2L_USER_LOGOUT: '10002', //登出

    // login server to client
    //C2G_REGISTER_CLIENT: '20001',
    //C2G_LOGIN: '20002',

    // login server to chat server
    L2CS_USER_CREATE: "30001",
    L2CS_USER_GET: "30002",
    L2CS_USER_LOGOUT: "30003",

    // chat server to client
    //CS2C_
}