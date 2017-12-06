import * as React from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';

type DialogProps = {
    title: string,
    onConfirm: () => void,
    onCancel: () => void
};

export default class Dialog extends Modal<DialogProps> {

    constructor(props: DialogProps) {
        super(props);
    }

    render() {
        const { title, onConfirm, onCancel } = this.props;

        return createPortal(
            <div className="dialog">
                <title>{title}</title>
                {this.props.children}
                <footer>
                    <button onClick={onConfirm}>确定</button>
                    <button onClick={onCancel}>取消</button>
                </footer>
            </div>,
            this.node
        );
    }
}