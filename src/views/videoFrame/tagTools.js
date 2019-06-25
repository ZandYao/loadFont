export default {
  data() {
    return {
      tool: '',
      mapObj: '',
      mapTool: {},
      // 标注工具选择
      drawTool: {},
      featureLayer: {},
      keyFeature: {},
      // 想预先加载的json数据
      jsonData: {
        'type': 'FeatureCollection',
        'features': []
      }
      // jsonData: {
      //   'type': 'FeatureCollection',
      //   'features': [
      //     {
      //       'type': 'Feature',
      //       'geometry': {
      //         'type': 'Point',
      //         'coordinates': [
      //           1017.8061523437498,
      //           1019.015625
      //         ]
      //       },
      //       'properties': {
      //         'uuid': '12124542ewrwefsfre',
      //         'test': 1,
      //         'num': 12
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geometry': {
      //         'type': 'ExtentPolygon',
      //         'coordinates': [
      //           [2.75, 9],
      //           [166.75, 9],
      //           [166.75, 161],
      //           [2.75, 161],
      //           [2.75, 9]
      //         ]
      //       },
      //       'properties': {}
      //     }
      //   ]
      // }
    }
  },
  methods: {
    getJson() {
      let features = this.featureLayer.features
      let result = window.Datatang.GeoJSON.write(features)
      this.jsonData = result
      // console.log(JSON.stringify(result))
    },
    // 绘图
    async videoFrameInit(indexInfo) {
      // 画图前先清理用于描绘的canvas
      this.clearCanvas()
      // 示例：回车键结束绘制
      let finishCondition = function (event) {
        event.preventDefault()
        return event.keyCode === 13
      }
      // 示例：ESC键撤销上一步绘制
      let undoCondition = function (event) {
        return event.keyCode === 27 || event.keyCode === 46
      }
      var select = new window.Datatang.Select()

      var modifyTool = new window.Datatang.Modify()

      // add select-end event linstener
      select.addEventListener(window.Datatang.SelectEvent.EventType.SELECT, function (event) {
        modifyTool.features = event.selectedFeatures
      })
      // 预先设置的图形的json数据
      // console.log(this.jsonData)
      let featuresJson = window.Datatang.GeoJSON.read(this.jsonData)
      // let point = new window.Datatang.Point(100, 100)
      // let features = [new window.Datatang.Feature(point)]
      // 预先设置所需要自动描绘的图例
      this.featureLayer = new window.Datatang.FeatureLayer()
      // 将json数据渲染到图层
      this.featureLayer.addFeatures(featuresJson)
      //初始化map并渲染image
      let mapextent = [0, 0, indexInfo['imageWidth'], indexInfo['imageHeight']]
      this.mapTool = new window.Datatang.Map({
        layers: [
          new window.Datatang.SingleImageLayer({
            url: this.imageBase64,
            imageExtent: mapextent,
            projection: {
              extent: mapextent
            }
          }),
          this.featureLayer
        ],
        target: 'map',
        view: new window.Datatang.View({
          projection: {
            extent: mapextent
          },
          center: window.Datatang.ExtentUtil.getCenter(mapextent),
          zoom: 2,
          maxZoom: 8
        })
      })
      // 初始化绘图工具
      var draw = new window.Datatang.Draw({
        type: 'undefined',
        drawLayer: this.featureLayer,
        finishCondition: finishCondition,
        undoCondition: undoCondition
      })
      // 绘图工具选择
      this.mapTool.addComponents(draw)
      this.mapTool.addComponents(modifyTool)
      this.mapTool.addComponents(select)
      let tool = this.$refs.drawUL
      tool.addEventListener('click', (e) => {
        let value = e.target.attributes['value'].value || undefined
        draw.drawMode = value
      })
      draw.addEventListener(window.Datatang.DrawEvent.EventType.DRAW_END, function (e) {
        var feature = e.feature
        feature.displayText = '测试测试'
        select.active = true
        // draw.active = false
        // modifyTool.active = true
      })
    }
  }
}
