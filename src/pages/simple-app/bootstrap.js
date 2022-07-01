import BudgetPreparation from './page'
import 'src/assets/fonts/iconfont.css'

const { default: startPage } = await import('@gcbp/web-framework/startPage')
const { bootstrap, mount, unmount } = startPage(BudgetPreparation)
export { bootstrap, mount, unmount }
