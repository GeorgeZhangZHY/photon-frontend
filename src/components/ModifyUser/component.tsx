import * as React from 'react';
import { User, RouteProps } from '../../global/models';
import RegionSelect from '../RegionSelect/RegionSelect';
import { ChangeEvent } from 'react';
import { modifyUserInfo } from '../../netAccess/users';

export type StateProps = {
    user: User
    genders: string[]
    identities: string[]
};

export type DispatchProps = {
    handleModifyUserInfo: (modifiedUser: User) => void
};

export type State = {
    gender: string,
    identity: string,
    phoneNum: string,
    qqNum: number,
    regionCode: number,
    wechatId: string
};

type Props = StateProps & DispatchProps & RouteProps;

export class ModifyUserComponent extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        const { gender, identity, phoneNum, qqNum, regionCode, wechatId } = this.props.user;
        this.state = {
            gender, identity, phoneNum, qqNum, regionCode, wechatId
        };
    }

    handleRegionCodeChange = (newRegionCode: number) => {
        this.setState({ regionCode: newRegionCode });
    }

    handleTextChange = (stateName: keyof State) => {
        return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            this.setState({ [stateName]: event.target.value } as any);
        };
    }

    handleSubmit = () => {
        const modifiedUser = { ...this.props.user, ...this.state };
        modifyUserInfo(modifiedUser).then(() => {
            this.props.handleModifyUserInfo(modifiedUser);
            this.props.history!.goBack();
        });
    }

    render() {
        const { gender, identity, phoneNum, qqNum, regionCode, wechatId } = this.state;
        const { genders, identities } = this.props;
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <label>性别:
                        <select name="gender" required>
                            <option value="" disabled selected hidden>性别</option>
                            {genders.map(g =>
                                <option key={g} value={g} selected={g === gender}>{g}</option>)}
                        </select>
                    </label>
                    <label>身份:
                        <select name="identity" required>
                            <option value="" disabled selected hidden>身份</option>
                            {identities.map(i =>
                                <option key={i} value={i} selected={i === identity}>{i}</option>)}
                        </select>
                    </label>
                    <label data-required>所在地区：
                        <RegionSelect
                            initialRegionCode={regionCode}
                            onRegionCodeChange={this.handleRegionCodeChange}
                        />
                    </label>
                    <label>手机号码:
                        <input
                            type="number"
                            placeholder="11位手机号码"
                            minLength={11}
                            maxLength={11}
                            onChange={this.handleTextChange('phoneNum')}
                            value={phoneNum}
                        />
                    </label>
                    <label>QQ号码:
                        <input
                            type="number"
                            placeholder="QQ号码，最长13位"
                            maxLength={13}
                            onChange={this.handleTextChange('qqNum')}
                            value={qqNum}
                        />
                    </label>
                    <label>微信号:
                        <input
                            type="text"
                            placeholder="微信号，最长30个字符"
                            name="userName"
                            maxLength={30}
                            onChange={this.handleTextChange('wechatId')}
                            value={wechatId}
                        />
                    </label>
                </form>
            </section>
        );
    }
}