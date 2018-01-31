module.exports = {
    output: {
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-decorators-legacy' ],
                }
            }
        ]
    }
    // module: {
    //     loaders: [
    //         {
    //             loader: "babel-loader",
    //             exclude: /\/node_modules\//,
    //             test: /\.js$/,
    //             query: {
    //                 plugins: ['transform-runtime', 'add-module-exports', 'transform-es2015-modules-umd'],
    //                 presets: ['es2015', 'es2016', 'stage-0'],
    //             }
    //         }
    //     ]
    // }
};