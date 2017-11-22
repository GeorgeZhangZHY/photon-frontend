import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { NavBarComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    isLoggedIn: !!state.currentUser.userId
});

const NavBar = connect<StateProps>(mapStateToProps)(NavBarComponent);

export default NavBar;