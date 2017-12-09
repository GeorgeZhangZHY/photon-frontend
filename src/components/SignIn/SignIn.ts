import { connect, Dispatch } from 'react-redux';
import { SignInComponent, DispatchProps } from './component';
import { userLogin } from './actions';
import { User } from '../../global/models';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    setUserLoggedIn: (user: User) => dispatch(userLogin(user))
});

const SignIn = connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(SignInComponent);

export default SignIn;