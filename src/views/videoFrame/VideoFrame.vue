<template>
  <div class="tagMarkVideoFrame">
    <header class="tagMark-header">
      <span>图片标注</span>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <main>
      <div class="tagMark-main-header">
        <div class="el-col-first">当前帧号: <span style="color: red;">{{videoFrame}}</span><span
            id="measureDiv"
            name="measureDiv"
            style="margin-left:20px;color: #00ff00;"
          >&nbsp;</span></div>

        <div
          id="base-tool"
          class="base-tool"
        >
          <div class="btn-group">
            <a
              class="icon"
              href="javascript:;"
              id="hideFeatureBtn"
            >
              <span class="glyphicon icon-show"></span><label>隐藏图形</label>
            </a>
            <a
              class="icon"
              href="javascript:;"
              id="hideLabelBtn"
            >
              <span class="glyphicon icon-show"></span><label>隐藏标签</label>
            </a>
            <a
              class="icon"
              href="javascript:;"
              id="hidePictureBtn"
              style="display: none;"
            >
              <span class="glyphicon icon-reference"></span><label>显示参考图</label>
            </a>
            <a
              class="icon"
              href="javascript:;"
              id="clearBtn"
              name="clear"
            ><span class="glyphicon icon-clear"></span> 清空</a>
            <a
              class="icon"
              disabled
              href="javascript:;"
              id="btnSave"
            ><span class="glyphicon icon-save"></span> 保存</a>
          </div>
        </div>
      </div>

      <div class="tagMark-main-content">
        <div id="drawTool">
          <div
            id="drawUL"
            ref='drawUL'
            class="btn-group draw-tool"
          >
            <a
              href="javascript:;"
              id="btnNone"
              value="None"
              name="defaultselect"
            ><span class="glyphicon icon-select">选择</span></a>
            <a
              href="javascript:;"
              id="btnPoint"
              value="Point"
              name="point"
            >点</a>
            <a
              href="javascript:;"
              id="btnLine"
              value="Line"
              name="line"
            >线</a>
            <a
              href="javascript:;"
              id="btnExtent"
              value="Extent"
              name="extent"
            >矩形</a>
            <a
              href="javascript:;"
              id="btnPolygon"
              value="Polygon"
              name="polygon"
            >多边形 </a>
          </div>
        </div>
        <div
          id="map"
          style="width:100%;height:100%;background:#3b3939"
        >
          <video
            id="videoPlay"
            controls
            src="/static/video.mp4"
          ></video>
          <!-- <canvas
            id="myCanvas"
            tabindex="1"
            width="1000"
            height="450"
          >您的浏览器版本过低</canvas> -->
        </div>
      </div>
      <div style="width:100%;height:40px;">
        <el-button
          @click="play"
          type="primary"
        >播放</el-button>
        <el-button
          @click="pause"
          type="primary"
        >生成帧图片</el-button>
        <el-button
          @click="seekForward"
          type="primary"
        >下一帧</el-button>
        <el-button
          type="primary"
          @click="seekBackward"
        >前一帧</el-button>
        <el-button
          type="primary"
          @click="getJson"
        >获取画图json数据</el-button>
      </div>
      <div
        id="staticDiv"
        class="draw-count tagMark-main-footer"
      >
        <p
          class="item"
          id="staticDiv_total"
        >
          <span class="key">图形总数：</span>
          <span class="value"></span>
        </p>
        <p
          class="item"
          id="staticDiv_point_total"
        >
          <span class="key">点总数：</span>
          <span class="value"></span>
        </p>
        <p
          class="item"
          id="staticDiv_extent_total"
        >
          <span class="key">矩形总数：</span>
          <span class="value"></span>
        </p>
        <p
          class="item"
          id="staticDiv_square_total"
        >
          <span class="key">正方形总数：</span>
          <span class="value"></span>
        </p>
        <p
          class="item"
          id="staticDiv_line_total"
        >
          <span class="key">线总数：</span>
          <span class="value"></span>
        </p>
        <p
          class="item"
          id="staticDiv_polygon_total"
        >
          <span class="key">多边形总数：</span>
          <span class="value"></span>
        </p>
      </div>
      <div class="tagMark-main-tagDetail">
        <div
          id="drawnavDiv"
          class="draw-nav"
        >
          <ul class="clearfix"></ul>
        </div>
        <div
          id="J_mark_form"
          class="draw-form"
        >
          <div class="form-header">
            <span
              id="J_form_cancel"
              class="close"
            >×</span>
          </div>
          <div
            id="J_mark_form_body"
            class="form-body"
          >
            <div id="J_attribute"></div>
            <div id="J_quality"></div>
          </div>
          <div class="form-action">
            <button
              type="button"
              id="J_form_submit"
              class="btn btn-query"
            >确定</button>
            <button
              type="button"
              id="J_form_delete"
              class="btn btn-default"
            >删除图形</button>
          </div>
        </div>
        <!--有效/无效表单 -->
        <div
          id="J_Effective_form"
          class="effective-form"
        >
          <div class="form-group">
            <span>表单有效性：</span>
            <el-radio
              id="effective"
              v-model="radio"
              label="1"
            >有效</el-radio>
            <el-radio
              v-model="radio"
              label="2"
              id="ineffective"
            >无效</el-radio>
          </div>
        </div>
        <div
          id="J_MarkData_form"
          style="text-align: left;margin: 20px 20px;"
        ></div>
        <div
          :span="12"
          class="hrline"
          style="margin-top:20px;"
          id="audithrDiv"
        ></div>
        <div
          id="J_AuditData_form"
          style="text-align: left;margin: 20px 20px;"
        >

        </div>
        <div
          :span="12"
          class="hrline"
          style="margin-top:20px;"
        ></div>
      </div>
    </main>
    <footer>
      <el-button
        type="primary"
        @click='submit'
      >提交</el-button>
    </footer>
  </div>
