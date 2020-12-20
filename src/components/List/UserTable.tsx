import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { deleteuserInfo, selectUserForEdit } from '../../redux/user.redux';
import { changeRouteName } from '../../redux/route.redux';


export default function UserTable(props: any) {
    const { userList, dispatch } = props;
    const history = useHistory();
    const getGender = (value: any) => {
        switch (value) {
            case 'M': return 'Male';
            case 'F': return 'Female';
            case 'T': return 'Transgender';
            default: return 'Male';
        }
    };
    const [userEmail, setUserMail] = useState(false);
    const [open, setOpen] = useState(false);
    const handleDelete = (email: any) => {
        setOpen(true);
        setUserMail(email);
    };
    const handleEdit = (email: any) => {
        dispatch(selectUserForEdit(email)).then(() => {
            dispatch(changeRouteName('AddNew')).then(() => {
                history.push('/enterUser');
            });
        });
    };
    const deleteRecord = () => {
        dispatch(deleteuserInfo(userEmail)).then(() => {
            setOpen(false);
        });  
    };
    const handleClose = () => {
        setOpen(false);  
    };
    const TableHeader = (props: any) => {
        const { labels } = props;
        return (
            <TableHead>
                <TableRow>
                    {
                        labels.map((label: any) =>  (
                            <TableCell
                                key={label}
                            >
                                {`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
                            </TableCell>
                        ))
                    }
                    <TableCell
                        key="Action"
                    >
                        Action
                    </TableCell>
                    <TableCell
                        key="Action"
                    >
                        <br />
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };
    const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 750,
        },
        tagTableHead: {
            backgroundColor: theme.palette.common.black,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tagTableCell: {
            maxWidth: '360px',
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }));

    const classes = useStyles();
    return (
        <>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table"
                >
                    <TableHeader labels={Object.keys(userList[0])} />
                    <TableBody>
                        {
                            userList && userList.map((row: any, index: number) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.name}
                                    >
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.age}</TableCell>
                                        <TableCell align="left">{getGender(row.gender)}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">
                                            <Fab onClick={() => handleEdit(row.email)} color="primary" aria-label="edit">
                                                <EditIcon />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Fab onClick={() => handleDelete(row.email)} color="secondary" aria-label="delete">
                                                <DeleteIcon />
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you Sure?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteRecord} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
