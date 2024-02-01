import './Home.css'
import {useNavigate} from "react-router-dom";
// import {fetch__} from '../API/fetchServer'
// import { useTweet } from '../hook/TweetListContext';

export default function Home() {
  const navigate = useNavigate();
  const ToSearchPage = (e) =>{
  navigate('/search')
  }

  return (
    <>
      <div className="home-container">
        <div className='home-content'><h1>We help you to adopt pet</h1>
        <h4>Are you ready to welcome your new best friend into your life?</h4>
        <button onClick={ToSearchPage}>Start search</button>
        <p><i>To use full functions please Login or Singup</i></p>
        </div>
      </div>
    </>
  )
}