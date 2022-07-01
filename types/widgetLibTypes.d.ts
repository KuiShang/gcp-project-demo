/**
 * 控件分类, 对应中文名称设计器统一处理;
 */
type CategoryType =
  | 'layout' // 布局: 布局类控件，一般都有插槽
  | 'view' // 视图: 页面级视图控件，与路由绑定使用
  | 'action' // 操作: 操作按钮类控件，也包含按钮发起弹窗类
  | 'form' // 表单: 表单类控件; 如：editor, formTable
  | 'normalVue' // 通用:  普通Vue类控件；如：流程
  | 'others' // 其它: 除以上类型之外的统一归为others

/**
 * 控件属性分组
 */
type GroupType =
  | 'basic' // 基本
  | 'advanced' // 高级

/**
 * 控件属性元数据类型
 */
type PropType = {
  /**
   * 属性英文名称，Vue组件props的属性名
   */
  name: string
  /**
   * 属性中文名称，用于在属性面板中展示
   */
  label: string
  /**
   * 是否必传
   */
  required: boolean
  /**
   * 属性数据类型
   */
  type: string | number | boolean | object | function | array | date
  /**
   * 属性默认值
   */
  defaultValue?: string | number | boolean | object
  /**
   * 属性描述信息
   */
  description?: string
  /**
   * 属性分组
   */
  group?: GroupType
}

/**
 * 控件事件元数据类型
 */
type EventType = {
  /**
   * 事件英文名称，Vue组件on属性的事件名
   */
  name: string
  /**
   * 事件中文名称，用于在属性面板中展示
   */
  label: string
  /**
   * 事件默认值
   */
  defaultValue?: string
  /**
   * 事件描述信息
   */
  description?: string
}

/**
 * 控件插槽元数据类型 可废弃？
 */
type SlotType = {
  /**
   * 插槽英文名称，Vue组件slot名称
   */
  name: string
  /**
   * 插槽允许插入哪些分类的控件
   */
  acceptCategory: CategoryType[]
  /**
   * 插槽中文名称
   */
  label: string
  /**
   * 插槽描述信息
   */
  description?: string
  /**
   * 插槽使用类型
   */
  type?: string
}

/**
 * 控件元数据类型
 */
type WidgetType = {
  /**
   * 控件英文名称，同Vue组件名
   */
  name: string
  /**
   * 控件相对于包名的相对路径，用于正确导入控件；如：'./path/to/file'
   */
  exposePath: string
  /**
   * 控件中文名称
   */
  label: string
  /**
   * 控件图标配置，一般是字体图标class；用于控件面板中展示
   */
  icon: string
  /**
   * 控件所属分类
   */
  category: CategoryType
  /**
   * 控件匹配的引擎名称；null为所有引擎都适用
   */
  matchCores: string[] | null
  /**
   * 控件匹配的视图名称；null为所有视图都适用，undefined是category为view时不支持嵌套
   */
  matchViews: string[] | null | undefined
  /**
   * 控件属性列表
   */
  props: PropType[]
  /**
   * 控件事件列表
   */
  events: EventType[]
  /**
   * 控件插槽列表
   */
  slots: SlotType[]
  /**
   * 控件描述信息
   */
  description?: string
}

/**
 * 控件库元数据类型
 */
export type WidgetLibType = {
  /**
   * 控件库库名称，将会挂载到浏览器全局变量，需要全局唯一
   */
  name: string
  /**
   * 控件库包名称，import 导入时的包名，模块运行时全局唯一
   */
  packageName: string
  /**
   * 控件库中的所有控件，根据分类Map归纳
   */
  widgets: {
    [category in CategoryType]?: WidgetType[]
  }
  /**
   * 控件库描述信息
   */
  description?: string
  /**
   * 可选；控件库默认中文名称，正常通过界面配置获得
   */
  label?: string
  /**
   * 可选；控件库默认资源下载地址，正常通过界面配置获得
   */
  url?: string
}

/**
 * 控件库配置示例
 */
const BillWidgetLib: WidgetLibType = {
  name: 'GCBPWebCommonWidgets',
  packageName: '@gcbp/web-common-widgets',
  label: '业务中台Web端通用控件库',
  url: '${GCP_CDN_BASE_URL}/gcbp/gcbp-web-common-widgets/latest/',
  description: '业务中台Web端通用控件库描述',
  widgets: {
    action: [
      {
        name: 'GroupSelectDialog',
        exposePath: './action/GroupSelectAction',
        label: '材料字典弹窗',
        icon: 'el-doc',
        category: 'action',
        matchCores: ['Bill'],
        matchViews: ['BillDetailView'],
        props: [
          {
            name: 'queryTableMethod',
            label: '',
            type: 'function',
            defaultValue: [],
            description: '列表数据获取方法'
          },
          {
            name: 'queryTreeMethod',
            label: '',
            type: 'function',
            defaultValue: [],
            description: '获取材料树形结构方法'
          },
          {
            name: 'addItemMethod',
            label: '',
            type: 'function',
            defaultValue: {},
            description: '添加弹窗列表项至细表'
          },
          {
            name: 'searchHint',
            label: '',
            type: 'String',
            defaultValue: '请输入',
            description: '搜索提示信息'
          },
          {
            name: 'idProp',
            label: '',
            type: 'String',
            defaultValue: '_id',
            description: '材料树唯一身份标识'
          },
          {
            name: 'parentIdProp',
            label: '',
            type: 'String',
            defaultValue: 'parentId',
            description: '材料树父级ID'
          },
          {
            name: 'defaultTreeProps',
            label: '',
            type: 'Object',
            defaultValue: {
              children: 'children',
              label: 'name'
            },
            description: '材料树父级ID'
          },
          {
            name: 'queryParamName',
            label: '',
            type: 'String',
            defaultValue: 'groupId',
            description: '查询字段定义'
          },
          {
            name: 'paginationProps',
            label: '',
            type: 'String',
            defaultValue: {
              type: 'simple'
            },
            description: '列表分页'
          },
          {
            name: 'dialogTitle',
            label: '',
            type: 'String',
            defaultValue: '',
            description: '弹窗标题'
          },
          {
            name: 'title',
            label: '',
            type: 'String',
            defaultValue: '',
            description: '材料树标题'
          },
          {
            name: 'subBillProp',
            label: '',
            type: 'String',
            defaultValue: '',
            description: '细表字段'
          },
          {
            name: 'canRepeatAdd',
            label: '',
            type: 'Boolean',
            defaultValue: false,
            description: '是否可以重复添加'
          }
        ],
        slots: [
          {
            name: 'content',
            label: 'actions默认插槽',
            acceptCategory: ['form'],
            description: ''
          }
        ],
        description: ''
      }
    ]
  }
}
