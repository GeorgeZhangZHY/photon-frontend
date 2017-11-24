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

type SignUpComponentProps = StateProps ;

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
        event.preventDefault();
    }

    validateUserName = () => {
        checkIsUserNameUsed(this.form.userName.value)
            .then(isUsed => this.setState({ isUserNameUsed: isUsed }));
    }

    render() {
        const { genders, identities } = this.props;
        const { isUserNameUsed, succeeded } = this.state;

        return (
            <div>
                {succeeded ? <Redirect to="/signUp" /> : null}
                <title>注册</title>
                <form ref={f => this.form = f!} onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="姓名（最长15个字）"
                        name="userName"
                        maxLength={15}
                        onBlur={this.validateUserName}
                        required
                    />
                    {isUserNameUsed ? <span>名字已被使用</span> : null}
                    <input
                        type="password"
                        placeholder="密码（6~20位）"
                        name="password"
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    <select name="gender" required>
                        <option value="" disabled selected hidden>性别</option>
                        {genders.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select name="identity" required>
                        <option value="" disabled selected hidden>身份</option>
                        {identities.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <input type="submit" value="提交" disabled={isUserNameUsed} />
                </form>
            </div>
        );
    }

}