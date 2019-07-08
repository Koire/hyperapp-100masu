import picostyle, {keyframes} from "picostyle";
import {h} from "hyperapp";

const ps = picostyle(h)
const zDepth2 = "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)"
export const GridRow = ps("div")({
    display: "grid",
    gridTemplateColumns: "repeat(11, 40px)"
})
export const ColHeaderCell = ps("div")(({odd})=>({
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: odd ? "white" : "grey" ,
    height: "100%",
    width: "100%"
}))
export const RowHeaderCell = ps("div")(({odd})=>({
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: odd ? "white" : "grey" ,
    height: "100%",
    width: "100%"
}))
export const AnswerCell = ps("div")(({isChecked, isCorrect}) =>({
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    fontSize: "24px",
    backgroundColor: isChecked ? isCorrect ? "green" : "red" : "white"
}))
export const RootContainer = ps("div")({
    position: "ab"
})
export const NumberPad = ps("div")({
    display: "grid",
    gridTemplateColumns: "60px 60px 60px",
    gridAutoRows: "60px",
    placeItems: "center",
    fontSize: "24px",
    backgroundColor: "white",
    boxShadow: zDepth2
})
export const NumberButton = ps("div")({
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center"
})
