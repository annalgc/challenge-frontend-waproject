import React, { useContext } from 'react';

import { 
    makeStyles, 
    IconButton, 
    TextField,
    Typography
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ContextForm from '../../contexts';

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            fontFamily: 'Fira Sans',
            fontSize: '14px',
            color: '#fff',
        },
        '& .MuiFormLabel-root': {
            fontFamily: 'Fira Sans',
            fontSize: '14px',
            color: '#fff',
        },
        '& .MuiInput-underline:before': {
            borderColor: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderColor: '#fff',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        alignSelf: 'center',
        paddingTop: '10px',
        marginBottom: '30px',
        font: '700 normal 36px/1em Fira Sans, sans-serif',
        color: '#fff',
    },
    username: {
        marginBottom: '20px',
    },
    quantity: {
        marginBottom: '15px'
    },
    confirm: {
        alignSelf: 'flex-end',
        color: '#fff',
    },
});

function Cadaster() {
    const classes = useStyles();

    const { 
        username, 
        setUserName, 
        quantityQuestions, 
        setQuantityQuestions, 
        validateForm,
        setValidateForm
    } = useContext(ContextForm);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username) {
            alert('O campo nome é obrigatório.');
            setValidateForm(false);
        } else {
            setValidateForm(true);
        }
    }

    return (
        <section className={classes.container}>
            <Typography variant='h2' component='h2' className={classes.title}>Hello everyone.</Typography>
            <form className={classes.container} onSubmit={event => handleSubmit(event)}>
                <TextField 
                    label='Qual é o seu nome?'
                    variant='standard'
                    classes={{root: classes.root}}
                    className={classes.username}
                    type='text'
                    onChange={e => setUserName(e.target.value)}
                    name='username'
                />
                <TextField 
                    label='Selecione a quantidade de perguntas'
                    variant='standard'
                    className={classes.quantity}
                    classes={{root: classes.root}}
                    type='number'
                    InputProps={{ inputProps: {max: 20, min: 1}}}
                    onChange={e => setQuantityQuestions(e.target.value)}
                    name='quantityQuestions'
                    value={quantityQuestions}
                />
                {username && (
                    <IconButton type="submit" className={classes.confirm}>
                        <NavigateNextIcon />
                    </IconButton>
                )}
            </form>
        </section>
    )
}

export default Cadaster;