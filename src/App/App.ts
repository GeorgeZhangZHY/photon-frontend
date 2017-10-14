import { connect, Dispatch } from 'react-redux';
import { AppComponent, AppComponentProps } from './component';
import { fetchRegions, fetchCostOptions, fetchGenders, fetchIdentities } from './actions';

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
    }
});

const App = connect(undefined, mapDispatchToProps)(AppComponent);

export default App;
