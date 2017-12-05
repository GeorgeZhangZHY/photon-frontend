import * as React from 'react';
import { createPortal } from 'react-dom';

export default class Model<P = {}> extends React.Component<P> {

    node: HTMLDivElement;

    constructor(props: P) {
        super(props);
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
    }

    render() {
        return createPortal(
            <div className="model">
                {this.props.children}
            </div>,
            this.node
        );
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
}