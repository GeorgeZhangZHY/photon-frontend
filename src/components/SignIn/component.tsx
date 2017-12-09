import * as React from 'react';
import { FormEvent } from 'react';
import { AxiosResponse } from 'axios';
import { login } from '../../netAccess/users';
import { User } from '../../global/models';
import { Redirect } from 'react-router';

export type DispatchProps = {
    setUserLoggedIn: (user: User) => void
};

type Props = DispatchProps;

type State = {
    isInputWrong: boolean
    succeeded: boolean
};

export class SignInComponent extends React.Component<Props, State> {

    form: HTMLFormElement;

    state: State = {
        isInputWrong: false,
        succeeded: false
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({ isInputWrong: false });

        const form = this.form;
        const { setUserLoggedIn } = this.props;

        login(form.userName.value, form.password.value)
            .then(user => {
                setUserLoggedIn(user);
                this.setState({ succeeded: true });
            })
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
        const { isInputWrong, succeeded } = this.state;
        return (
            <section className="form-container">
                {succeeded ? <Redirect to="/" /> : null}
                <header>登录</header>
                <form
                    ref={f => this.form = f!}
                    onSubmit={this.handleSubmit}
                    className="vertical-container"
                >
                    <div className="vertical-container">
                        <input
                            type="text"
                            placeholder="姓名"
                            name="userName"
                            maxLength={15}
                            required
                            className="form-input"
                        />
                        <input
                            type="password"
                            placeholder="密码"
                            name="password"
                            minLength={6}
                            maxLength={20}
                            required
                            className="form-input"
                        />
                    </div>
                    {isInputWrong ? <span className="error-message line">用户名与密码不匹配</span> : null}
                    <input type="submit" value="登录" className="primary" />
                </form>
            </section>
        );
    }
}