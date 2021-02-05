import './App.css';
import {useEffect} from "react";
import Theme from "./components/Theme/theme";
import AndrewgramRoutes from "./routes/AndrewgramRoutes";


function App() {


    useEffect(() => {

        (async function csrf() {
            await fetch('/csrf')
        })();

    }, [])
    return (

        <Theme>
            <div className="App">
                <AndrewgramRoutes/>
            </div>
        </Theme>
    );
}

export default App;
