import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import Nav from "./components/nav/Nav";
import GameMenu from "./pages/games/gameMenu/GameMenu";
import GuessTheColorGame from "./pages/games/guessGames/guess-the-color/GuessTheColorGame";
import PaintGame from "./pages/games/paintGame/PaintGame";
import ParentDashboard from "./pages/parent/ParentDashboard";
import { auth } from "./firebase/firebase";
import { faL } from "@fortawesome/free-solid-svg-icons";
import useStore from "./store/store";

export default function App() {
    const setUserUid = useStore((state) => state.setUserUid);

    const [login, setLogin] = React.useState(false)
    const [displayName, setDisplayName] = React.useState("");
    const [uid, setUid] = React.useState(false);

    React.useEffect(() => { 
        auth.onAuthStateChanged((user) => {
            if (user.uid) {
                setUid(user.uid)
                setLogin(true)
                setUserUid(user.uid)
                setDisplayName(user.displayName || "Anonymous");
            } else {
                setLogin(false)
                console.log("no user")
            }
        });
    }, []);


    return (
        <Router>
            <Nav user={login} setLogin={setLogin}/>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route
                    exact
                    path="/color-game"
                    element={<GuessTheColorGame />}
                />
                <Route exact path="paint-game" element={<PaintGame />} />
                <Route exact path="/game-menu" element={<GameMenu />} />
                <Route exact path="/parent-dashboard" element={<ParentDashboard name={displayName} uid={uid}/>}/>
            </Routes>
        </Router>
    );
}
