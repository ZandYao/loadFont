import { TASK_PROPERTY_TYPE_MAP } from '@/views/constants.js'
import Api from '@/common/api.js'
export default {
  data() {
    return {
      isNew: '',
      taskName: '',
      taskId: '',
      tagId: '',
      projectId: '',
      organizationId: '',
      projectName: '',
      picTagType: '',
      fileType: '',
      fileName: '',
      fileId: '',
      filePath: '',
      effective: '',
      status: '',
      timeStr: '',
      MD5: '',
      creatorFullName: '',
      createTime: '',
      modifierFullName: '',
      modifyTime: '',
      url: '',
      errorContent: '',
      wholeTagForm: {},
      singleTagForm: [],
      wholeTagDefaultValue: {},
      wholeAuditForm: [],
      singleAuditForm: [],
      formMarkResult: {},
      formAuditResult: {},
      itemData: {},
      dataResult: {},
      auditResult: {}
    }
  },
  methods: {
    initTagInfo() {
      this.taskName = this.$store.state.currentPropertyName
      if (window.localStorage.getItem('projectInfo')) {
        let projectInfo = JSON.parse(window.localStorage.getItem('projectInfo'))
        this.projectId = projectInfo.projectId
        this.organizationId = projectInfo.organizationId
        this.projectName = projectInfo.projectName
      }
      this.taskId = this.$route.query.taskId
      this.tagId = this.$route.query.tagId
      this.isNew = this.$route.query.isNew
      let tagInfo = this.$store.state.currentTagInfo
      this.picTagType = tagInfo.picTagType
      this.fileType = tagInfo.fileType
      this.fileName = tagInfo.fileName
      this.fileId = tagInfo.id
      this.filePath = tagInfo.filePath
      if (window.location.href.indexOf('localhost') > 0) {
        this.url = process.env.VUE_APP_DATA_HOST + this.filePath
      } else {
        this.url = 'http://' + window.location.host + '/' + this.filePath
      }
      this.effective = tagInfo && tagInfo.effective ? tagInfo.effective.toString() : '0'
      this.status = tagInfo.status
      this.timeStr = tagInfo.timeStr
      this.MD5 = tagInfo.MD5
      this.creatorFullName = tagInfo.creatorFullName
      this.createTime = tagInfo.createTime
      this.modifierFullName = tagInfo.modifierFullName
      this.modifyTime = tagInfo.modifyTime
      this.formMarkResult = tagInfo.markResult && tagInfo.markResult.formMarkResult && JSON.stringify(tagInfo.markResult.formMarkResult) !== '{}' ? tagInfo.markResult.formMarkResult : this.wholeTagDefaultValue
      this.dataResult = tagInfo.markResult && tagInfo.markResult.dataResult && JSON.stringify(tagInfo.markResult.dataResult) !== '{}' ? tagInfo.markResult.dataResult : {}
    },
    initForm() {
      this.initWholeTagForm()
      this.initSingleTagForm()
    },
    //初始化整体标注表单数据
    initWholeTagForm() {
      let formData = this.getFormItem(TASK_PROPERTY_TYPE_MAP.TAGWHOLE) || []
      let formItems = []
      let defaultv = {}
      if (formData.length > 0) {
        formData.forEach(fd => {
          formItems.push({
            name: fd.name,
            label: fd.label,
            showType: fd.showType,
            defaultValue: fd.defaultValue,
            dimensionKey: fd.dimensionKey ? fd.dimensionKey : '',
            propertyTypeIds: fd.propertyTypeIds,
            values: fd.values
          })
          if (fd.showType === 3) {
            defaultv[fd.name] = fd.defaultValue ? fd.defaultValue.split(',') : []
          } else {
            defaultv[fd.name] = fd.defaultValue ? fd.defaultValue : ''
          }
        })
        this.wholeTagDefaultValue = defaultv
      }
      this.wholeTagForm = {
        inline: false,
        labelPosition: 'right',
        labelWidth: '80px',
        size: 'small',
        dimensionKey: '',
        formItemList: formItems
      }
    },
    //初始化单个标注表单
    initSingleTagForm() {
      let formData = this.getFormItem(TASK_PROPERTY_TYPE_MAP.TAGSINGLE) || []
      let formItems = {}
      let defaultv = {}
      if (formData.length > 0) {
        formData.forEach(fd => {
          let newItem = {
            name: fd.name,
            label: fd.label,
            showType: fd.showType,
            defaultValue: fd.defaultValue,
            isTitle: fd.isTitle,
            dimensionKey: fd.dimensionKey,
            propertyTypeIds: fd.propertyTypeIds,
            values: fd.values
          }
          if (formItems[fd.dimensionKey] && formItems[fd.dimensionKey].formItemList && formItems[fd.dimensionKey].formItemList.length > 0) {
            formItems[fd.dimensionKey].formItemList.push(newItem)
          } else {
            formItems[fd.dimensionKey] = {
              inline: false,
              labelPosition: 'right',
              labelWidth: '80px',
              size: 'small',
              dimensionKey: fd.dimensionKey,
              formItemList: []
            }
            formItems[fd.dimensionKey]['formItemList'].push(newItem)
          }
          if (!defaultv[fd.dimensionKey]) {
            defaultv[fd.dimensionKey] = {}
            if (fd.showType === 3) {
              defaultv[fd.dimensionKey][fd.name] = fd.defaultValue ? fd.defaultValue.split(',') : []
            } else {
              defaultv[fd.dimensionKey][fd.name] = fd.defaultValue ? fd.defaultValue : ''
            }
          } else {
            if (fd.showType === 3) {
              defaultv[fd.dimensionKey][fd.name] = fd.defaultValue ? fd.defaultValue.split(',') : []
            } else {
              defaultv[fd.dimensionKey][fd.name] = fd.defaultValue ? fd.defaultValue : ''
            }
          }
        })
        this.itemData = defaultv
        this.singleTagForm = formItems
      }
    },
    //按照表单类型返回表单数据
    getFormItem(formType) {
      if (this.$store.state.currentTaskProperty === undefined || this.$store.state.currentTaskProperty.taskProperty === undefined) {
        this.$store.dispatch('getCurrentTaskProperty', { taskId: this.$route.query.taskId })
      }
      let taskProperty = this.$store.state.currentTaskProperty.taskProperty
      if (taskProperty && taskProperty.length > 0) {
        let formData = []
        taskProperty.forEach(tp => {
          if (tp.type === formType) {
            let nowDvalue = tp.defaultValue ? JSON.parse(tp.defaultValue)[0] : ''
            let nowValues = ''
            if (nowDvalue === '') {
              nowValues = ''
            } else {
              nowValues = tp.property.values.filter(v => v.value === nowDvalue)[0].value
            }
            formData.push({
              name: tp.property.name,
              label: tp.property.label,
              isTitle: tp.isTitle,
              defaultValue: nowValues,
              showType: tp.showType,
              dimensionKey: tp.dimensionKey,
              propertyTypeIds: tp.property.propertyTypeIds,
              values: tp.property.values
            })
          }
        })
        return formData
      } else {
        return []
      }
    },
    async saveAndGetNext() {
      let markResult = this.getMarkResult()
      let isSubmit = this.markResultValid(markResult)
      this.$confirm('确定要提交并获取下一条数据么？', '提示', {
        type: 'info'
      }).then(async () => {
        if (!isSubmit) {
          this.$message({
            title: '提示',
            message: '该数据未标注，不允许提交',
            type: 'error'
          })
          return false
        } else {
          let param = {
            id: this.tagId,
            markResult: markResult,
            effective: Number(markResult.effective)
          }
          let clickCount = Number(window.sessionStorage.getItem('clickCount')) + 1
          if (this.$route.query.isNew === 'true' || this.$route.query.isNew === true) {
            if (clickCount > 1) {
              Api.tagsdataList.patch(param, {})
                .then(res => {
                  this.getNextTagData()
                })
                .catch(error => {
                  Logger.info(JSON.stringify(error))
                })
            } else {
              Api.tagsdataList.post(param, {})
                .then(res => {
                  this.getNextTagData()
                })
                .catch(error => {
                  Logger.info(JSON.stringify(error))
                })
            }
          } else {
            Api.tagsdataList.patch(param, {})
              .then(res => {
                this.getNextTagData()
              })
              .catch(error => {
                Logger.info(JSON.stringify(error))
              })
          }
        }
      })
    },
    async getNextData(nextForward) {
      const tagData = await Api.getNextTagDetail.get({
        id: this.tagId,
        nextForward: nextForward
      }, {
        pathParams: {
          id: this.tagId
        }
      }).then(res => res.data)
      if (tagData && tagData.markResult !== null) {
        let tagId = tagData.result.tagId
        this.$store.commit('updateCurrentTagInfo', tagData.result)
        this.$router.push({ name: 'tagData', query: { taskId: this.taskId, tagId: tagId, status: 0, isNew: this.$route.query.isNew } })
      }
    },
    async skipData() {
      const tagData = await Api.getNextTagData.get({
        skipTagId: this.tagId
      }, {
        pathParams: {
          taskId: this.taskId
        }
      }).then(res => res.data)
        .catch(error => {
          Logger.info(JSON.stringify(error))
        })
      if (tagData && tagData.result !== null) {
        let tagId = tagData.result.tagId
        this.$store.commit('updateCurrentTagInfo', tagData.result)
        this.$router.push({ name: 'tagData', query: { taskId: this.taskId, tagId: tagId, status: 0, isNew: this.$route.query.isNew } })
      }
      /*else {
        this.$message({
          message: '获取数据失败',
          type: 'error',
          title: '提示'
        })
      }*/
    },
    async getNextTagData() {
      const tagData = await Api.getNextTagData.get({}, {
        pathParams: {
          taskId: this.taskId
        }
      }).then(res => res.data)
        .catch(error => {
          Logger.info(JSON.stringify(error))
        })
      if (tagData && tagData.result !== null) {
        let tagId = tagData.result.tagId
        this.$store.commit('updateCurrentTagInfo', tagData.result)
        this.$router.push({ name: 'tagData', query: { taskId: this.taskId, tagId: tagId, status: this.$route.query.status, isNew: this.$route.query.isNew } })
      }
      /*else {
        this.$message({
          message: '获取数据失败',
          type: 'error',
          title: '提示'
        })
      }*/
    }
  }
}
