const webpack = require("@nativescript/webpack");
const NsVueTemplateCompiler = require("nativescript-vue-template-compiler")

module.exports = (env) => {
	webpack.init(env);

	// temporary hack to support v-model using ns-vue-template-compiler
	// See https://github.com/nativescript-vue/nativescript-vue/issues/371
	NsVueTemplateCompiler.registerElement('MDTextField', () => require('nativescript-material-components/textfield').TextField, {
		model: {
			prop: 'text',
			event: 'textChange'
		}
	});
	NsVueTemplateCompiler.registerElement('MDTextView', () => require('nativescript-material-components/textview').TextView, {
		model: {
			prop: 'text',
			event: 'textChange'
		}
	});
/* 	NsVueTemplateCompiler.registerElement('MDSlider', () => require('nativescript-material-components/slider').Slider, {
		model: {
			prop: 'value',
			event: 'valueChange'
		}
	}); */

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};