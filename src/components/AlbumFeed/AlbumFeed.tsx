import * as React from 'react';
import { Album } from '../../global/models';
import AlbumBrief from '../AlbumBrief/AlbumBrief';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';

type Props = {
    onLoadMore: (pageNum: number, pageSize: number) => Promise<Album[]>
};

type State = {
    albums: Album[]
};

export default class AlbumFeed extends React.Component<Props, State> {

    state: State = {
        albums: []
    };

    handleNewAlbums = (newAlbums: Album[]) => {
        this.setState(prevState => ({ albums: prevState.albums.concat(newAlbums) }));
    }

    render() {
        return (
            <InfiniteScroll
                pageSize={10}
                loadData={this.props.onLoadMore}
                onDataLoaded={this.handleNewAlbums}
            >
                <section className="horizontal-container">
                    {this.state.albums.map(album => <AlbumBrief key={album.albumId} album={album} />)}
                </section>
            </InfiniteScroll>
        );
    }
}
