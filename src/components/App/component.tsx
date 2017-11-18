import * as React from 'react';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
// import Gallery from '../Gallery/Gallery';
// import PostFeed from '../PostFeed/PostFeed';

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
            <Filter key="1" />,
            // <Gallery key="2" />,
            // <Gallery key="3" />,
            // <PostFeed key="4" />
        ];
    }
}
