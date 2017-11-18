import { connect, Dispatch } from 'react-redux';
import { UserBriefComponent, DispatchProps, OwnProps } from './component';
import { enterUserSpace } from './actions';

const mapDispatchToProps = (dispatch: Dispatch<{}>): DispatchProps => ({
    enterUserMainPage: (userId: number) => {
        dispatch(enterUserSpace(userId));
    }
});

const UserBrief = connect<never, DispatchProps, OwnProps>(undefined, mapDispatchToProps)(UserBriefComponent);

export default UserBrief;