const devExtension = window.__REDUX_DEVTOOLS_EXTENSION__
const devTools = devExtension ? devExtension.connect() : false

export const devMiddleWare = dispatch => devExtension ? (action, ...props) => {
    if (typeof action !== 'function') {
        return dispatch(action, ...props)
    } else {
        const news = dispatch(action, ...props)
        devTools && devTools.send(action.name, news)
        return news
    }
} : (action, ...props) => dispatch(action,...props)
