import { WidgetLibType } from './widgetLibTypes'

/**
 * 开发框架引擎元数据类型
 */
type CoreType = {
  /**
   * 引擎标识名称，用于设计时作为唯一标识匹配当前引擎、控件的匹配引擎标识
   */
  name: string
  /**
   * 引擎显示名称，用于设计之前选择引擎时显示的引擎名称
   */
  label: string
  /**
   * 引擎应用相对于库的导出路径，用于运行时正确导入`Page`，再通过`startPage(Page)`启动应用
   */
  pageExposePath: string
  /**
   * 引擎数据模块相对于库的导出路径，用于设计时正确导入`Module`，再继承使用
   */
  moduleExposePath: string
  /**
   * 引擎服务相对于库的导出路径，用于设计时正确导入`Service`，再继承使用
   */
  servicesExposePath: array
}

/**
 * 开发框架库元数据类型
 */
type FrameworkLibType = {
  /**
   * 库名称，将会挂载到浏览器全局变量，需要全局唯一
   */
  name: string
  /**
   * 包名称，import 导入时的包名，模块运行时全局唯一
   */
  packageName: string
  /**
   * 框架引擎相对于库的路径，用于导入当前`Page`，再通过`startPage(Page)`启动应用
   */
  coreList: CoreType[]
  /**
   * 框架库中的所有控件，根据分类Map归纳
   */
  widgets: WidgetLibType['widgets']
  /**
   * 框架库描述信息
   */
  description?: string
  /**
   * 可选；框架库默认中文名称，正常通过界面配置获得
   */
  label?: string
  /**
   * 可选；框架库默认资源下载地址，正常通过界面配置获得
   */
  url?: string
}

/**
 * 开发框架库配置示例
 */
const BillWebFrameworkLib: FrameworkLibType = {
  name: 'GCBPWebFrameworkBill',
  packageName: '@gcbp/web-framework-bill',
  label: '单据开发框架库',
  url: '${GCP_CDN_BASE_URL}/gcp/gcbp-web-framework-bill/latest/',
  description: '单据开发框架库描述',
  coreList: [
    {
      name: 'Bill',
      label: '单据引擎',
      pageExposePath: './cores/BillPage',
      moduleExposePath: './cores/BillModule',
      servicesExposePath: ['/cores/BillService']
    }
  ],
  widgets: {
    view: [
      {
        name: 'BillDetailView',
        exposePath: './layout/BillDetailView',
        label: '单据详情',
        icon: 'el-doc',
        category: 'layout',
        matchCores: ['Bill'],
        matchViews: undefined,
        props: [
          {
            name: 'label',
            label: '详情页标题',
            defaultValue: '单据详情页标题',
            type: 'string',
            description: ''
          },
          {
            name: 'hideActionZone',
            label: '是否收起操作区',
            defaultValue: false,
            type: 'boolean',
            description: ''
          }
        ],
        events: [],
        slots: [
          {
            name: 'default',
            label: '默认插槽',
            acceptCategory: ['layout', 'form', 'normalVue'],
            description: ''
          },
          {
            name: 'extra',
            label: 'extra插槽',
            acceptCategory: ['action', 'normalVue'],
            description: ''
          },
          {
            name: 'actionZone',
            label: '右侧按钮区',
            acceptCategory: ['action'],
            description: ''
          },
          {
            name: 'assist',
            label: '右侧帮助区',
            acceptCategory: ['normalVue'],
            description: ''
          }
        ],
        description: ''
      }
    ]
  }
}
