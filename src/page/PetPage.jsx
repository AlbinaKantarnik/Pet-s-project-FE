import { AdoptIcon } from '../Elements/Icon/AdoptIcon'
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon'
import { TimeIcon } from '../Elements/Icon/TimeIcon'
import './PetPage.css'
import { useParams } from 'react-router-dom';

const PetPage = ({rowData}) => {
  const { id_pet } = useParams();
  
  if (!rowData) {
    return <div className='Loading'>Loading...</div>;
  }
  if (!rowData.id || rowData.id !== id_pet) {
    return <div className='Loading'>Pet data not found...</div>;
  }

  return (
    <>
      <div className="petPage-container">
        <div className='petPage-content'>
          <div className='Card-petPage'>
            <h2>Hi friend!</h2>
            <div className='CardTitle'><h2><i>My name is {rowData.name}</i></h2></div>
            <div className='CardBlock1'>
            <div className='CardImgPage' style={{ backgroundImage: `url(${rowData.picture})` }} />
            <div className='CardText' >
                <h5>I'm a {rowData.color} {rowData.type}({rowData.breed})</h5>
                <h5>My height is {rowData.height} sm, weight: {rowData.weight} kg.</h5>
                <h5>I'm  {rowData.name_status} now.</h5>
              </div>
            </div>
            <div className='CardBlock2'>
              <div className='CardText' >
                <h5>Am I hypoallergenic? {rowData.hypoallergenic}!</h5>
                <h5>{rowData.bio}</h5>
                <h5>{rowData.dietary_restrictions}</h5>
              </div>
          
              <div className='IconCard'>
                <AdoptIcon /> <TimeIcon /><FavoriteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PetPage;