const path = require( 'path' );

module.exports = {
	entry: path.join( __dirname, '../src/index.jsx' ),
	output: {
		filename: 'bundle.js',
		path: path.join( __dirname, '../dist' ),
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json' ],
	},
	module: {
		rules: [
			{
				test: /\.(js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
						],
					},
				},
			},
		],
	},
};
