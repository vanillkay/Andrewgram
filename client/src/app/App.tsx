import { useEffect } from 'react';
import { Theme } from 'components/Theme';
import AndrewgramRoutes from 'routes';

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
