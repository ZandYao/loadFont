
export default [{
  path: '/VideoFrameTag',
  name: 'VideoFrameTag',
  component: () => import(/* webpackChunkName: "tec/algorithmAdd" */ '@/views/tag/VideoFrameTag.vue'),
  meta: {
    permit: [],
    title: '新增算法-算法管理-配置管理-TECnet算法评测平台'
  }
}]
