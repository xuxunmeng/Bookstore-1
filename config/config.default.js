module.exports = appInfo => {
  const config = {}

  const DEFAULT_ROOT_ADMIN_PASSWORD = 'admin'
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_${process.env.COOKIE_KEYS}`
  config.root = {
    password: process.env.ROOT_ADMIN_PASSWORD || DEFAULT_ROOT_ADMIN_PASSWORD,
  }

  // add your config here
  config.middleware = [
    'loginCheck',
    'errorHandler',
    'saveSession',
    'setCors',
    'payloadHandler',
  ]
  config.setCors = {
    match: '/open',
  }
  config.loginCheck = {
    ignore: '/open',
  }
  // qiniu CND keys
  config.cdn = {
    QINIU_ACCESS_KEY: 'rMuPOEhqC8_B3yxqsNfNG1ho75YecTa4MdR3J-nY',
    QINIU_SECRET_KEY: 'Pz2yOnEO4kofFcjWq8Kx4FoeWh_IpHnidTXaf6pz',
    BUCKET: 'bookstore-dev',
  }
  // 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
  }

  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  }

  // redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || '',
      db: '0',
    },
    app: true,
  }

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      // password: process.env.MYSQL_PASSWORD,
      password: '12345678',
      // 数据库名
      database: 'BOOKSTORE',
    },
    app: true,
    agent: false,
  }

  config.security = {
    xframe: {
      value: `XFRAME_${process.env.XFRAME_VALUE}`,
    },
  }

  config.bookAPI = {
    url: 'http://xhapi.zxhsd.com/services/xinhuawebservice?wsdl',
    buyUrl: 'http://wap.zxhsd.com/index/item.shtml',
    khid: 'zhihuishucheng',
    keyid: '355DBBC50859340E72B9C8E5AB2DBB74',
  }

  config.bookAPIByZhongjin = {
    url: 'http://apis.centrin-ecloud.com',
    appKey: '25361443',
    appSecret: '80c4625784e91ff9c9d30d6401e06081',
    appId: '7653878',
  }

  config.bookAPIByLiuzhou = {
    url: 'http://cw.gxxhsd.com/Commander/api/Executive',
    // url: 'http://113.12.201.173:8087/Commander/api/Executive',
  }

  config.webpack = {
    staticUrl: 'https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/assets', // 阿里云CDN服务器
    startWebpackServer: false, // 是否开启webpack静态服务器
  }
  return config
}
