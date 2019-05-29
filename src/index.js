import { app } from "hyperapp"
import RootPage from "./RootPage";
import {devMiddleWare} from "./util";


const appSettings = {
    init: _ => ({
        horizontal: [],
        vertical: [],
        answers: [],
        timeElapsed: "00:00",
        isCreated: false,
        isStarted: false
    }),
    view: RootPage,
    node: document.getElementById("app")
}

process.env.NODE_ENV !== "production" ? app(appSettings, devMiddleWare) : app(appSettings)
