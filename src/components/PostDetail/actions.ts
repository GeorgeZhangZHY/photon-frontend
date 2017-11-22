export type PostDetailAction = {
    type: 'CLOSE_POST' | 'ADD_NEW_REQUEST',
};

export const closePost = () => ({
    type: 'CLOSE_POST',
});

export const addNewRequest = () => ({
    type: 'ADD_NEW_REQUEST',
});