import * as React from 'react';
import { UserBriefInfo } from '../../global/models';

const genderLogos = {
    '男': require('./male.svg'),
    '女': require('./female.svg')
};

export type DispatchProps = {
    enterUserMainPage: (userId: number) => void
};

export type OwnProps = UserBriefInfo;

type UserBriefComponentProps = DispatchProps & OwnProps;

export function UserBriefComponent({
    regionName, userId, userName, identity,
    avatarUrl, enterUserMainPage, gender
}: UserBriefComponentProps) {

    let handleClick = () => enterUserMainPage(userId);

    return (
        <div>
            <img src={avatarUrl} alt="头像" onClick={handleClick} />
            <span onClick={handleClick}>{userName}</span>
            <img src={genderLogos[gender]} alt="性别" />
            <span>{identity}</span>
            {regionName && <span>{regionName}</span>}
        </div>
    );
}