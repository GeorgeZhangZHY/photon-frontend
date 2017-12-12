import { connect, Dispatch } from 'react-redux';
import { AppComponent, DispatchProps, StateProps } from './component';
import { fetchRegions, fetchCostOptions, fetchGenders, fetchIdentities, fetchTags } from './actions';
import { Store } from '../../global/mainReducer';

const mapState = (state: Store): StateProps => ({
    currenUser: state.currentUser
});

const mapDispatch = (dispatch: Dispatch<{}>): DispatchProps => ({
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

const App = connect<StateProps, DispatchProps>(mapState, mapDispatch)(AppComponent);

export default App;
