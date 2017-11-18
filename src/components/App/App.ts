import { connect, Dispatch } from 'react-redux';
import { AppComponent, AppComponentProps } from './component';
import { fetchRegions, fetchCostOptions, fetchGenders, fetchIdentities, fetchTags } from './actions';

const mapDispatchToProps = (dispatch: Dispatch<{}>): AppComponentProps => ({
    initRegions: () => {
        dispatch(fetchRegions());
    },
    initIdentities: () => {
        dispatch(fetchIdentities());
    },
    initCostOptions: () => {
        dispatch(fetchCostOptions());
    },
    initGenders: () => {
        dispatch(fetchGenders());
    },
    initTags: () => {
        dispatch(fetchTags());
    }
});

const App = connect(undefined, mapDispatchToProps)(AppComponent);

export default App;
