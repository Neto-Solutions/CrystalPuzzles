import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import kidsRouter from "./kids.router";
import methodistRouter from "./methodist.router";
import trainerRouter from "./trainer.router";
import checkInRouter from "./check.in.router";

export default function createRouter(role) {
    return createBrowserRouter(
        [
            ...checkInRouter,
            {
                path: "/",
                element: <Root />,
                loader: () => {
                    return null;
                }, // loader to fetch data before render
                children: (role === "kids" && kidsRouter) ||
                    (role === "methodist" && methodistRouter) ||
                    (role === "trainer" && trainerRouter)
            },
        ]
    )
}