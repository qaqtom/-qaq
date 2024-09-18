import { observer, compile } from "./utils.js";
export default class Vue {
    constructor(options) {
        this.$el = options.el;
        observer(this, options.data);
        compile(this);
    }
}
