const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const cssLoader = {
        loader: 'css-loader',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            sourceMap: true
        }
    };
    return {
        stats: { modules: false },
        entry: {
            'root': './Client/root.tsx',
            'boot': './Client/boot.tsx',
            'react': ['isomorphic-fetch', 'react', 'react-dom', 'react-router', 'react-toolbox', 'react-markdown']
        },
        resolve: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /Client/, exclude: /node_modules/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', cssLoader, 'postcss-loader'] : ExtractTextPlugin.extract({ use: cssLoader }) },
                { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader?limit=25000' },
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'react',
                chunks: ['boot']
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ])
    };
};