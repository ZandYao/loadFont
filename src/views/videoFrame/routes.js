export default [
  {
    name: 'videoFrame',
    path: '/videoFrame',
    component: () => import(/* webpackChunkName: "tags/taskList" */ '@/views/videoFrame/VideoFrame.vue'),
    meta: {
      title: '视频帧标注-项目管理-TECnet数据标注平台',
      permit: []
    }
  }
]
