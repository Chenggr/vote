// 异步加载路由

// const boot = resolve => require(['../views/boot/boot'], resolve)
const evaluation = resolve => require(['../views/evaluation/evaluation'], resolve)
const login = resolve => require(['../views/login/login'], resolve)

export default [

  {
    path: '/evaluation',
    name: 'evaluation',
    component: evaluation,
    meta: {
      title: '民主测评'
    }
  },
  // {
  //   path: '/boot',
  //   name: 'boot',
  //   component: boot,
  //   meta: {
  //     title: '民主推荐'
  //   }
  // },
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      title: 'login'
    }
  }
]
