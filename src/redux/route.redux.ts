import { routesInitialState } from './initialState';

export const CHANGE_ROUTE = 'route/CHANGE_ROUTE';

export const changeRouteName = (route: any) => async (
    dispatch: Function,
    getState: Function,
) => dispatch({
    type: CHANGE_ROUTE,
    currentRoute: route,
});

export const RouteReducer = (
    state = routesInitialState,
    action: {
      type: string,
      currentRoute: string,
    },
) => {
    switch(action.type) {
        case CHANGE_ROUTE: 
            return {
                ...state,
                currentRoute: action.currentRoute,
            };
        default:
            return state;
    }
};