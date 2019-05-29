import picostyle from "picostyle";
import {h} from "hyperapp";

const ps = picostyle(h)
export const GridRow = ps("div")({
    display: "grid",
    gridTemplateColumns: "repeat(11, 40px)"
})
