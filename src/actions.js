const range = n => [...Array(n).keys()]
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const randomList = () => shuffle(range(10))

const createEmptyAnswers = () => [...Array(10).keys()].map(() =>
    Array.from({length:10},  () => ({
        isChecked: false,
        isCorrect: false,
        value: 0
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
export const checkAnswers = state => ({
    ...state,
    score: state.answers.map((row, rowIdx) =>
        row.map((answer, colIdx) => answer.value === state.horizontal[colIdx] + state.vertical[rowIdx]
        ).reduce(sumArray)
    ).reduce(sumArray)
})

export const shuffleHeaders = (state) => ({
    ...state,
    horizontal:randomList(),
    vertical:randomList(),
    answers: createEmptyAnswers()
})

export const createPuzzle = state => ({
    ...state,
    horizontal: randomList(),
    vertical: randomList(),
    answers: createEmptyAnswers(),
    isCreated: true
})

export const startPuzzle = state => ({

})
