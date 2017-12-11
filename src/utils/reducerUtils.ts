type State = any;
type Action = {
    type: string
};
type Reducer = (state: State, action: Action) => State;

/**
 * 将多个针对同一个状态树的reducer合并
 * @param reducers 多个针对同一个状态树的reducer，其互相之间除了default外，不存在相同的case（即action.type）
 */
export function composeReducers(...reducers: Reducer[]): Reducer {
    return (state: State, action: Action) => {
        for (const reducer of reducers) {
            const newState = reducer(state, action);
            if (newState !== state) {
                // 已经捕捉到相应action
                return newState;
            }
        }
        // 所有reducer都没有捕捉到该action（即全落入default块）
        return state;
    };
}