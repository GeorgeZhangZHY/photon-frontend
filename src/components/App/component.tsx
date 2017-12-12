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
import MessagePane from '../MessagePane/MessagePane';
import LatestAlbumFeed from '../AlbumFeed/LatestAlbumFeed';
import ModifyUser from '../ModifyUser/ModifyUser';
import AddAlbum from '../AddAlbum/AddAlbum';
import ModifyAlbum from '../ModifyAlbum/ModifyAlbum';
import './App.css';
import '../../global/common.css';
import { User } from '../../global/models';
import { Redirect } from 'react-router';

const backImage = require('./back.jpg');

export type DispatchProps = {
    initRegions: () => void,
    initIdentities: () => void,
    initCostOptions: () => void,
    initGenders: () => void,
    initTags: () => void
};

export type StateProps = {
    currenUser: User
};

type Props = StateProps & DispatchProps;

export class AppComponent extends React.Component<Props> {

    componentDidMount() {
        // 只加载一次不会在短时间内改变的全局数据
        this.props.initRegions();
        this.props.initCostOptions();
        this.props.initIdentities();
        this.props.initGenders();
        this.props.initTags();
    }

    render() {
        const isLoggedIn = !!this.props.currenUser.userId;
        return (
            <div
                className="back"
                style={{ backgroundImage: `url(${backImage})` }}
            >
                <NavBar />
                <div className="vertical-container app centered">
                    {isLoggedIn ? null : <Redirect to="/signIn" />}
                    <Route exact path="/" component={Filter} />
                    <Route exact path="/" component={LatestPostFeed} />
                    <Route path="/follow" exact component={FollowActivityFeed} />
                    <Route path="/post/:postId" exact component={PostDetail} />
                    <Route path="/modifyPost" component={ModifyPost} />
                    <Route path="/modifyUser" component={ModifyUser} />
                    <Route path="/addPost" component={AddPost} />
                    <Route path="/album" exact component={LatestAlbumFeed} />
                    <Route path="/addAlbum" exact component={AddAlbum} />
                    <Route path="/album/:albumId" component={AlbumDetail} />
                    <Route path="/modifyAlbum" component={ModifyAlbum} />
                    <Route path="/photo" component={PhotoViewer} />
                    <Route path="/user/:userId" component={UserSpace} />
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/message" component={MessagePane} />
                </div>
            </div>

        );

    }
}
