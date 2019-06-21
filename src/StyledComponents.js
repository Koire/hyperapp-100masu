import picostyle, {keyframes} from "picostyle";
import {h} from "hyperapp";

const ps = picostyle(h)
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
export const AnswerCell = ps("input")(({isChecked, isCorrect}) =>({
    width: "100%",
    height: "100%",
    textAlign: "right",
    fontSize: "18px",
    backgroundColor: isChecked ? isCorrect ? "green" : "red" : "white"
}))
export const RootContainer = ps("div")({
    position: "ab"
})
