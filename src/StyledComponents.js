import picostyle, {keyframes} from "picostyle";
import {h} from "hyperapp";

const ps = picostyle(h)
const zDepth2 = "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3)"
export const GridRow = ps("div")(({size}) =>({
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 40px)`
}))
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
export const CloseButtonX = ps("div")({
    position: "absolute",
    top:"-1px",
    right:"-1px",
    fontSize:"12px",
    cursor: "pointer"
})
export const NumberPadContainer = ps("div")({
    display: "grid",
    borderRadius: "5px",
    gridTemplateRows: "32px auto",
    fontSize: "24px",
    backgroundColor: "white",
    boxShadow: zDepth2,
    textAlign: "center"
})
export const NumberPad = ps("div")({
    display: "grid",
    gridTemplateColumns: "60px 60px 60px",
    gridAutoRows: "60px",
    placeItems: "center",
})
export const NumberPadBackground = ps("div")({
    position: "absolute",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    display: "grid",
    placeItems: "center",
    zIndex: "5",
    borderRadius: "5",
})

export const NumberButton = ps("button")({
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "background 0.8s",
    backgroundPosition: "center",
    border: "none",
    outline: "none",
    backgroundColor: "white",
    fontSize: "24px",
    ":active": {
        backgroundColor: "#6eb9f7",
        backgroundSize: "100%",
        transition: "background 0s"
    },
    ":hover": {
        background: " #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%"
    }
})
export const OptionsLayout = ps("div")({
    display: "grid",
    gridTemplateColumns: "80px 80px 80px",
    padding: "5px"
})
