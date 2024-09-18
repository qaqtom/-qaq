import { VueOptions } from "./vueOptions.js";
import { observer, compile } from "./utils.js";


export default class Vue {
    $el: string;
    [key: string]: any;
    constructor(options: VueOptions) {
        this.$el = options.el;
        observer(this, options.data)
        compile(this)
    }
}