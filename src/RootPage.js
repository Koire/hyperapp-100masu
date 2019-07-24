import {AnswerCell, ColHeaderCell, GridRow, RowHeaderCell} from "./StyledComponents";
import {resetPuzzle, showNumpad, checkAnswers, createPuzzle, startPuzzle, stopPuzzle, tVal} from "./actions";
import NumPad from "./NumPad";
import SetupOptions from "./SetupOptions";

const elapsedTimeFormat = ms => (
    `${Math.floor(ms / 60 / 1000)}`.padStart(2, "0") + ":" +
    `${Math.floor((ms % (60*1000) / 1000))}`.padStart(2,"0") + "."+
    `${Math.floor(ms%1000/10)}`.padStart(2,"0")
)


export default (state) => (
    <div style={{
        position: "relative"
    }}>
        <h3>100ます勉強</h3>
        {!state.isCreated && <SetupOptions  {...state}/>}
        <div style={{
            display:"grid",
            gridTemplateColumns: "200px 250px"
        }}>
            <h3>時間：{elapsedTimeFormat(state.timeElapsed)}</h3>
        </div>
        <br />
        <h2 data-cy="score">{state.score}</h2>
        {state.isCreated && <div
            style={{
                display: "grid",
                gridTemplateRows: `repeat(${state.size}, 40px)`,
                fontSize: "24px",
                position: "relative",
                width: `${state.size*40}px`,
                height: `${state.size*40}px`
            }}>
            {state.numpadIsShowing && <NumPad {...state}/>}
            <GridRow id="one" size={state.size+1}>
                <ColHeaderCell key="00" odd>+</ColHeaderCell>
                {state.cols.map((it,idx) => <ColHeaderCell data-cy={`colHead${idx}`} id={idx} odd={idx%2}>{it}</ColHeaderCell>)}
            </GridRow>
            {state.rows.map(
                (it, rowIdx) => (<GridRow size={state.size+1} id="0ne">
                    <RowHeaderCell data-cy={`rowHead${rowIdx}`} id={it+rowIdx} odd={rowIdx%2}>{it}</RowHeaderCell>{state.answers[rowIdx].map(
                    (it2, colIdx) => (
                        <AnswerCell
                            data-cy={`cell${rowIdx}${colIdx}`}
                               odd={colIdx%2}
                               value={it2.value}
                               onclick={[showNumpad, [rowIdx, colIdx]]}
                               isChecked={it2.isChecked}
                               isCorrect={it2.isCorrect}
                        >{it2.value}</AnswerCell>)
                )}</GridRow>))}
            <div>
                {state.isCreated && <button data-cy="checkAnswerBtn" onclick={checkAnswers}>check</button>}
                {state.isCreated && state.isStarted === false && <button data-cy="startBtn" onclick={startPuzzle}>Start Puzzle</button>}
                {state.isCreated && state.isStarted && <button data-cy="stopBtn" onclick={stopPuzzle}>Stop Puzzle</button>}
                {state.isCreated && <button onclick={resetPuzzle} data-cy="resetBtn"> Reset</button>}
            </div>
        </div>}

    </div>)
