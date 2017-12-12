import * as React from 'react';
import { User, RouteProps } from '../../global/models';
import RegionSelect from '../RegionSelect/RegionSelect';
import { ChangeEvent } from 'react';
import { modifyUserInfo } from '../../netAccess/users';
import { ImageUploader } from '../ImageUploader/ImageUploader';

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
    wechatId: string,
    avatarUrl: string,
    wechatQRCodeUrl: string
};

type Props = StateProps & DispatchProps & RouteProps;

export class ModifyUserComponent extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        const { gender, identity, phoneNum, qqNum, regionCode, wechatId, avatarUrl, wechatQRCodeUrl } = this.props.user;
        this.state = {
            gender, identity, phoneNum, qqNum, regionCode, wechatId, avatarUrl, wechatQRCodeUrl
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

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const modifiedUser = { ...this.props.user, ...this.state };
        modifyUserInfo(modifiedUser).then(() => {
            this.props.handleModifyUserInfo(modifiedUser);
            this.props.history!.goBack();
        });
    }

    handleCancel = () => {
        this.props.history!.goBack();
    }

    handleAvatarChange = (imageUrls: string[]) => {
        this.setState({ avatarUrl: imageUrls[0] });
    }

    handleQRCodeChange = (imageUrls: string[]) => {
        this.setState({ wechatQRCodeUrl: imageUrls[0] });
    }

    render() {
        const { gender, identity, phoneNum, qqNum, regionCode, wechatId, avatarUrl, wechatQRCodeUrl } = this.state;
        const { genders, identities } = this.props;
        return (
            <section className="form-container">
                <header>修改个人信息</header>
                <form onSubmit={this.handleSubmit} className="vertical-container">
                    <div className="form-item">
                        <label>头像:</label>
                        <ImageUploader
                            imageUrls={avatarUrl ? [avatarUrl] : []}
                            single
                            onImageUrlsChange={this.handleAvatarChange}
                        />
                    </div>
                    <div className="form-item">
                        <label data-required>性别:</label>
                        <select name="gender" required>
                            <option value="" disabled selected hidden>性别</option>
                            {genders.map(g =>
                                <option key={g} value={g} selected={g === gender}>{g}</option>)}
                        </select>
                    </div>
                    <div className="form-item">
                        <label data-required>身份:</label>
                        <select name="identity" required>
                            <option value="" disabled selected hidden>身份</option>
                            {identities.map(i =>
                                <option key={i} value={i} selected={i === identity}>{i}</option>)}
                        </select>
                    </div>
                    <div className="form-item">
                        <label>所在地区：</label>
                        <RegionSelect
                            initialRegionCode={regionCode}
                            onRegionCodeChange={this.handleRegionCodeChange}
                        />
                    </div>
                    <div className="form-item">
                        <label>手机号码:</label>
                        <input
                            type="number"
                            placeholder="11位手机号码"
                            minLength={11}
                            maxLength={11}
                            onChange={this.handleTextChange('phoneNum')}
                            value={phoneNum}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>QQ号码:</label>
                        <input
                            type="number"
                            placeholder="QQ号码，最长13位"
                            maxLength={13}
                            onChange={this.handleTextChange('qqNum')}
                            value={qqNum}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>微信号: </label>
                        <input
                            type="text"
                            placeholder="微信号，最长30个字符"
                            name="userName"
                            maxLength={30}
                            onChange={this.handleTextChange('wechatId')}
                            value={wechatId}
                            className="full-width"
                        />
                    </div>
                    <div className="form-item">
                        <label>微信二维码:</label>
                        <ImageUploader
                            imageUrls={wechatQRCodeUrl ? [wechatQRCodeUrl] : []}
                            single
                            onImageUrlsChange={this.handleQRCodeChange}
                        />
                    </div>
                    <div className="form-item horizontal-container centered">
                        <input type="submit" value="提交" className="primary" />
                        <input type="button" value="取消" onClick={this.handleCancel} />
                    </div>
                </form>
            </section>
        );
    }
}