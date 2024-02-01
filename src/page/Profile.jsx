import ProfileTable from '../components/ProfileTable'
import './Profile.css'

export default function Profile() {


  return (
    <>
      <div className="profile-container">
        <div className='profile-content'>
        <h1>Profile</h1>
       <ProfileTable/>
        </div>
      </div>
      </>
    )
}