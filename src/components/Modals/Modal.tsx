import * as React from 'react';
import { createPortal } from 'react-dom';

export default class Modal extends React.Component {

    node: HTMLDivElement;

    constructor(props: any) {
        super(props);
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
    }

    render() {
        return createPortal(
            <div className="modal">
                {this.props.children}
            </div>,
            this.node
        );
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
}