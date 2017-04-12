var path = require('path');
var config = require('./config');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vueConfig = require('./vue-loader.config');
var env = process.argv[2];


var fs = require('fs');
var entries = { 'vendor': config.vendor };

// 支持驼峰
var fistLetterUpper = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

var buildEntryPoint = function(entryPoint) {
    if (env !== 'hot-reload') {
        return entryPoint;
    }
    return [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        entryPoint
    ]
}

// 动态生成entry
fs.readdirSync(config.entryDir).filter(function(folder) {
    var path = config.entryDir + folder;
    var stat = fs.lstatSync(path);
    if (stat.isDirectory()) {
        fs.readdirSync(path).filter(function(name) {
            var c_path = path + '/' + name;
            var c_stat = fs.lstatSync(c_path);
            if (c_stat.isDirectory()) {
                entries[folder + fistLetterUpper(name)] = buildEntryPoint(c_path + '/' + name + '.js');
            }
        });
    }
});


// 定义plugin
var plugins = [
    new ExtractTextPlugin({
        filename: "css/[name].css",
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "js/vendor.js",
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        '__DEV__': process.env.NODE_ENV === 'production' ? false : true
    })
];

if (env === 'hot-reload') {
    var arr = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
    plugins = arr.concat(plugins);
    console.log('hot reload listening……')
}
module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, config.distDir),
        filename: 'js/[name].js',
        publicPath: '/wuji/dist/' //方便定位到CDN静态资源，配合url-loader
    },
    //引入第三方库
    externals: {
      'calendar': 'calendar',
      'particlesJS': 'particlesJS'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueConfig
        }, 
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, 
        {
            //需要有相应的css-loader，因为element-ui css在node_moudle
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: "css-loader",
                fallback: 'style-loader' 
            })
        },
        {
            test: /\.(scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                use: "css-loader!sass-loader",
                fallback: 'style-loader' 
            })
        },
        {
            //同上
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
        // require时省略的扩展名，不再需要强制转入一个空字符串，如：require('module') 不需要module.js
        extensions: [".js", ".json", ".vue", ".scss", ".css"],
        //require路径简化
        alias: {
            //Vue 最早会打包生成三个文件，一个是 runtime only 的文件 vue.common.js，一个是 compiler only 的文件 compiler.js，一个是 runtime + compiler 的文件 vue.js。
            //vue.js = vue.common.js + compiler.js，默认package.json的main是指向vue.common.js，而template 属性的使用一定要用compiler.js，因此需要在alias改变vue指向
            vue: 'vue/dist/vue',
            config: path.resolve(__dirname, config.srcDir + '/config'),
            filter: path.resolve(__dirname, config.srcDir + '/filters'),
            utils: path.resolve(__dirname, config.srcDir + '/utils'),
            stores: path.resolve(__dirname, config.srcDir + '/stores'),
            routers: path.resolve(__dirname, config.srcDir + '/routers'),
            modules: path.resolve(__dirname, config.srcDir + '/modules'),
            component: path.resolve(__dirname, config.srcDir + '/component')
        }
    },
    plugins: plugins,
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    vueConfig.loaders = {
        sass: ExtractTextPlugin.extract({
            use: 'css-loader!sass-loader',
            fallback: 'vue-style-loader'                         
        })        
    }    
    //是否压缩
    if(config.isGzip){
        var CompressionWebpackPlugin = require('compression-webpack-plugin');
        module.exports.plugins.push(new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        }))
    }   
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}