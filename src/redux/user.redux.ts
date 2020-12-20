import { userInitialState } from './initialState';

export const ADD_UPDATE_USER_INFO = 'user/ADD_UPDATE_USER_INFO';
export const FETCH_USER_INFO_TO_EDIT = 'user/FETCH_USER_INFO_TO_EDIT';
export const DELETE_USER_INFO = 'user/DELETE_USER_INFO';
export const SAVE_USER_FORM_DATA = 'user/SAVE_USER_FORM_DATA';
export const RESET_FORM_DATA = 'user/RESET_FORM_DATA';
export const FORM_VALIDITY = 'user/FORM_VALIDITY';

export const resetUserSelection = () => async (
    dispatch: Function,
) => {
    dispatch({
        type: RESET_FORM_DATA,
        isEditUser: false,
        isFormValid: false,
        selectedUserId: '',
        formData: userInitialState.formData,
    });
};

export const addOrUpdateuserInfo = () => async (
    dispatch: Function,
    getState: Function,
) => {
    const { userList } = getState();
    const { users, formData } = userList;
    const { email } = formData;
    let tempUsers = users;
    const findExistingUser = users.filter((user: any) => user.email === email);
    if (findExistingUser) {
        const newUserList = users.filter((user: any) => user.email !== email);
        newUserList.push(formData);
        tempUsers = newUserList;
    } else {
        tempUsers.push(formData);
    }
    dispatch({
        type: ADD_UPDATE_USER_INFO,
        users: tempUsers,
    });
    dispatch(resetUserSelection());
};

export const deleteuserInfo = (email: any) => async (
    dispatch: Function,
    getState: Function,
) => {
    const { userList } = getState();
    const { users } = userList;
    const newUserList = users.filter((user: any) => user.email !== email);
    dispatch({
        type: DELETE_USER_INFO,
        users: newUserList,
    });
};

export const setFormData = (formData: any) => async (
    dispatch: Function,
) => dispatch({
    type: SAVE_USER_FORM_DATA,
    formData,
});

export const setFormValid = (isFormValid: boolean) => async (
    dispatch: Function,
) => dispatch({
    type: FORM_VALIDITY,
    isFormValid,
});

export const selectUserForEdit = (usermail: string) => async (
    dispatch: Function,
    getState: Function,
) => {
    const { userList } = getState();
    const { users } = userList;
    const findExistingUser = users.filter((user: any) => user.email === usermail);
    console.log('findExistingUser', findExistingUser);
    dispatch({
        type: FETCH_USER_INFO_TO_EDIT,
        formData: findExistingUser[0],
        isEditUser: true,
        isFormValid: false,
        selectedUserId: usermail,
    });
};

export const UserReducer = (
    state = userInitialState,
    action: {
      type: string,
      users: any,
      formData: any,
      isFormValid: boolean,
      isEditUser: boolean,
      selectedUserId: string,
    },
) => {
    switch(action.type) {
        case ADD_UPDATE_USER_INFO: 
            return {
                ...state,
                users: action.users,
            };
        case DELETE_USER_INFO:
            return {
                ...state,
                users: action.users,
            };
        case SAVE_USER_FORM_DATA:
            return {
                ...state,
                formData: action.formData,
            };
        case FORM_VALIDITY:
            return {
                ...state,
                isFormValid: action.isFormValid,
            };
        case RESET_FORM_DATA:
            return {
                ...state,
                isFormValid: action.isFormValid,
                selectedUserId: action.selectedUserId,
                formData: action.formData,
                isEditUser: action.isEditUser,
            };
        case FETCH_USER_INFO_TO_EDIT:
            return {
                ...state,
                isFormValid: action.isFormValid,
                isEditUser: action.isEditUser,
                selectedUserId: action.selectedUserId,
                formData: action.formData,
            };
        default:
            return state;
    }
};