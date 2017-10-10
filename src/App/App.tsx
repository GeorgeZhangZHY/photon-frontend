import * as React from 'react';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
import Gallery from '../Gallery/Gallery';
import PostFeed from '../PostFeed/PostFeed';    

import './App.css';

class App extends React.Component {
    render() {
        return [
            <NavBar key="1" />,
            <Filter key="2" />,
            <Gallery key="3" />,
            <Gallery key="4" />,
            <PostFeed key="5" />
        ];
    }
}

export default App;
