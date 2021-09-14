import React, { useState, useEffect } from 'react';

import { 
  CssBaseline, 
  makeStyles, 
  Box, 
  IconButton
} from '@material-ui/core';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SaveIcon from '@material-ui/icons/Save';

import Cadaster from './components/Cadaster';
import Questions from './components/Questions';

import { getQuestions } from './services/questions';
import ContextForm from './contexts';

const useStyles = makeStyles({
  root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #6591d9, #1355bf)',
  },
  box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '610px',
      height: '400px',
      background: '#313131',
      borderRadius: '5px',
      boxShadow: '0 0 10px #000',
  },
  container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      paddingRight: '50px',
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  label: {
    fontFamily: 'Fira Sans',
    fontSize: '20px',
    color: '#212121',
  },
  buttonBefore: {
    alignSelf: 'flex-start',
    color: '#fff',
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginLeft: '-30px',
  },
});

function App() {
  const classes = useStyles();

  const [username, setUserName] = useState('');
  const [quantityQuestions, setQuantityQuestions] = useState(0);
  const [validateForm, setValidateForm] = useState(false);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    getQuestions(quantityQuestions)
        .then(response => {
            setQuestions(response.results);
        })
        .catch(error => {
            alert('Ocorreu um erro na busca dos resultados dentro da API.');
            console.log('erro: ', error);
        })
  }, [quantityQuestions]);

  const handleReturnPage = () => {
    setValidateForm(false);
    setUserName('');
    setQuantityQuestions(0);
  }

  const handleScore = () => {
    if(localStorage.getItem('score') === null || localStorage.getItem('scoreDetails') === null) {
      alert('Você não possui histórico');
    } else {
      const score = JSON.parse(localStorage.getItem('score'))
      const scoreDetails = JSON.parse(localStorage.getItem('scoreDetails'))
      console.log(score, scoreDetails);

      alert('Seu score está pronto para ser visualizado no console (F12).')
    }
  }

  return (
    <ContextForm.Provider value={{
      username, 
      setUserName, 
      quantityQuestions, 
      setQuantityQuestions, 
      validateForm, 
      setValidateForm
      }}
    >
      <CssBaseline />
      <main className={classes.root}>
            <Box className={classes.box}>
                {validateForm && (
                  <IconButton className={classes.buttonBefore} onClick={handleReturnPage}>
                    <NavigateBeforeIcon/>
                  </IconButton>
                )}
                  <IconButton className={classes.buttonBefore} onClick={handleScore}>
                    <SaveIcon/>
                  </IconButton>
                <div className={classes.container}>
                    {!validateForm && (
                      <Cadaster />
                    )}
                    <div className={classes.questionsContainer}>
                      {validateForm && (
                        <Questions 
                          questionsInfo={questions}
                          username={username}
                        />
                      )}
                    </div>
                </div>
            </Box>
        </main>
    </ContextForm.Provider>
  );
  
}

export default App;