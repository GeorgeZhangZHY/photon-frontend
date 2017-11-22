import * as React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
import LatestPostFeed from '../LatestPostFeed/LatestPostFeed';
import PostDetail from '../PostDetail/PostDetail';

import './App.css';

export type AppComponentProps = {
    initRegions: () => void,
    initIdentities: () => void,
    initCostOptions: () => void,
    initGenders: () => void,
    initTags: () => void
};

export class AppComponent extends React.Component<AppComponentProps> {

    componentDidMount() {
        // 只加载一次不会在短时间内改变的全局数据
        this.props.initRegions();
        this.props.initCostOptions();
        this.props.initIdentities();
        this.props.initGenders();
        this.props.initTags();
    }

    render() {
        return [
            <NavBar key="0" />,
            <Route key="1" exact path="/" component={Filter} />,
            // <Gallery key="2" />,
            // <Gallery key="3" />,
            <Route key="4" exact path="/" component={LatestPostFeed} />,
            <Route key="5" path="/post/:postId" component={PostDetail} />
        ];
    }
}
