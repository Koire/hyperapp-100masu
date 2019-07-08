import {AnswerCell, ColHeaderCell, GridRow, RowHeaderCell} from "./StyledComponents";
import {changeAnswer, checkAnswers, createPuzzle, startPuzzle, stopPuzzle, tVal} from "./actions";
import NumPad from "./NumPad";

const elapsedTimeFormat = ms => (
    `${Math.floor(ms / 60 / 1000)}`.padStart(2, "0") + ":" +
    `${Math.floor((ms % (60*1000) / 1000))}`.padStart(2,"0") + "."+
    `${Math.floor(ms%1000/10)}`.padStart(2,"0")
)

const showNumpad = (state, [x,y]) => ({
    ...state,
    numpadIsShowing: true,
    currentX: state.rows[x],
    currentY: state.cols[y],
    currentCell:[x,y],
    isStarted: true,
    startTime: state.isStarted ? state.startTime : Date.now()
})

export default (state) => (
    <div style={{
        display: "grid",
        placeItems: "center",
        width: "100%"
    }}>
        <div style={{
            display:"grid",
            gridTemplateColumns: "200px 250px"
        }}>
            <h3>100ます勉強</h3>
            <h3>時間：{elapsedTimeFormat(state.timeElapsed)}</h3>
        </div>
        <br />
        <h2>{state.score}</h2>
        {state.isCreated && <div
            style={{
                display: "grid",
                gridTemplateRows: "repeat(11, 40px)",
                fontSize: "24px"
            }}>
            {state.numpadIsShowing && <NumPad {...state}/>}
            <GridRow id="one">
                <ColHeaderCell key="00" odd>+</ColHeaderCell>
                {state.cols.map((it,idx) => <ColHeaderCell id={idx} odd={idx%2}>{it}</ColHeaderCell>)}
            </GridRow>
            {state.rows.map(
                (it, rowIdx) => (<GridRow id="0ne"><RowHeaderCell id={it+rowIdx} odd={rowIdx%2}>{it}</RowHeaderCell>{state.answers[rowIdx].map(
                    (it2, colIdx) => (
                        <AnswerCell
                               odd={colIdx%2}
                               value={it2.value}
                               onclick={[showNumpad, [rowIdx, colIdx]]}
                               isChecked={it2.isChecked}
                               isCorrect={it2.isCorrect}
                        >{it2.value}</AnswerCell>)
                )}</GridRow>))}
        </div>}
        <div>
            {state.isCreated === false && <button onclick={createPuzzle} >create puzzle</button>}
            {state.isCreated && state.isStarted === false && <button onclick={checkAnswers}>check</button>}
            {state.isCreated && state.isStarted === false && <button onclick={startPuzzle}>Start Puzzle</button>}
            {state.isCreated && state.isStarted && <button onclick={stopPuzzle}>Stop Puzzle</button>}
            {state.isCreated && <button onclick={createPuzzle}> Reset</button>}
        </div>
    </div>)
