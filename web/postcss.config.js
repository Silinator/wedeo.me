const postcssConfig = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
};

if (process.env.NODE_ENV === 'production') {
	postcssConfig.plugins.push(
		require('cssnano')({
			preset: 'default',
		})
	);
}

module.exports = postcssConfig;
