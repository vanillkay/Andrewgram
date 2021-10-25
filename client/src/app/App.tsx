import { useEffect } from 'react';
import Theme from 'components/Theme/theme';
import AndrewgramRoutes from 'routes/AndrewgramRoutes';

import './App.css';

function App() {
  useEffect(() => {
    (async () => {
      await fetch('/csrf');
    })();
  }, []);
  return (
    <Theme>
      <div className="App">
        <AndrewgramRoutes />
      </div>
    </Theme>
  );
}

export default App;
