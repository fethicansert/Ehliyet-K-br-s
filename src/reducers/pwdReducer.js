const pwdReducer = (state, action) => {
    switch (action.type) {
        case 'setPwd':
            return { ...state, pwd: action.payload };
        case 'setValidPwd':
            return { ...state, validPwd: action.payload };
        case 'setPwdFocus':
            return { ...state, pwdFocus: action.payload };
        default:
            return new Error();
    };
};
export default pwdReducer;

export const PWD_ACTION = {
    SET_PWD: 'setPwd',
    SET_VALID_PWD: 'setValidPwd',
    SET_PWD_FOCUS: 'setPwdFocus'
};