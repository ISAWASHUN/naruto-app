import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useState([]);


  useEffect(() => {
    fetchCharacters();
  }, [])

  const fetchCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    const result = await axios.get(apiUrl);
    setCharacters(result.data.characters);
  }

  return (
    <div className="container">
      <main>
        <div className='cards-container'>
          {characters.map((character) => (
            <div key={character.id} className='card'>
              <img src={character.images[0] != null ? character.images[0] : 'dummy.png'} alt={character.name} />
              <div className='card-content'>
                <h3 className='card-title'>{character.name}</h3>
                <p className='card-description'>
                  {character.debut != null ? character.debut.appearsIn : 'No debut'}
                </p>
                <div className='card-footer'>
                  <span className=''>
                    {character.personal?.affiliation ?? 'No affiliation'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
