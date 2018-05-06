import xs from 'xstream'
import {div, p, span, button, br} from '@cycle/dom';
import {MDCRipple} from '@material/ripple';

export function App(sources) {
    const vtree$ = xs.of(
        div([
            p("#intro.someClass.someother",
                {
                    style: {border: '1px solid #bada55', fontWeight: 'bold', color: 'var(--main-color)'},
                    attrs: {foo: 'bar'}
                },
                "My Awesome Cycle.js app"),
            span(
                {
                    style: {opacity: '0', transition: 'opacity 10s', delayed: {opacity: '1'}},
                    attrs: {class: 'classFromAttrs'}
                },
                'Imma fade right in!'),
            br(),
            button(
                ".mdc-button", {
                    hook: {
                        insert: (vnode) => {
                            let root = vnode.elm;
                            console.log("insert called on button specific hook");
                            root.ripple = new MDCRipple(root);
                        },
                        destroy: (vnode) => {
                            let root = vnode.elm;
                            console.log("destroy called on button specific hook");
                            root.ripple.destroy();
                        },
                    }
                },
                "Button with ripple directly coded"),
            br(),
            button(".mdc-button.autoenabledripple", "Button with ripple activated at module level"),
            br(),
            button(".mdc-button", "Button without ripple")
        ])
        )
    ;
    const sinks = {
        DOM: vtree$
    };
    return sinks
}
