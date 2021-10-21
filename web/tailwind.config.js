const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./**/*.js'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
	  extend: {
      colors: {
        primary: '#007abf',
        bg: '#222222',
        cyan: colors.cyan,
      }
    },
	},
	variants: {},
	plugins: [],
}