import {h, app} from "hyperapp"
import picostyle from "picostyle"

const range = n => [...Array(n).keys()]
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const randomList = () => shuffle(range(10))

const ps = picostyle(h)
const GridRow = ps("div")({
    display: "grid",
    gridTemplateColumns: "repeat(11, 40px)"
})

const changeAnswer = (state, {row, col, value}) => {
    const newArray = [...state.answers]
    newArray[row][col].value = Number(value)
    return {
        ...state,
        answers: newArray
    }
}
const sumArray = (acc, curVal) => acc + curVal
const checkAnswers = state => ({
        ...state,
        score: state.answers.map((row, rowIdx) =>
            row.map((answer, colIdx) => answer.value === state.horizontal[colIdx] + state.vertical[rowIdx]
            ).reduce(sumArray)
        ).reduce(sumArray)
})
const shuffleHeaders = (state) => ({
    ...state,
    horizontal:randomList(),
    vertical:randomList()
})

const tVal = event => event.target.value

const appSettings = {
    init: _ => ({
        horizontal: randomList(),
        vertical: randomList(),
        answers: range(10).map(it => Array.from({length:10},  () => ({
            isChecked: false,
            isCorrect: false,
            value: 0
        }))
        )
    }),
    view: state => (
        <div>
            <h2>{state.score}</h2>
            <button onclick={checkAnswers}>check</button>
            <button onclick={shuffleHeaders}>shuffle</button>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "repeat(11, 40px)",
                    width: "100%",
                    height: "100%",
                    fontSize: "24px"
            }}>
                <GridRow key="home">
                    <div>+</div>
                    {state.horizontal.map(it => <div>{it}</div>)}
                </GridRow>
                {state.vertical.map(
                    (it, rowIdx) => (<GridRow id={it+rowIdx}><div>{it}</div>{state.answers[rowIdx].map(
                        (it2, colIdx) => (<input type="number" value={state.answers[rowIdx][colIdx].value} oninput={[changeAnswer, e => ({row: rowIdx, col:colIdx, value: tVal(e)})]} />)
                    )}</GridRow>))}
            </div>
        </div>),
    node: document.getElementById("app")
}
if (process.env.NODE_ENV !== "production") {
    const devExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    const devTools = devExtension ? devExtension.connect() : false
    app(appSettings, dispatch => (action, ...props) => {
        if (typeof action !== 'function') {
            return dispatch(action, ...props)
        } else {
            const news = dispatch(action, ...props)
            devTools && devTools.send(action.name, news)
            return news
        }
    })
} else {
    app(appSettings)
}
