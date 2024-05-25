// import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./bugs";
// import reducer from "./projects";
import reducer from "./reducer";
import logger from "./middleware/logger";
// import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default function configureAppStore(){   
    return configureStore({
        reducer,
        // middleware: [logger],
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger("console")),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            // logger({destination: "console"}), 
            toast, 
            api,
        ),
    });
} 