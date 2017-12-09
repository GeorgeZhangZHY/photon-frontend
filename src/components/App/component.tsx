import * as React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
import LatestPostFeed from '../LatestPostFeed/LatestPostFeed';
import PostDetail from '../PostDetail/PostDetail';
import ModifyPost from '../ModifyPost/ModifyPost';
import AddPost from '../AddPost/AddPost';
import FollowActivityFeed from '../FollowActivityFeed/FollowActivityFeed';
import AlbumDetail from '../AlbumDetail/AlbumDetail';
import PhotoViewer from '../PhotoViewer/PhotoViewer';
import UserSpace from '../UserSpace/UserSpace';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

import './App.css';
import '../../global/common.css';

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
        return (
            <div>
                <NavBar />
                <div className="vertical-container app">
                    <Route exact path="/" component={Filter} />
                    <Route exact path="/" component={LatestPostFeed} />
                    <Route path="/post/:postId" component={PostDetail} />
                    <Route path="/modifyPost" component={ModifyPost} />
                    <Route path="/addPost" component={AddPost} />
                    <Route path="/activity" component={FollowActivityFeed} />
                    <Route path="/album/:albumId" component={AlbumDetail} />
                    <Route path="/photo" component={PhotoViewer} />
                    <Route path="/user/:userId" component={UserSpace} />
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
                </div>
            </div>

        );

    }
}
