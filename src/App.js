import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters(2);
  }, [])

  const limit = 15;

  const fetchCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    const result = await axios.get(apiUrl, {
      params: {
        page,
        limit
      }
    });
    setCharacters(result.data.characters);
    setIsLoading(false);
  }

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className='logo'/>
        </div>
      </div>
      {isLoading ? ( <div className="loading">Loading...</div> ): (
      <main>
        <div className='card-container'>
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
        <div className="pager">
          <button className="prev" disabled={page === 1} onClick={handlePrev}>Previous</button>
          <span className="page-number">{page}</span>
          <button className="next" disabled={limit > characters.length} onClick={handleNext}>Next</button>
        </div>
      </main>
      )}
    </div>
  );
}

export default App;
