import {range} from "./util";
import {NumberButton, NumberPad} from "./StyledComponents";

const buttonPush = (state, numpadValue) => {
    return {
    ...state,
        currentNumber: state.currentNumber ? state.currentNumber + `${numpadValue}` : `${numpadValue}`
    }
}
const deleteNumber = (state) => ({
    ...state,
    currentNumber: state.currentNumber.length > 0 ? state.currentNumber.slice(0, -1) : ""
})
const submitValue = (state) => {
    const newArray = [...state.answers]
    newArray[state.currentCell[0]][state.currentCell[1]].value = Number(state.currentNumber)
    return   {
    ...state,
    numpadIsShowing: false,
    newArray,
        currentNumber: ""

}}
const hideNumPad = state => ({
    ...state,
    numpadIsShowing: false
})

export default ({currentNumber, currentX, currentY}) => (<div style={{
    position: "fixed",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    display: "grid",
    placeItems: "center",
    zIndex: "5"
}} data-cy="numpad">
    <div style={{
        backgroundColor: "white"
    }}>
        <div style={{
            fontSize: "24px",
            textAlign: "center"
        }} data-cy="currentProblem">
            {currentX} + {currentY} = {currentNumber}
        </div>
        <NumberPad id="numpad" >
            {range(10).map(it => it > 0 && <NumberButton id={it} data-cy={`numBtn${it}`} onclick={[buttonPush, it]}>{it}</NumberButton>)}
            <NumberButton id="button0" data-cy="numBtn0" onclick={[buttonPush, 0]}>0</NumberButton>
            <NumberButton id="buttonx" data-cy="numBtnX"  onclick={deleteNumber}>X</NumberButton>
            <NumberButton id="buttonok" data-cy="numBtnOk"  onclick={submitValue}>OK</NumberButton>
        </NumberPad>
    </div>
</div>)
