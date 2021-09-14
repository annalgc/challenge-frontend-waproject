import { api } from './api';

export async function getQuestions(quantityQuestions) {
    const response = await api.get(`https://opentdb.com/api.php?amount=${quantityQuestions}`)

    const results = response.data.results.map(result => ({
        category: result.category,
        correct_answer: result.correct_answer,
        difficulty: result.difficulty,
        incorrect_answers: result.incorrect_answers,
        question: result.question
    }))

    return { results }
};