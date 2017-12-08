export type EnterImageViewAction = {
    type: 'ENTER_IMAGE_VIEW',
    photoUrls: string[],
    initialIndex: number
};

export const enterImageView = (photoUrls: string[], initialIndex: number): EnterImageViewAction => ({
    type: 'ENTER_IMAGE_VIEW',
    initialIndex,
    photoUrls
});