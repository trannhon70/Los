import createSagaMiddleware from "@redux-saga/core";
import reducer from "./reducer";
import rootSaga from "./saga";
import { createLogger } from "redux-logger";
import { configureStore, Middleware } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  diff: true
});
console.log(logger)

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
 // middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: (gd) => gd().concat(...middlewares)
});

sagaMiddleware.run(rootSaga);

export default store;