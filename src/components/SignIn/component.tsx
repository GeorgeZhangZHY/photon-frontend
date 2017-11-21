import * as React from 'react';
import { FormEvent } from 'react';
import { AxiosResponse } from 'axios';
import { login } from '../../netAccess/users';
import { User } from '../../global/models';

export type DispatchProps = {
    setUserLoggedIn: (user: User) => void
};

type SignInComponentProps = DispatchProps;

export class SignInComponent extends React.Component<SignInComponentProps, { isInputWrong: boolean }> {

    form: HTMLFormElement;

    constructor(props: SignInComponentProps) {
        super(props);
        this.state = {
            isInputWrong: false
        };
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        this.setState({ isInputWrong: false });

        const form = this.form;
        const { setUserLoggedIn } = this.props;

        login(form.userName.value, form.password.value)
            .then(user => setUserLoggedIn(user))
            .catch(err => {
                if (err.response) {
                    let response: AxiosResponse = err.response;
                    if (response.status === 400) {
                        this.setState({ isInputWrong: true });
                    }
                }
            });
    }

    render() {

        const { isInputWrong } = this.state;

        return (
            <div>
                <title>登录</title>
                <form
                    ref={f => this.form = f!}
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="姓名"
                        name="userName"
                        maxLength={15}
                        required
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        name="password"
                        minLength={6}
                        maxLength={20}
                        required
                    />
                    {isInputWrong ? <span>用户名与密码不匹配</span> : null}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}