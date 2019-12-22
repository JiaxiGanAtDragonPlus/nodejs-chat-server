const mongoose = require("mongoose");

// the name of schema must be Schema
const Schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    openid: String,
    loginIp: String, // 上次登录ip

    username: String, // 昵称
    gender: String, // 性别
    avatar: String, // 头像
    sign: String, // 签名

    // 好友列表,uid
    friends: []
}, {
    timestamps: true
});

module.exports = Schema;