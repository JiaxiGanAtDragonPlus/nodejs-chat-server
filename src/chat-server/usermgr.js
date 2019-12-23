'use strict';

const User = require("./user");
const ErrCode = require("../common/define").ErrCode;
const MSG_ID = require("../common/define").MSG_ID;

const log = logger.getLogger("usermgr");

// 用户管理器
class UserMgr {
    constructor() {
        log.debug("user mgr constructor");
        this.userList = {};
    }

    init() {
        log.debug("user mgr init");
    }

    onTick() {
        for (let id in this.userList) {
            this.userList[id].onTick();
        }
    }

    getUser(id) {
        return this.userList[id];
    }

    createUser(initData, loginId) {
        let newUser = new User();
        newUser.initWithData(initData, loginId);
        newUser.onCreate();
        this.userList[initData.id] = newUser;

        // 添加到系统群组
        groupMgr.addMember(1, initData.id);
    }

    // 从数据库数据构造用户
    loadUser(userData, loginId, callback) {
        let newUser = new User();
        newUser.initWithData(userData, loginId);
        newUser.onCreate();
        this.userList[userData.id] = newUser;
        callback && callback(newUser);

        // 添加到系统群组
        groupMgr.addMember(1, userData.id);
    }

    removeUser(id) {
        if (this.userList[id]) {
            this.userList[id].onRemove();
            //delete this.userList[id];
            // 下线时不立即移除，半小时内没登录就移除
        }
    }

    // 修改昵称
    handleModifyNick(conID, data, callback) {
        let user = this.getUser(data.id);
        if (!user) {
            log.error("can't find user, id = %s", data.id);
            callback && callback(ErrCode.FAIL);
            return;
        }

        user.setNick(data.nick);
        callback && callback(ErrCode.SUCCESS, user.getNick());
    }

    // 修改头像
    handleModifyAvatar(conID, data, callback) {
        let user = this.getUser(data.id);
        if (!user) {
            log.error("can't find user, id = %s", data.id);
            callback && callback(ErrCode.FAIL);
            return;
        }

        user.setAvatar(data.avatar);
        callback && callback(ErrCode.SUCCESS, user.getAvatar());
    }

    handleModifySign(conID, data, callback) {
        let user = this.getUser(data.id);
        if (!user) {
            log.error("can't find user, id = %s", data.id);
            callback && callback(ErrCode.FAIL);
            return;
        }

        user.setSign(data.sign);
        callback && callback(ErrCode.SUCCESS, user.getSign());
    }

    handleAddFriend(conID, data, callback) {
        log.debug("call handleAddFriend");
        log.debug(data);
        let targetUser = this.getUser(data.targetId);
        if (!targetUser) {
            log.warn("target user is offline, cannt add friend!");
            callback && callback(ErrCode.FAIL);
            return;
        }

        let user = this.getUser(data.myId);
        if (user) {
            user.addFriend(data.targetId, (friendInfo) => {
                callback && callback(ErrCode.SUCCESS, friendInfo);

                // 对方也加上好友
                targetUser.addFriend(data.myId, (friendInfo) => {
                    // 通知被加好友的用户
                    let notifyData = {};
                    notifyData.id = data.targetId;
                    notifyData.newFriend = friendInfo;
                    network.messageLogin(targetUser.getLoginID(), MSG_ID.CS2L_ADD_FRIEND, notifyData);
                });

            })
        } else {
            callback && callback(ErrCode.FAIL);
        }
    }
}

let userMgr = global.userMgr || new UserMgr();
module.exports = userMgr;