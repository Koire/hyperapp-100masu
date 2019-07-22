import { app } from "hyperapp"
import RootPage from "./RootPage";
import {devMiddleWare} from "./util";
import { interval } from "@hyperapp/time";
import {createEmptyAnswers, randomList, updateTime} from "./actions";

const ToggleBlur = (state, {type}) => ({
    ...state,
    isFocused: type === "focus",
    isStarted: state.isStarted && type === "focus"
})

const fx = (dispatch, props) => {
    const eventListener = event => dispatch(props.action, event)
    window.addEventListener("focus", eventListener)
    window.addEventListener("blur", eventListener)
    return () => {
        window.removeEventListener("focus", eventListener)
        window.removeEventListener("blur", eventListener)
    }
}
const BlurWatcher = (props) =>  [fx, {
    action: props.action
}]

//TODO: shuffle the current list instead of recreating it.
const appSettings = {
    init: {
        rows: randomList(10),
        cols: randomList(10),
        answers: createEmptyAnswers(),
        timeElapsed: 0,
        isCreated: false,
        isStarted: false,
        numpadIsShowing: false,
        size: 10,
    },
    view: RootPage,
    node: document.getElementById("app"),
    subscriptions: state => [
        state.isStarted && interval(updateTime, {
            delay: 10
        }),
        BlurWatcher({action: ToggleBlur})
    ]
}

process.env.NODE_ENV !== "production" ? app(appSettings, devMiddleWare) : app(appSettings)
