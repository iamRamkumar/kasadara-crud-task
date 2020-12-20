import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import thunk from 'redux-thunk';
import initialState from '../redux/initialState';
import rootReducer from '../redux/reducers';


// function configureStore(initState = initialState) {
//   return createStore(
//     rootReducer,
//     initState as any,
//     compose(applyMiddleware(thunk)),
//   );
// }
const compose = typeof window !== 'undefined' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose : reduxCompose;

const store = createStore(
  rootReducer,
  initialState as any,
  compose(applyMiddleware(thunk)),
);

export default store;
