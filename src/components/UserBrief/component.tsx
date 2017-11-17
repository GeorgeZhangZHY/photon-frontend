import * as React from 'react';
import { UserBriefInfo } from '../../global/models';

const genderLogos = [require('./male.svg'), require('./female.svg')];

export type UserBriefComponentProps = {
    enterUserMainPage: (userId: number) => void
} & UserBriefInfo;

export function UserBriefComponent(props: UserBriefComponentProps) {
    return (
        <div>
            <img src={props.avatarUrl} alt="头像" />
            <span>{props.userName}</span>
            <img src={genderLogos[props.genderCode - 1]} alt="性别" />
            <span>{props.identityCode}</span>
        </div>
    );
}