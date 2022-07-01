const { defineConfig } = require('@gcbp/gcp-cli')
const vue = require('@gcbp/gcp-cli-plugin-vue2')
const fs = require('fs')
// 读取框架库版本号
const { version } = require('./package.json')

const pageDirList = getSubDirNameList('src/pages')

const pagesMap = pageDirList.reduce((prev, pageDir) => {
  prev[`${pageDir}/index.js`] = {
    // template: 'template/index.html',
    title: `GCP Vue2 apps ${pageDir}`
  }
  return prev
}, {})

function getSubDirNameList(path) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => file.name)
}

// 本地预览地址
// http://localhost:9002/gcbp/gcbp-income-budget-web/latest/simple-app/?fullname=BudgetPreparation.income-budget.gcbp.default&productCode=gcbp&moduleCode=income-budget&token=903d71ee-b7f1-4e0b-b6e0-c43138846347&orgId=594613524877312&tenantId=594612418458112

const cdnBaseUrl = 'https://cdn.developer.glodon.com'
const port = 9002
const name = 'GCBPIncomeBudgetWeb'

module.exports = defineConfig(({ mode, env }) => {
  const target = 'http://geip-pre.glodon.com/'
  const libVersion = mode === 'development' ? 'latest' : version
  const publicPath = `${env === 'oss' ? cdnBaseUrl : ''}/gcbp/gcbp-income-budget-web/${libVersion}/`
  return {
    plugins: [vue],
    html: { title: 'GCP Vue2 app' },
    build: {
      target: 'es5',
      jsToJsx: false // 是否支持jsx
    },
    base: publicPath,
    entries: {
      ...pagesMap
    },
    gcpShare: {
      name,
      // 有exposes输出时必选：输出模块的打包类型，用于兼容微前端的JS沙箱
      library: {
        name,
        type: 'umd'
      },
      remoteType: 'script', // 有exposes输出时必选：远程库服务引用类型
      remotes: {
        // '@gcbp/web-framework': `GCPWebFramework@${cdnBaseUrl}/gcp/web-framework/2.0.0/gcp.js`,
        // '@gcbp/web-framework-bill': `GCBPWebFrameworkBill@${cdnBaseUrl}/gcp/web-framework-bill/1.0.0/gcp.js`
        '@gcbp/web-framework': `GCPWebFramework@http://localhost:9091/gcp/web-framework/latest/gcp.js`,
        '@gcbp/web-framework-bill': 'GCBPWebFrameworkBill@http://localhost:9093/gcp/web-framework-bill/latest/gcp.js'
      },
      exposes: {
        './cores/SimpleAppModule': './src/pages/simple-app/module.js',
        './cores/SimpleAppPage': './src/pages/simple-app/page.js',
        './cores/BudgetPreparationService': './src/services/budgetPreparationService.js',
        './cores/DrawingDeliverysService': './src/services/drawingDeliverysService.js',
        './actions/simple-app/UpdateApprovalDialog':
          './src/pages/simple-app/components/actions/UpdateApprovalDialog.vue'
      },
      // shared: ['vue', 'vuex']
      shareLib: {
        // vue: `Vue@${cdnBaseUrl}/vendors/vue/2.6.14/vue.min.js`,
        // // vue: `Vue@https://cdn.bootcdn.net/ajax/libs/vue/2.6.4/vue.js`,
        // // vue: `Vue@https://cdn.bootcdn.net/ajax/libs/vue/2.6.4/vue.min.js`,
        // vuex: `Vuex@${cdnBaseUrl}/vendors/vuex/3.6.2/vuex.min.js`,
        // '@geip/basic-components': [
        //   `GCPDesignPro@${cdnBaseUrl}/gcp/gcp-design-pro/1.3.2/index.js`,
        //   `${cdnBaseUrl}/gcp/gcp-design-pro/1.3.2/theme-default/index.css`
        // ],
        // '@gcbp/gcp-forms': [
        //   `GCPForms@${cdnBaseUrl}/gcp/gcp-forms/1.1.0/umd/index.js`,
        //   `${cdnBaseUrl}/gcp/gcp-forms/1.1.0/umd/index.css`
        // ]
      }
    },
    server: {
      port,
      proxy: {
        '/gcbp/api/': {
          target,
          changeOrigin: true
        }
      }
    },
    webpackChain: chain => {
      // webpack 配置
      // 微应用入口文件需要是UMD模块
      chain.output.library({
        name,
        type: 'umd'
      })
    }
  }
})
