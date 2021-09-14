import { 
    useState, 
    Fragment, 
    useEffect,
} from 'react';

import { 
    makeStyles, 
    Box, 
    Button 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Fira Sans',
        color: '#fff',

        '& .MuiButton-contained': {
            margin: '5px',
        },
    },
    label: {
        fontFamily: 'Fira Sans',
        color: '#212121',
    },
    header: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '10px',
        fontWeight: '700',
        color: '#6591d9',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: '16px',
    },
    allContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    answer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    scoreDetails: {
        fontSize: '30px',
    }
}));

function Questions({ questionsInfo, username}) {
    const classes = useStyles();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);
    const [countIncorrect, setCountIncorrect] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);

    const getAnswers = () => {
        const answersFormatted = questionsInfo[currentQuestion]?.incorrect_answers.slice(0);
        answersFormatted.push(questionsInfo[currentQuestion]?.correct_answer);
        setAnswers(answersFormatted);
    }

    useEffect(() => {
        getAnswers(); 
    }, [currentQuestion]);

    useEffect(() => {
        if(showScore) {
            let scoreDetails = {
                name: username,
                answerCorrect: countCorrect,
                answerIncorrect: countIncorrect,
            };
            if (localStorage.getItem('scoreDetails') === null) {
                localStorage.setItem('scoreDetails', JSON.stringify([scoreDetails]))
            } else {
                localStorage.setItem('scoreDetails', JSON.stringify([...JSON.parse(localStorage.getItem('scoreDetails')), scoreDetails]))
            }
        }
    },[showScore])

    const handleAnswer = (answerOption) => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questionsInfo.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true)
        }

        answerOption === questionsInfo[currentQuestion].correct_answer
        ? setCountCorrect( countCorrect + 1)
         : setCountIncorrect( countIncorrect + 1)

        let score = {
            name: username,
            question: questionsInfo[currentQuestion].question,
            correct_answer: questionsInfo[currentQuestion].correct_answer,
            incorrect_answers: questionsInfo[currentQuestion].incorrect_answers,
            answer: answerOption
        }

        if (localStorage.getItem('score') === null) {
            localStorage.setItem('score', JSON.stringify([score]))
        } else {
            localStorage.setItem('score', JSON.stringify([...JSON.parse(localStorage.getItem('score')), score]))
        }
    };
                
    return ( 
        <Fragment>
        {!showScore && (
            <>
                <header className={`${classes.header} ${classes.root}`}>
                    <span>Category: {questionsInfo[currentQuestion]?.category}</span>
                    <span>Difficulty: {questionsInfo[currentQuestion]?.difficulty}</span>
                    <span>Questions: {currentQuestion + 1}/{questionsInfo.length}</span>
                </header>

                <section className={`${classes.container} ${classes.root}`}>
                    <p>{questionsInfo[currentQuestion]?.question}</p>
                    <Box className={classes.answer}>
                        {answers.sort().map(answerOption => (
                            <Button variant="contained" classes={{root: classes.label}} onClick={() => handleAnswer(answerOption)}>{answerOption}</Button>
                        ))}
                    </Box>
                </section>
            </>
        )}
            {showScore && (
               <section className={classes.container}>
                   <span className={`${classes.root} ${classes.scoreDetails}`}>You scored {countCorrect} out of {questionsInfo.length}</span>
               </section>
            )}
        </Fragment>
    )
 }

export default Questions;