</template>
<script>
import tagTools from '@/views/videoFrame/tagTools.js'
import { debounce } from 'lodash'
export default {
  mixins: [tagTools],
  data() {
    return {
      canvas: {},
      map: {},
      playInterval: {},
      auditStatus: 1,
      orgidFlag: 1,
      groupLeaderFlag: true,
      taskName: '222',
      creatorFullName: '11',
      createTime: '22',
      status: 1,
      picTagType: 1,
      modifierFullName: '11',
      modifyTime: '11',
      auditorFullName: '11',
      auditTime: '11',
      hasTagForm: 1,
      radio: 1,
      //控制视频帧
      videoObj: {},
      FrameRates: {
        film: 25,
        NTSC: 29.97,
        NTSC_Film: 23.98,
        NTSC_HD: 59.94,
        PAL: 25,
        PAL_HD: 50,
        web: 30,
        high: 60
      },
      // 当前帧号
      videoFrame: 0,
      url: {}
    }
  },
  methods: {
    play() {
      var v = document.getElementById('videoPlay')
      v.play()
      // let that = this
      // if (this.playInterval) {
      //   clearInterval(this.playInterval)
      //   this.playInterval = setInterval(() => {
      //     that.getVideo()
      //     this.getFrameurl()
      //     if (v.ended) clearInterval(this.playInterval)
      //   }, 80)
      // }
    },
    pause() {
      var v = document.getElementById('videoPlay')
      v.pause()
      this.videoObj.stopListen()
      this.getVideo()
      this.getFrameurl()
      window.clearInterval(this.playInterval)
    },
    // 获取当前帧url 并渲染canvas
    async getFrameurl() {
      let image = new Image()
      image.src = this.imageBase64
      let indexInfo = (image.onload = await function() {
        return {
          imageWidth: image.width,
          imageHeight: image.height
        }
      })()
      this.videoFrameInit(indexInfo)
    },
    // 下一帧增加,并渲染当前帧
    seekForward() {
      this.videoObj.seekForward(1, debounce(this.getVideo, 100))
    },
    seekBackward() {
      this.videoObj.seekBackward(1, this.getVideo)
    },
    hideTaskInfo() {},
    showTaskInfo() {},
    getFile(fileName) {
      // // var url = this.accessUrl + fileName
      // var url = 'http://img.zcool.cn/community/01f9ea56e282836ac72531cbe0233b.jpg@2o.jpg'
      // return url
    },
    submit() {
      // console.log(window.getSavedJson())
    },
    getLocalTime(now) {
      // let datatime1 = new DTConvert(parseInt(now)).getLocalDateTime()
      // return datatime1
      return 1
    },
    initCanvas() {
      // if (this.markResult !== {} && this.markResult.dataResult !== undefined) {
      //   let dataResult = []
      //   dataResult = this.markResult.dataResult
      //   this.isUpdate = true
      // }
      var markResource = this.getFile(this.url)
      var indexInfo = {
        fileName: markResource,
        // imageWidth: markResource.imageWidth,
        // imageHeight: markResource.imageHeight
        // fileName: 111,
        imageWidth: 400,
        imageHeight: 400
      }
      window.init('', indexInfo, this.hasTagForm)
    },
    saveFormValue(formData, flag) {},
    // 获取video对象
    getVideo() {
      // console.log('11')
      // 当前是哪一帧
      this.videoFrame = this.videoObj.get()
      let ctx = this.canvas.getContext('2d')
      let video = this.videoObj.video
      this.canvas.width = 1000
      this.canvas.height = 400
      let rangeMap = video.videoWidth / video.videoHeight
      let height = 500 / rangeMap
      ctx.drawImage(video, 0, 0, 500, height)
      this.imageBase64 = this.canvas.toDataURL('image/png', 1) //1表示质量(无损压缩)
      this.getFrameurl()
    },
    clearCanvas() {
      // 将用于显示的和生成image的画布清空
      this.canvas.style.display = 'none'
      // 移除上一个用于渲染的画板
      let childNode = document.getElementsByClassName('dt-viewport')
      if (childNode.length) {
        this.map.removeChild(childNode[0])
      }
    }
    //
  },
  computed: {
    getRoleId() {
      return 1
    }
  },
  mounted() {
    // 渲染一个用于抽帧的canvas
    this.map = document.getElementById('map')
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'absolute'
    this.canvas.style.zIndex = 999
    // this.map.append(this.canvas)
    // this.getFrameurl()

    // 视频抽帧初始化
    this.videoObj = window.VideoFrame({
      id: 'videoPlay',
      frameRate: this.FrameRates.film,
      callback: function(response) {}
    })
    var v = document.getElementById('videoPlay')
    v.addEventListener(
      'timeupdate',
      () => {
        this.getVideo()
      },
      true
    )
  }
}
</script>
<style lang="scss">
@import '@/views/videoFrame/dt.scss';
</style>
<style lang="scss">
.tagMarkVideoFrame {
  width: 100%;
  height: 100%;
  font-size: 14px;
  position: relative;
  .el-button {
    width: auto !important;
  }
  #videoPlay {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    background-color: gray;
    line-height: 100px;
    position: absolute;
    right: 101px;
    top: 0;
    z-index: 9999;
  }
  .tagMark-header {
    background-color: #f4f6ff;
    padding: 20px;
    & > span {
      color: #2f404f;
      margin-right: 20px;
    }
    .el-breadcrumb {
      margin-top: 10px;
      font-size: 12px;
      color: #6f7c98;
    }
  }

  main {
    // height: calc(100% - 190px);
    background-color: white;
    height: 700px;
    overflow: auto;
    min-height: 430px;
    .tagMark-main-header {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      .el-col-first {
        width: 20%;
        text-align: left;
      }
      .base-tool {
        margin-right: 20px;
        .btn-group {
          a {
            margin-left: 20px;
          }
        }
      }
    }
    .tagMark-main-content {
      position: relative;
      height: calc(100% - 235px);
      width: 100%;
      padding: 0 20px;
      #map {
        width: 100%;
        height: 100%;
        background: rgb(241, 241, 241);
      }
      #drawUL {
        width: 80px;
        text-align: center;
        position: absolute;
        right: 20px;
        top: 0px;
        z-index: 99;
        padding: 10px;
        background-color: #f4f6ff;
        a {
          display: inline-block;
          width: 100%;
          height: 30px;
          margin-top: 10px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .tagMark-main-footer {
      display: flex;
      width: 50%;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      height: 50px;
    }

    .tagMark-main-tagDetail {
      padding: 10px 20px;
      height: 80px;
      .draw-nav {
        border: 1px solid #f4f6ff;
        height: 75px;
        width: 100%;
      }
      .effective-form {
        padding: 10px 0;
        height: 50px;
        line-height: 30px;
        text-align: left;
      }
    }
  }

  footer {
    padding: 20px;
    width: 100%;
    height: 50px;
  }
}
</style>
