import {AnswerCell, GridRow, HeaderCell} from "./StyledComponents";
import {changeAnswer, checkAnswers, createPuzzle, startPuzzle, stopPuzzle, tVal} from "./actions";

const elapsedTimeFormat = ms => (
    `${Math.floor(ms / 60 / 1000)}`.padStart(2, "0") + ":" +
    `${(ms % (60*1000) / 1000).toFixed(0)}`.padStart(2,"0")
)

export default (state) => (
    <div>
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
                width: "100%",
                height: "100%",
                fontSize: "24px"
            }}>
            <GridRow id="0ne">
                <HeaderCell key="00" odd>+</HeaderCell>
                {state.cols.map((it,idx) => <HeaderCell id={idx} odd={idx%2}>{it}</HeaderCell>)}
            </GridRow>
            {state.rows.map(
                (it, rowIdx) => (<GridRow id="0ne"><HeaderCell id={it+rowIdx} odd={rowIdx%2}>{it}</HeaderCell>{state.answers[rowIdx].map(
                    (it2, colIdx) => (
                        <AnswerCell type="number"
                               odd={colIdx%2}
                               value={it2.value}
                               oninput={[changeAnswer, e => ({row: rowIdx, col:colIdx, value: tVal(e)})]}
                               disabled={(state.isStarted === false && state.isCreated === false)}
                               isChecked={it2.isChecked}
                               isCorrect={it2.isCorrect}
                        />)
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
