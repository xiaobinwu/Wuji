## 吾记前端构建流程

#### 本地环境准备

* 安装node： * https://nodejs.org/en/download/ （"node": ">=6.0"，对应直达号需要升级node-sass，不然使用不了！）
* 配置webpack： npm install -g webpack(sudo权限)
* windows配置cnpm：

```
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    因为npm的默认仓库在国外，下载很慢，国内淘宝搞了个CNPM，每10分钟同步一次，完全够用了
```

### 依赖包安装
* 进入FrontEnd目录
* 执行cnpm install

### 构建
* 开发环境：执行 node server.js（或 npm run serve），热加载 node server.js hot-reload（或 npm run hot）
* 生产环境：执行 npm run build

## 关于source Mapping（仅支持chrome 浏览器）
* source Mapping就是一个代码映射跟踪，方便本地开发时debug压缩文件
* 确保chrome已打开[source Mapping](https://developer.chrome.com/devtools/docs/settings#enable-js source maps) (默认是打开的)
* 打开Develop Tools -》 Sources 即可看到源文件

## hot reload（支持构建的实时刷新）
* 环境准备：
* cnpm install express webpack-dev-middleware webpack-hot-middleware
* 执行node server.js hot-reload（或 npm run hot）
* 静态资源访问eg：http://localhost:8088/Static/dist/js/jobDetail.js

## 自定义主题
* 进入FrontEnd目录
* cnpm install element-theme element-theme-default --save-dev （依赖包安装时已安装）
* 执行node_modules/.bin/et -i
* 生成element-variables.css
* 执行node_modules/.bin/et
* 则会创建./theme
* 更改主题时，对应.babelrc的修改会如下：
```javascript
	{
	  "plugins": [["component", [
	    {
	      "libraryName": "element-ui",
	      "styleLibraryName": "~theme"
	    }
	  ]]]
	}
```

## autoprefixer（样式前缀兼容性处理），在vue-loader option进行配置
* 生成规则：
* 自动加上浏览器样式前缀，兼容各浏览器（针对份额大于全球统计数据的1%，firefox 15）
