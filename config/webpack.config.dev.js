const path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const common = require( './webpack.config.common' );

module.exports = merge( common, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin( {
			template: path.join( __dirname, '../src/index.html' ),
		} ),
		new webpack.HotModuleReplacementPlugin(),
		new ESLintPlugin( {
			extensions: [ 'js', 'jsx' ],
		} ),
	],
} );
