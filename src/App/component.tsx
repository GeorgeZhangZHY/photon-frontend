import * as React from 'react';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
// import Gallery from '../Gallery/Gallery';
// import PostFeed from '../PostFeed/PostFeed';

import './App.css';

export type AppComponentProps = {
    initRegions: () => void
};

export class AppComponent extends React.Component<AppComponentProps> {

    componentDidMount() {
        this.props.initRegions();
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
