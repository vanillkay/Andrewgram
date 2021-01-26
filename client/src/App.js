import './App.css';
import Auth from "./components/AuthComponents/Auth";
import {useEffect, useState} from "react";
import Theme from "./components/Theme/theme";
import Entry from "./components/EntryComponents/Entry";
import AndrewgramRoutes from "./routes/AndrewgramRoutes";


function App() {

    const [isEnter, setIsEnter] = useState(true);

    useEffect(() => {

        (async function csrf() {
            fetch('/csrf')
        })();

    }, [])
    return (

        <Theme>
            <div className="App">
                {/*<Auth/>*/}
                <AndrewgramRoutes/>
            </div>
        </Theme>
    );
}

export default App;
