import './App.css';
import Auth from "./components/AuthComponents/Auth";
import {useEffect} from "react";

function App() {


    useEffect( () => {
        async function csrf() {
            fetch('/csrf')
        }
        csrf();

    }, [])
    return (


        <div className="App">
            <Auth/>
        </div>
    );
}

export default App;
