import BudgetPreparationModule from './module'
import metaData from './mock'

const { default: BillPage } = await import('@gcbp/web-framework-bill/cores/BillPage')

class BudgetPreparationPage extends BillPage {
  // 扩展方法
  createModule(appConfig) {
    const { config, views } = appConfig.spec
    return new BudgetPreparationModule({
      config,
      views
    })
  }
}

// 默认本地开发使用本地的元数据
if (process.env.NODE_ENV === 'development') {
  BudgetPreparationPage.prototype.init = async () => {
    return metaData
  }
}

export default BudgetPreparationPage
