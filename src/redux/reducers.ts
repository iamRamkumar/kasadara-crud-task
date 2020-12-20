import { combineReducers } from 'redux';
import { RouteReducer } from '../redux/route.redux';
import { UserReducer } from '../redux/user.redux';


const rootReducer = combineReducers({
    route: RouteReducer,
    userList: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;