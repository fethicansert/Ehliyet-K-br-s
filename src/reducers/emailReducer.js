const emailReducer = (state, action) => {
    switch (action.type) {
        case 'setEmail':
            return { ...state, email: action.payload };
        case 'setValidEmail':
            return { ...state, validEmail: action.payload };
        case 'setEmailFocus':
            return { ...state, emailFocus: action.payload };
        default:
            return new Error();
    };
};

export default emailReducer;

export const EMAIL_ACTION = {
    SET_EMAIL: 'setEmail',
    SET_VALID_EMAIL: 'setValidEmail',
    SET_EMAIL_FOCUS: 'setEmailFocus'
};