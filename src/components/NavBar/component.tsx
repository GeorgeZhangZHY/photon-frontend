import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export type StateProps = {
    currentUserId: number
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
        const { currentUserId } = this.props;
        return (
            <nav className="navbar">
                <div className="horizontal-container navbar-controls">
                    <Link to="/">Photon</Link>
                    {currentUserId ? [
                        <Link key="0" to="/follow">关注</Link>,
                        <Link key="1" to={`/user/${currentUserId}`}>我的</Link>,
                        <Link key="2" to="/message">提醒</Link>,
                        <Link key="3" to="/addPost">发布约拍</Link>
                    ] : [
                            <Link key="3" to="/signIn">登录</Link>,
                            <Link key="4" to="/signUp">注册</Link>,
                        ]
                    }
                </div>
            </nav>
        );
    }
}