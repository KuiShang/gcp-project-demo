import UpdateApprovalDialog from './components/actions/UpdateApprovalDialog'
import BudgetPreparationService from '../../services/budgetPreparationService'
import DrawingDeliverysService from '../../services/drawingDeliverysService'
const { default: BillModule } = await import('@gcbp/web-framework-bill/cores/BillModule')

class BudgetPreparationModule extends BillModule {
  async bootstrap({ state, commit, dispatch }, params) {
    await super.bootstrap({ state, commit, dispatch }, params)
    // 拓展其他service
    this.drawingDeliverysService = this.services.get('drawingDeliverys')
  }

  async createDocService(serviceDef, key) {
    // 拓展其他service
    if (key === 'drawingDeliverys') {
      return await DrawingDeliverysService.newService(serviceDef)
    }
    return await BudgetPreparationService.newService(serviceDef)
  }

  async fetchBuildings({ scope = {}, keywords = '' }) {
    const deptId = scope?.dataContext?.state?.deptId
    let projectId = scope?.dataModel?.project?._id
    if (!projectId) {
      const params = {
        'dept._id': deptId
      }
      const res = await this.defaultService.getProjectId(params)
      projectId = res?.project?._id
    }
    const params = {
      keywords
    }
    return await this.drawingDeliverysService.getBuildings(projectId, params)
  }

  async fetchDrawingsNames({ scope = {}, keywords = '' }) {
    const deptId = scope?.dataContext?.state?.deptId
    const params = {
      'dept._id': deptId,
      drawingsType: 'official',
      keywords
    }
    let res = await this.drawingDeliverysService.getDrawingsNames(params)
    res = res.filter(item => item.billState === 'committed') || []
    return res
  }

  async fetchContracts({ scope = {}, keywords = '' }) {
    const deptId = scope?.dataContext?.state?.deptId
    const params = {
      'dept._id': deptId,
      type: 'contract',
      billState: 'committed',
      keywords
    }
    const res = await this.defaultService.getContracts(params)
    return res
  }

  async fetchDrawingsNameList(dataModel, deptId) {
    const params = {
      'dept._id': deptId,
      drawingsType: 'official'
    }
    let res = await this.drawingDeliverysService.getDrawingsNames(params)
    res = res.filter(item => item.billState === 'committed') || []
    if (res.length === 1) {
      dataModel.drawingDelivery = res[0]
      dataModel.buildings = res[0].buildings[0]
      dataModel.specialty = res[0].specialty
    }
  }

  async fetchContractList(dataModel, deptId) {
    const params = {
      'dept._id': deptId,
      type: 'contract',
      billState: 'committed'
    }
    const res = (await this.defaultService.getContracts(params)) || []
    if (res.length === 1) {
      dataModel.contract = res[0]
    }
  }

  contractChangeHandler({ scope = {}, val = {} }) {
    const { dataModel = {} } = scope
    dataModel.contract.taxType = val?.taxType
    dataModel.contract.taxRate = val?.taxRate
  }

  drawingsNameChangeHandler({ scope = {}, val = {} }) {
    const { dataModel = {} } = scope
    const list = val.buildings
    if (list && list.length === 1) {
      dataModel.buildings = list[0]
    } else if (list.length > 1) {
      dataModel.buildings = null
    }
    dataModel.specialty = val?.specialty
  }

  buildingList({ scope = {}, keywords = '' }) {
    const { dataModel = {} } = scope
    const { drawingDelivery = {} } = dataModel
    const { buildings = [] } = drawingDelivery
    return buildings.filter(building => building.name.includes(keywords))
  }

  // 复写 new 方法，给单据时间赋值默认值
  async new({ commit, state, dispatch }, query = null) {
    let bill
    try {
      bill = await this.defaultService.new({
        'dept._id': state.params.deptId
      })
    } catch (error) {
      // 错误返回列表页
      dispatch('route/changeLocation', {
        path: '/',
        query: { fullname: state.params.urlParams.fullname }
      })
      return false
    }
    commit('request/initData', { name: 'currentBill', data: bill })
    commit('updateReadonly', false)
    // 针对结算需要选中源合同配置 （todo: 业务排查是否去掉）
    dispatch('route/changeLocation', {
      query: {
        ...query,
        fullname: state.params.urlParams.fullname
      },
      path: '/detail/new'
    })
    this.fetchDrawingsNameList(bill, state.params.deptId)
    this.fetchContractList(bill, state.params.deptId)
  }

  /**
   * 初始化默认配置项及默认数据装载
   * @param {Object} config 对应 Applet 中的config配置
   */
  initialize(config) {
    console.log('this', this)
    console.log('config', config)

    super.initialize(config)
    this.functions.push(
      'fetchBuildings',
      'fetchDrawingsNames',
      'fetchContracts',
      'contractChangeHandler',
      'drawingsNameChangeHandler',
      'buildingList'
    )
    this.components = {
      ...this.components,
      UpdateApprovalDialog
    }
    this.actions.push('updateApproval')
  }

  async updateApproval({ commit, state, dispatch }, params = {}) {
    const code = await dispatch('request/mutate', {
      action: {
        docName: this.defaultService.docName,
        method: 'updateApproval',
        params
      },
      invalidates: ['tableListData']
    })
    return code
  }
}
export default BudgetPreparationModule
