import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { useHistory } from "react-router-dom";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from './components/List';
import NotFound from './components/NotFound';
import UserForm from './components/AddorEditUserInfo';
import { IAppState } from './redux/initialState';
import { addOrUpdateuserInfo } from './redux/user.redux';
import { changeRouteName } from './redux/route.redux';
import './App.css';

function App(props: any) {
  const { dispatch, currentRoute, isFormValid } = props;
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  const appBarHandler = () => {
    if (currentRoute === 'AddNew') {
      dispatch(addOrUpdateuserInfo()).then(() => {
        dispatch(changeRouteName('List')).then(() => {
          history.push('/');
        });
      });
    } else {
      dispatch(changeRouteName('AddNew')).then(() => {
        history.push('/enterUser');
      });
    }
  };
  let buttonProps = {};
  if (currentRoute === 'AddNew' && !isFormValid) {
    buttonProps = {
      disabled: true,
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {currentRoute}
          </Typography>
          <Button color="inherit" {... buttonProps} onClick={appBarHandler}>{(currentRoute === 'List' || currentRoute === '') ? 'Add' : 'Save' }</Button>
        </Toolbar>
      </AppBar>
        {/* <Counter /> */}
      <Paper elevation={3}>
        <Switch>
          <Route exact path='/' component={List} />
          <Route exact path='/enterUser' component={UserForm} />
          <Route component={NotFound}/>
        </Switch>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state: IAppState) => ({
  currentRoute: state.route.currentRoute,
  isFormValid: state.userList.isFormValid,
});

export default connect(mapStateToProps)(App);
