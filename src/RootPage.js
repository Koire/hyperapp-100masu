import {GridRow} from "./StyledComponents";
import {changeAnswer, checkAnswers, createPuzzle, shuffleHeaders, startPuzzle, tVal} from "./actions";

export default (state) => (
    <div>
        <div style={{
            display:"grid",
            gridTemplateColumns: "200px 200px"
        }}>
            <h1>100ます勉強</h1>
            <h1>時間：{state.timeElapsed}</h1>
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
            <GridRow key="home">
                <div>+</div>
                {state.horizontal.map(it => <div>{it}</div>)}
            </GridRow>
            {state.vertical.map(
                (it, rowIdx) => (<GridRow id={it+rowIdx}><div>{it}</div>{state.answers[rowIdx].map(
                    (it2, colIdx) => (
                        <input type="number"
                               value={state.answers[rowIdx][colIdx].value}
                               oninput={[changeAnswer, e => ({row: rowIdx, col:colIdx, value: tVal(e)})]}
                        />)
                )}</GridRow>))}
        </div>}
        <div>
            {state.isCreated === false && <button onclick={createPuzzle} >create puzzle</button>}
            {state.isStarted  && <button onclick={checkAnswers}>check</button>}
            {state.isCreated && <button onclick={startPuzzle}>Start Puzzle</button>}
            {/*<button onclick={shuffleHeaders}>shuffle</button>*/}
        </div>
    </div>)
