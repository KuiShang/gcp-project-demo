const { http } = await import('@gcbp/web-framework/http')
const { default: BillService } = await import('@gcbp/web-framework-bill/cores/BillService')
class BudgetPreparationService extends BillService {
  // 获取项目id
  async getProjectId(params) {
    return http({
      url: `${this.baseUrl}/new`,
      method: 'GET',
      params
    })
  }

  // 获取合同名称list
  async getContracts(params) {
    return http({
      url: `${this.baseUrl}/list-contract-select`,
      method: 'GET',
      params
    })
  }

  async updateApproval(data) {
    const res = await http({
      url: `${this.baseUrl}/${data._id}/update-budget-preparation`,
      method: 'PUT',
      data
    })
    return res
  }
}

async function createBudgetPreparationService(serviceDef) {
  const service = new BudgetPreparationService(serviceDef)
  await service.init()
  return service
}

BudgetPreparationService.newService = createBudgetPreparationService

export default BudgetPreparationService
