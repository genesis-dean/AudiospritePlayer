const path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const common = require( './webpack.config.common' );

module.exports = merge( common, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin( {
			template: path.join( __dirname, '../src/index.html' ),
		} ),
		new ESLintPlugin( {
			extensions: [ 'js', 'jsx' ],
		} ),
	],
} );
