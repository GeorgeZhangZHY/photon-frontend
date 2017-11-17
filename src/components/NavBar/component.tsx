import * as React from 'react';

type Props = {
    isLoggedIn: boolean
};

export default function NavBarComponent({ isLoggedIn }: Props) {
    return (
        <header>
            <ul>
                <li>首页</li>
                <li>主题</li>
                {
                    isLoggedIn ?
                        [
                            <li key="0">关注</li>,
                            <li key="1">我的</li>,
                            <li key="2">提醒</li>
                        ] :
                        null
                }
            </ul>
        </header>
    );
}