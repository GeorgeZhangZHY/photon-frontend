import { connect } from 'react-redux';
import { Store } from '../../global/mainReducer';
import { SignUpComponent, StateProps } from './component';

const mapStateToProps = (state: Store): StateProps => ({
    genders: state.genders,
    identities: state.identities
});

const SignUp = connect<StateProps>(mapStateToProps)(SignUpComponent);

export default SignUp;