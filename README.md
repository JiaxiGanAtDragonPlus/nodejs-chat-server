# nodejs-chat-server
1.服务器架构
	n * loginserver + chatserver + webserver
	
	loginserver 负责登录验证，消息转发，维护客户端链接
	chatserver 负责主要的聊天逻辑
	webserver 负责一些http请求，获取一些数据等

客户端git:https://github.com/tency/chat-client.git
客户端体验地址：http://www.tap2joy.com/chat/

2.服务器架设

	安装mongodb,redis,nodejs
	检出代码，在根目录下执行npm install
	进入src目录，
	windows下，执行start.bat启动服务器，执行stop.bat停止服务器，
	linux下执行./manage start|stop|restart|status 分别对于开服，关服，重启，查看服务器状态，
	
3.npm包

	"async": 异步流程控制
    "jest": 单元测试
    "log4js": 日志库
    "md5": 对密码进行加密保存
    "moment": 格式化时间
    "mongodb": 操作mongodb
    "mongoose": 操作mongodb
    "redis": 缓存
    "ws": websocket库，网络连接
	
4.伸缩性

	loginserver多开，分散客户端链接压力
	将http服务剥离出来，分散一些数据获取的功能，也可以考虑多开
	chatserver是唯一不能多开的服务器，暂时不能多开，不过按功能划分出一些微服务，来分散计算压力，比如将字符串匹配做成一个单独的服务器
	
5.负载均衡

	通过随机或其他算法，将客户端分散到不同的loginserver上
	

	