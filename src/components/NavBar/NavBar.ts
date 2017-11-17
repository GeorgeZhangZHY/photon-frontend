import { connect } from 'react-redux';
import { Store } from '../mainReducer';
import NavBarComponent from './component';

const mapStateToProps = (state: Store) => ({
    isLoggedIn: state.user === null
});

const NavBar = connect(mapStateToProps)(NavBarComponent);

export default NavBar;