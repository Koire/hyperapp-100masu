const range = n => [...Array(n).keys()]
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export const randomList = () => shuffle(range(10))

export const createEmptyAnswers = () => [...Array(10).keys()].map(() =>
    Array.from({length:10},  () => ({
        isChecked: false,
        isCorrect: false,
        value: 0,
    }))
)

export const tVal = event => event.target.value

export const changeAnswer = (state, {row, col, value}) => {
    const newArray = [...state.answers]
    newArray[row][col].value = Number(value)
    return {
        ...state,
        answers: newArray
    }
}
export const sumArray = (acc, curVal) => acc + curVal
export const checkAnswers = state => {
    return {
        ...state,
        score: state.answers.map((row, rowIdx) =>
            row.map((answer, colIdx) =>
                answer.value === state.cols[colIdx] + state.rows[rowIdx]
            ).reduce(sumArray)
        ).reduce(sumArray),
        answers: state.answers.map((row, rowIdx) => (
            row.map((answer, colIdx) =>
                answer.value === state.rows[rowIdx]+state.cols[colIdx] ?
                    {...answer,
                        isChecked: true,
                        isCorrect: true} : {
                    ...answer,
                        isChecked: true,
                        isCorrect: false
                    }
            )
        ))
    }
}

export const createPuzzle = state => ({
    ...state,
    cols: randomList(),
    rows: randomList(),
    answers: createEmptyAnswers(),
    isCreated: true,
    isStarted: false,
    score: ""
})

export const startPuzzle = state => ({
    ...state,
    isStarted: true,
    startTime: Date.now()
})

export const updateTime = (state, currentTick) => ({
    ...state,
    timeElapsed: Date.now() - state.startTime
})
export const stopPuzzle = state => ({...state, isStarted: false})
