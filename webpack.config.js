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
        // new webpack.NoEmitOnErrorsPlugin()
        new webpack.NoErrorsPlugin()
    ]
    plugins = arr.concat(plugins);
    console.log('hot reload listening……')
}
module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, config.distDir),
        filename: 'js/[name].js',
        publicPath: '/FrontEnd/dist/' //方便定位到CDN静态资源，配合url-loader
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
                loader: "css-loader",
                fallbackLoader: 'style-loader' 
            })
        },
        {
            test: /\.(scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                loader: "css-loader!sass-loader",
                fallbackLoader: 'style-loader' 
            })
        },
        {
            //同上
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, 
        {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: [".js", ".json", ".vue", ".scss", ".css"],
        //require路径简化
        alias: {
            config: path.join(__dirname, config.srcDir + '/config'),
            filter: path.join(__dirname, config.srcDir + '/filters'),
            etc: path.join(__dirname, config.srcDir + '/etc'),
            utils: path.join(__dirname, config.srcDir + '/utils'),
            scss: path.join(__dirname, config.srcDir + '/scss'),
            components: path.join(__dirname, config.srcDir + '/components')
        }
    },
    plugins: plugins,
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    vueConfig.loaders = {
        sass: ExtractTextPlugin.extract({
            loader: 'css-loader!sass-loader',
            fallbackLoader: 'vue-style-loader'                         
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
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}