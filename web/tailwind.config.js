const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./**/*.js',
		'./**/*.php',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
	  extend: {
      colors: {
        primary: '#007abf',
        bg: '#111111',
        cyan: colors.cyan,
      }
    },
	},
	variants: {},
	plugins: [],
}