import { connect, Dispatch } from 'react-redux';
import { AppComponent, AppComponentProps } from './component';
import { fetchRegions } from './actions';

const mapDispatchToComponent = (dispatch: Dispatch<{}>): AppComponentProps => ({
    initRegions: () => {
        dispatch(fetchRegions());
    }
});

const App = connect(undefined, mapDispatchToComponent)(AppComponent);

export default App;
