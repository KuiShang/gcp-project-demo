const { http } = await import('@gcbp/web-framework/http')
const { default: BillService } = await import('@gcbp/web-framework-bill/cores/BillService')
class DrawingDeliverysService extends BillService {
  // 获取项目id
  async getProjectId(params) {
    return http({
      url: '/gcbp/api/income-budget/v1/drawing-deliverys/new',
      method: 'GET',
      params
    })
  }

  // 获取单体list
  async getBuildings(projectId, params) {
    return http({
      url: `/gcbp/api/income-budget/v1/drawing-deliverys/${projectId}/buildings`,
      method: 'GET',
      params
    })
  }

  // 获取签收人员
  async getSignUsers(deptId, params) {
    return http({
      url: `/gcbp/api/income-budget/v1/drawing-deliverys/${deptId}/users`,
      method: 'GET',
      params
    })
  }

  // 导出excel
  async exportExcel(params) {
    let filterParams = params.store.state?.appState?.moduleState?.billQueryId?.filterParams ?? {}
    // 过滤掉参数中不存在的数据
    filterParams = Object.fromEntries(Object.entries(filterParams).filter(([key, val]) => !!val))

    return await http({
      url: `${this.baseUrl}export-excel`,
      method: 'POST',
      data: {
        ...params.dataModel,
        ...params.store.state.queryParam,
        ...filterParams,
        'dept._id': params.store.state.params.deptId
      }
    })
  }
}

async function createDrawingDeliverysService(serviceDef) {
  const service = new DrawingDeliverysService(serviceDef)
  await service.init()
  return service
}

DrawingDeliverysService.newService = createDrawingDeliverysService

export default DrawingDeliverysService
