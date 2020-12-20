/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    TextField, MenuItem,
    FormControl, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IAppState } from '../../redux/initialState';
import { setFormData, setFormValid } from '../../redux/user.redux';


function UserForm (props: any) {
    const { dispatch, formData, isEditUser } = props;
    const {
        name, age, gender,
        address, email,
    } = formData;
    const [userName, setName] = useState(isEditUser ? name : '');
    const [nameTouched, setNameTouched] = useState(false);
    const [userAge, setAge] = useState<number>(isEditUser ? age : 0);
    const [userAgeTouched, setAgeTouched] = useState(false);
    const [userGender, setGender] = useState(isEditUser ? gender : '');
    const [userGenderTouched, setGenderTouched] = useState(false);
    const [userAddress, setAddress] = useState(isEditUser ? address: '');
    const [userAddressTouched, setAddressTouched] = useState(false);
    const [userEmail, setEmail] = useState(isEditUser ? email: '');
    const [userEmailTouched, setEmailTouched] = useState(false);

    const emailRegx = /[a-z0-9]+(?:[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regex = /^[a-zA-Z ]+$/;

    const renderAgeOption = () => {
        const options = [];
        for(let i=1; i < 96; i++) {
            options.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return options;
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                if (!regex.test(value)) {
                    setName(value.slice(0, -1));
                }
                setNameTouched(true);
            break;
            case "age":
                setAge(value);
                setAgeTouched(true);
            break;
            case "gender":
                setGender(value);
                setGenderTouched(true);
            break;
            case "address":
                setAddress(value);
                setAddressTouched(true);
            break;
            case "email":
                setEmail(value);
                setEmailTouched(true);
            break;
        }
    };

    const setForm = () => {
        dispatch(setFormData({
            name: userName,
            age: userAge,
            gender: userGender,
            address: userAddress,
            email: userEmail,
        }));
    };

    useEffect(() => {
        if (isEditUser) {
            setForm();
        }
    }, []);

    useEffect(() => {
        setForm();
        const userNameValid = userName.length > 3 && userName.length < 26 && regex.test(userName);
        const userAgeValid = userAge > 3 && userAge < 95;
        const userGenderValid = userGender.length > 0;
        const userAddressValid = userAddress.length > 10 && userAddress.length < 101;
        const userEmailValid = userEmail.length > 6 && userEmail.length < 101 && emailRegx.test(userEmail);
        dispatch(setFormValid(userNameValid && userAgeValid && userGenderValid && userAddressValid && userEmailValid));
    }, [userName, userAge, userGender, userAddress, userEmail]);

    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        flexGrid: {
            margin: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
      }));
    const classes = useStyles();
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.flexGrid}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} error>
                            <TextField
                                error={nameTouched && userName.length < 1}
                                label="Name"
                                value={userName}
                                helperText={nameTouched && userName.length < 1 ? 'Enter a valid name': ''}
                                variant="outlined"
                                onChange={handleChange}
                                name="name"
                                inputProps={{maxLength :25}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} error>
                            <TextField
                                error={userEmailTouched && userEmail.length < 1}
                                label="Email"
                                value={userEmail}
                                helperText={userEmailTouched && userEmail.length < 1 ? 'Email id invalid.': ''}
                                variant="outlined"
                                onChange={handleChange}
                                name="email"
                                inputProps={{maxLength :100}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} error>
                            <TextField
                                error={userAddressTouched && userAddress.length < 1}
                                label="Address"
                                value={userAddress}
                                helperText={userAddressTouched && userAddress.length < 1 ? 'Enter a valid address.': ''}
                                multiline
                                variant="outlined"
                                onChange={handleChange}
                                name="address"
                                inputProps={{maxLength :100}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} error>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Age"
                                value={userAge}
                                onChange={handleChange}
                                helperText={userAgeTouched && userAge < 0 ? 'Select age' : ''}
                                variant="outlined"
                                name="age"
                                error={userAgeTouched && userAge <= 1}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {renderAgeOption()}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} error>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Gender"
                                value={userGender}
                                onChange={handleChange}
                                helperText={userGenderTouched && userGender.length < 1 ? 'Select a gender' : ''}
                                variant="outlined"
                                name="gender"
                                error={userGenderTouched && userGender.length < 1}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                                <MenuItem value="T">Transgender</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                </Grid>
            </div>
            </form>
        </>
    );
}

const mapStateToProps = (state: IAppState) => ({
    formData: state.userList.formData,
    isEditUser: state.userList.isEditUser,
});

export default connect(mapStateToProps)(UserForm);