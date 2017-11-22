import { connect, Dispatch } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { GalleryComponent, GalleryComponentProps } from './component';

const mapStateToProps = (state: Store): Partial<GalleryComponentProps> => ({
    mainTitle: '推荐主题',
    items: state.recommendedThemes.map(item => ({
        title: item.title,
        imageUrl: item.coverUrl,
        id: item.themeId
    }))
});

const mapDispatchToProps = (dispatch: Dispatch<{}>): Partial<GalleryComponentProps> => ({
    handleClick: (id: number) => {
        // todo
    }
});

const ThemeGallery = connect(mapStateToProps, mapDispatchToProps)(GalleryComponent);
export default ThemeGallery;