export default [
  {
    name: 'randomCode', // 获取验证码
    url: '/user/randomCode',
    methods: ['get']
  },
  {
    name: 'login', // 登陆
    url: '/user/login',
    methods: ['post']
  },
  {
    name: 'regist', //注册
    url: '/api/api/user/regist',
    methods: ['post']
  },
  {
    name: 'userList', //用户列表
    url: '/user/userList',
    methods: ['get']
  },
  {
    name: 'checkValidateCode', // 校验验证码
    url: '/uaa/checkImageCode',
    methods: ['get']
  },
  {
    name: 'userInfo', // 用户信息
    url: '/uaa/userinfo',
    methods: ['get']
  }
]
