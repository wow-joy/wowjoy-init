# w

## 环境配置

- dev ``
- test ``

## 命令

### 启动

- `yarn start`
- `npm start`

### HTTPS 启动

- Bash `HTTPS=true yarn start` | `HTTPS=true npm start`
- Other Shells 请查看`CRA`官方文档 https://facebook.github.io/create-react-app/docs/using-https-in-development#docsNav

### 构建

- `yarn build`
- `npm build`

## 基本目录结构

```
|-- Root
    |-- .env // 环境变量管理文件
    |-- .gitignore
    |-- package.json
    |-- README.md
    |-- build // 构建后输出文件夹
    |-- public
    |   |-- index.html // html源文件
    |
    |-- scripts // webpack脚本目录
    |
    |-- src
        |-- index.css // 公用css
        |-- index.js // spa入口
        |-- serviceWorker.js // SW
        |-- components // 全局公用组件
        |
        |-- config // 配置目录
        |   |-- request //  api,fetch配置
        |   |-- path // 公共路径配置
        |
        |-- static // 静态资源目录
        |   |-- img
        |   |-- svg
        |
        |-- tools // 工具函数文件
        |
        |-- view // 页面视图文件
            |-- App.js
            |-- Routers.js // 路由配置
            |
            |-- List // 列表页
            |   |-- components // 列表页组件
            |
            |-- Home // 首页
                |
                |-- components

```