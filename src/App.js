import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    fetchCharacters();
  }, [])

  const fetchCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    const result = await axios.get(apiUrl);
    console.log(result);
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
