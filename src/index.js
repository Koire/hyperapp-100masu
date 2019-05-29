import { app } from "hyperapp"
import RootPage from "./RootPage";
import {devMiddleWare} from "./util";
import { interval } from "@hyperapp/time";
import {createEmptyAnswers, randomList, updateTime} from "./actions";


const appSettings = {
    init: () => ({
        rows: randomList(),
        cols: randomList(),
        answers: createEmptyAnswers(),
        timeElapsed: 0,
        isCreated: true,
        isStarted: false
    }),
    view: RootPage,
    node: document.getElementById("app"),
    subscriptions: state => [
        state.isStarted && interval(updateTime, {
            delay: 1000
        })
    ]
}

process.env.NODE_ENV !== "production" ? app(appSettings, devMiddleWare) : app(appSettings)
