module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended'
	],
	'parser': '@babel/eslint-parser',
	'parserOptions': {
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true,
			'jsx': true
		},
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-hooks'
	],
	'rules': {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/prop-types': 'off'
	},
	'settings': {
		'react': {
			'pragma': 'React',
			'version': 'detect'
		}
	}
}
