import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'
import {MDCRipple} from '@material/ripple';

import ClassModule from 'snabbdom/modules/class';
import PropsModule from 'snabbdom/modules/props';
import AttrsModule from 'snabbdom/modules/attributes';
import StyleModule from 'snabbdom/modules/style';
import DatasetModule from 'snabbdom/modules/dataset';

function enableMaterialDesignRipple(oldVnode, vnode) {
    const elm = vnode.elm;
    if (elm.classList.contains("autoenabledripple") && !elm.ripple) {
        elm.ripple = new MDCRipple(elm);
        console.log("enabling ripple through module hook");
    }
}

function disableMaterialDesignRipple( vnode) {
    const elm = vnode.elm;
    if (elm.ripple) {
        elm.ripple.destroy();
        elm.ripple = null;
        console.log("destroy called on module hook");
    }
}
const materialDesignModule = {create: enableMaterialDesignRipple, destroy: disableMaterialDesignRipple};

const modules = [
    StyleModule,
    ClassModule,
    PropsModule,
    AttrsModule,
    DatasetModule,
    materialDesignModule,
];
const main = App;

const drivers = {
    DOM: makeDOMDriver('#root', {modules:modules})
};

run(main, drivers);
