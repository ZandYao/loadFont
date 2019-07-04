export default [
  {
    name: 'videoFrame',
    path: '/videoFrame',
    component: () => import(/* webpackChunkName: "tags/taskList" */ '@/views/videoFrame/VideoFrame.vue'),
    meta: {
      title: '个人项目- canvas绘制',
      permit: []
    }
  }
]
