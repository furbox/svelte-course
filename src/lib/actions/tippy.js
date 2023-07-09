import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export default function (node, optios) {
    const instance = tippy(node, optios);

    return {
        update(newOptios) {
            //@ts-ignore
            instance.setProps(newOptios);
        },
        destroy() {
            //@ts-ignore
            instance.destroy();
        }
    }
}