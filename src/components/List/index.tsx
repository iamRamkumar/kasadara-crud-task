import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import UserTable from './UserTable';
import { IAppState } from '../../redux/initialState';
import { changeRouteName } from '../../redux/route.redux';
import { resetUserSelection } from '../../redux/user.redux';

function List (props: any) {
    const { users, dispatch } = props;
    useEffect(() => {
        dispatch(changeRouteName('List')).then(() => {
            dispatch(resetUserSelection());
        });
    }, []);
    return (
        <>
            <UserTable userList={users} dispatch={dispatch} />
        </>
    );
}

const mapStateToProps = (state: IAppState) => ({
    currentRoute: state.route.currentRoute,
    users: state.userList.users,
  });

export default connect(mapStateToProps)(List);