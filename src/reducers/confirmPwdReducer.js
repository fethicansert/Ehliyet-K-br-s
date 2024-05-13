const confirmPwdReducer = (state, action) => {
    switch(action.type){
        case 'setConfirmPwd':
            return { ...state, confirmPwd: action.payload};
        case 'setMatchPwd':
            return { ...state, matchPwd: action.payload};
        case 'setConfirmFocus':
            return { ...state, confirmFocus: action.payload};
        default:
            return new Error();
    };
};

export default confirmPwdReducer;

export const CONFIRM_PWD_ACTION = {
    SET_CONFIRM_PWD : 'setConfirmPwd',
    SET_MATCH_PWD : 'setMatchPwd',
    SET_CONFIRM_FOCUS: 'setConfirmFocus'
};