const userReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.payload }
        case 'setValidUser':
            return { ...state, validUser: action.payload }
        case 'setUserFocus':
            return { ...state, userFocus: action.payload }
        case 'setIsDuplicateUsername':
            return { ...state, isDuplicateUsername: action.payload }
        default:
            return new Error();
    };
};

export default userReducer;

export const USER_ACTION = {
    SET_USER: 'setUser',
    SET_VALID_USER: 'setValidUser',
    SET_USER_FOCUS: 'setUserFocus',
    SET_IS_DUPLICATE_USERNAME: 'setIsDuplicateUsername'
};