import PetsTable from '../Elements/Table/PetsTable'
import UserTable from '../Elements/Table/UserTable'
import './Dashbord.css'
import { useState, useEffect} from 'react'
import { fetchGetPetsAll, fetchGetUserAll } from '../API/fetchServer';


export default function Dashbord() {
  const [clickPets, setClickPets] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearchType(false); 
  }, []);

  const handleSearchType = async (clickPets) => {
    setClickPets(clickPets);
    setIsLoading(true);
    try {
      if (clickPets) {
        const responseData = await fetchGetPetsAll();
        setServerData([responseData]);
        
      } else {
        const responseData = await fetchGetUserAll();
        setServerData([responseData]);
    
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
    console.log('ser', serverData)
  };


  return (
    <>
      <div className="dashbord-container">
        <div className='dashbord-content'>
          <h1>Hi admin! Let's put things in order here!</h1>
          <h2><i>Bulldog Billy</i></h2>
        </div>
      <div className='ResultsTableButton'>
          <button onClick={() => handleSearchType(false)} className={clickPets ? "inactive-button" : "active-button"}>Users</button>
          <button onClick={() => handleSearchType(true)} className={clickPets ? "active-button" : "inactive-button"}>Pets</button>
        </div>
        <div className='ResultsTable'>
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            clickPets ?
              serverData.map((rowData) => <PetsTable key={rowData.id} rowData={rowData} />):
              serverData.map((rowData) => <UserTable key={rowData.id} rowData={rowData} />)
          )}

        </div>
      </div>

    </>
  )
}