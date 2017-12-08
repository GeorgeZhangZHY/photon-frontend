import * as React from 'react';
import Modal from './Modal';

type DialogProps = {
    title: string,
    onConfirm: () => void,
    onCancel: () => void
};

export default class Dialog extends React.Component<DialogProps> {

    render() {
        const { title, onConfirm, onCancel } = this.props;
        return (
            <Modal>
                <header>{title}</header>
                {this.props.children}
                <footer>
                    <button onClick={onConfirm}>确定</button>
                    <button onClick={onCancel}>取消</button>
                </footer>
            </Modal>
        );
    }
}