import {range} from "./util";

export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export const tVal = event => event.target.value
export const randomList = (size) => shuffle(range(size))

export const changeSize = (state, size) => ({...state, size: parseInt(tVal(size))})
export const createEmptyAnswers = (size) => [...Array(size).keys()].map(() =>
    Array.from({length: size},  () => ({
        isChecked: false,
        isCorrect: false,
        value: 0,
    }))
)
export const showNumpad = (state, [x,y]) => ({
    ...state,
    numpadIsShowing: true,
    currentX: state.rows[x],
    currentY: state.cols[y],
    currentCell:[x,y],
    isStarted: true,
    startTime: state.isStarted ? state.startTime : Date.now()
})


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
        isStarted: false,
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
    cols: randomList(state.size),
    rows: randomList(state.size),
    answers: createEmptyAnswers(state.size),
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

export const resetPuzzle = state => ({
    rows: randomList(10),
    cols: randomList(10),
    answers: createEmptyAnswers(),
    timeElapsed: 0,
    isCreated: false,
    isStarted: false,
    numpadIsShowing: false,
    size: 10,
})
