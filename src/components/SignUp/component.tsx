import * as React from 'react';
import { FormEvent } from 'react';
import { checkIsUserNameUsed, addNewUser } from '../../netAccess/users';
import { User } from '../../global/models';
import { AxiosResponse } from 'axios';
import { Redirect } from 'react-router';

export type StateProps = {
    genders: string[],
    identities: string[]
};

type SignUpComponentProps = StateProps;

export class SignUpComponent extends React.Component<SignUpComponentProps, {
    isUserNameUsed: boolean,
    succeeded: boolean
}> {

    form: HTMLFormElement;

    constructor(props: SignUpComponentProps) {
        super(props);
        this.state = {
            isUserNameUsed: false,
            succeeded: false
        };
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = this.form;
        const newUser: Partial<User> = {
            userName: form.userName.value,
            password: form.password.value,
            gender: form.gender.value,
            identity: form.identity.value
        };
        addNewUser(newUser).then(() => {
            this.setState({ succeeded: true });
        }).catch(err => {
            if (err.response) {
                let response: AxiosResponse = err.response;
                if (response.status === 400) {
                    // 参数错误，暂不处理
                }
            }
        });
    }

    validateUserName = () => {
        checkIsUserNameUsed(this.form.userName.value)
            .then(isUsed => this.setState({ isUserNameUsed: isUsed }));
    }

    render() {
        const { genders, identities } = this.props;
        const { isUserNameUsed, succeeded } = this.state;

        return (
            <section className="form-container">
                {succeeded ? <Redirect to="/signIn" /> : null}
                <header>注册</header>
                <form
                    ref={f => this.form = f!}
                    onSubmit={this.handleSubmit}
                    className="vertical-container"
                >
                    <div className="vertical-container">
                        <input
                            type="text"
                            placeholder="姓名（最长15个字）"
                            name="userName"
                            maxLength={15}
                            onBlur={this.validateUserName}
                            required
                            className="form-input"
                        />
                        <input
                            type="password"
                            placeholder="密码（6~20位）"
                            name="password"
                            minLength={6}
                            maxLength={20}
                            required
                            className="form-input"
                        />
                        <select name="gender" required className="form-input" defaultValue="">
                            <option value="" disabled hidden>性别</option>
                            {genders.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <select name="identity" required className="form-input" defaultValue="">
                            <option value="" disabled hidden>身份</option>
                            {identities.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    {isUserNameUsed ? <span className="error-message line">名字已被使用</span> : null}
                    <input className="primary" type="submit" value="提交" disabled={isUserNameUsed} />
                </form>
            </section>
        );
    }

}