import React from "react";
import ColorGame from "../color/ColorGame";
import { Navigate, useNavigate } from "react-router-dom";
import GuessTheColorGame from "../guessGames/guess-the-color/GuessTheColorGame.jsx";
import img from "../../../assets/img/abstract/i6.png";
const routesConfig = [
    {
        id: "unit",
        label: "Color Game",
        path: "/color-game",
        url: img,
    },
    {
        id: "paint",
        label: "Paint Game",
        path: "/paint-game",
        url: img,
    },
    {
        id: "grid",
        label: "Saap sidhi",
        path: "animations",
        url: img,
    },
    {
        id: "sql",
        label: "x 0",
        path: "sql",
        url: img,
    },
];

const GameMenu = () => {
    const navigate = useNavigate();
    return (
        <div className=" p-20">
            <div className=" flex flex-wrap gap-20 justify-center items-center">
                {routesConfig.map((route) => {
                    return (
                        <div
                            class="w-full max-w-xs bg-white border hover:scale-95 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            onClick={() => {
                                navigate(route.path);
                            }}
                        >
                            <img
                                class="p-5 rounded-t-3xl w-80 h-40 "
                                src={route.url}
                                alt="product"
                            />

                            <div class="px-5 pb-5">
                                <h5 class="text-2xl mb-3 text-center font-roboto tracking-tight text-gray-900 dark:text-white">
                                    {route.label}
                                </h5>

                                <div class="flex justify-center">
                                    <p class="text-white bg-blue-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-600 hover:scale-95 dark:focus:ring-blue-800">
                                        Play Now
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GameMenu;
