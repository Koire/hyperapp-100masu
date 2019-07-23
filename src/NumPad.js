import {range} from "./util";
import {CloseButtonX, NumberButton, NumberPad, NumberPadBackground, NumberPadContainer} from "./StyledComponents";
import {buttonPush, closeNumpad, deleteNumber, submitValue} from "./actions";



export default ({currentNumber, currentX, currentY}) => (<NumberPadBackground data-cy="numpad">
        <NumberPadContainer id="numpadContainer" >
            <div style={{position: "relative"}}>
                <div data-cy="currentProblem">
                    {currentX} + {currentY} = {currentNumber}
                </div>
                <CloseButtonX onclick={closeNumpad} >X</CloseButtonX>
            </div>
            <NumberPad id="numberPad" data-cy="numberPad">
                {range(10).map(it => it > 0 && <NumberButton id={it} data-cy={`numBtn${it}`} onclick={[buttonPush, it]}>{it}</NumberButton>)}
                <NumberButton id="button0" data-cy="numBtn0" onclick={[buttonPush, 0]}>0</NumberButton>
                <NumberButton id="buttonx" data-cy="numBtnX"  onclick={deleteNumber}>X</NumberButton>
                <NumberButton id="buttonok" data-cy="numBtnOk"  onclick={submitValue}>OK</NumberButton>
            </NumberPad>
        </NumberPadContainer>
</NumberPadBackground>)
