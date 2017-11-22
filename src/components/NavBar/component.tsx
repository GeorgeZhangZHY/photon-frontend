import * as React from 'react';
import { Link } from 'react-router-dom';

export type StateProps = {
    isLoggedIn: boolean
};

type NavBarComponentProps = StateProps;

function scrollUp(): void {
    let remainingTop = document.body.scrollTop;
    if (remainingTop > 0) {
        scrollBy(0, -Math.ceil(remainingTop / 4));
        requestAnimationFrame(scrollUp);
    }
}

export class NavBarComponent extends React.Component<NavBarComponentProps> {

    scrollToTop() {
        requestAnimationFrame(scrollUp);
    }

    render() {
        const { isLoggedIn } = this.props;
        return (
            <nav>
                <Link to="/">首页</Link>
                <Link to="/theme">主题</Link>
                {
                    isLoggedIn ?
                        [
                            <Link key="0" to="/follow" >关注</Link>,
                            <Link key="1" to="/user/me" >我的</Link>,
                            <Link key="2" to="/message" >提醒</Link>
                        ]
                        : null
                }
            </nav >
        );
    }
}