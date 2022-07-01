# 前端Vue2应用
> 此模板适用基于Vue2的业务模块应用，不仅能导出业务应用，也可输出Vue组件、JS模块、工具函数等供其它应用引用。


## 目录结构
```
Web端业务模块多页应用
├─ .browserslistrc 浏览器兼容性配置
├─ .eslintrc.js eslint配置
├─ gcp-config.js gcp-cli配置 相当于webpack.config.js
├─ package.json 
├─ template 
│  └─ index.html 可选；需要自定义html模板时
├─ public 可选目录；存放需要构建时Copy到dist目录的静态文件
└─ src
   ├─ assets
   │  ├─ fonts 业务组件的字体图标目录
   │  └─ img 业务组件内通用的图片目录
   ├─ components  业务组件内通用组件目录
   ├─ views  业务组件内通用的路由组件目录
   ├─ utils 业务组件内的工具函数目录
   └─ pages 多页应用目录
      ├─ simple-app 简单单据类模块范例
      │  ├─ assets
      │  │  └─ img 模块内图片目录
      │  ├─ components 模块内通用组件目录
      │  ├─ views 模块内的路由组件目录
      │  ├─ mock 模块元数据 Mock 目录
      │  ├─ service 模块内Service目录
      │  ├─ utils 模块内工具函数目录
      │  ├─ bootstrap.js 初始化应用文件
      │  ├─ index.js 构建入口文件，异步导入bootstrap.js
      │  ├─ module.js 继承BillModule的Module类
      │  └─ page.js 继承BillPage的Page类
      └─ bill-tree-app 树形列表单据类模块范例

```
## 安装依赖
`npm install`

## 运行本地服务
`npm run dev`

> 调试路径
> http://localhost:9002/gcbp/gcbp-income-budget-web/latest/simple-app/?fullname=BudgetPreparation.income-budget.gcbp.default&productCode=gcbp&moduleCode=income-budget&token=c937d169-21bb-4480-9e16-ef1531979d90&orgId=594613524877312&tenantId=594612418458112

## 提供给其它模块使用
在其它模块的gcp-config.js中配置
```
 remotes: {
    'gcbp-income-budget': `GCBPIncomeBudget@http://localhost:9093/gcbp/income-budget/gcp.js`
},
```
## 构建打包
`npm run build`
> 在Jenkins运行对应流水线时，执行此命令完成构建部署