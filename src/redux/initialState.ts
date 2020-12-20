export const userInitialState = {
    formData: {
        name: '',
        age: 0,
        gender: '',
        address: '',
        email: '',
    },
    users: [
        {
            name: 'Ramkumar',
            age: 18,
            gender: 'M',
            address: '15/3, Soorakkundu road, Melur, Madurai',
            email: 'ramk2394@gmail.com',
        },
        {
            name: 'Rajendran',
            age: 60,
            gender: 'M',
            address: '86, Bank road, Melur, Madurai',
            email: 'rajendran@gmail.com',
        },
        {
            name: 'Vasanthi',
            age: 51,
            gender: 'F',
            address: '86, Bank road, Melur, Madurai',
            email: 'vasanthi@gmail.com',
        },
        {
            name: 'Varun',
            age: 19,
            gender: 'T',
            address: 'N-21, Gandhi nagar, Melur, Madurai',
            email: 'varun@gmail.com',
        }
    ],
    isFormValid: false,
    isEditUser: false,
    selectedUserId: '',
};

export const routesInitialState = {
    currentRoute: 'List',
};

const initialState = {
    route: routesInitialState,
    userList: userInitialState,
};

export type IAppState = typeof initialState;

export default initialState;