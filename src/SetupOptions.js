import {range} from "./util";
import {changeSize, createPuzzle} from "./actions";
import {OptionsLayout} from "./StyledComponents";

export default ({size}) => (<OptionsLayout id="optionsLayout">
    <label for="sizeControl">大きさ: </label>
    <select data-cy="sizeControl" id="sizeControl" onchange={changeSize} >
        {range(20).map(it => (<option value={it+1} selected={it+1 === size}>{it+1}x{it+1}</option>))}
    </select>
    <button data-cy="createPuzzleBtn" onclick={createPuzzle}>作成</button>
</OptionsLayout>)
