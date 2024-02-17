import './navbar.css'
import {Link} from "react-router-dom";
import React from 'react';

export default function Navbar() {


    return (
        <>
            <div className='Navbar'>
            
                <div className='rightSide'>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/mypets'>My Pets </Link>
                    <Link to='/dashbord'>Dashbord </Link>
                </div>
                <div className='leftSide'>
                    <button>Login</button>
                    <button>SignUp</button>
                    <button>Logout</button>
                </div>
            </div>
        </>
    )
}
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// function TextLinkExample() {
//   return (
//     <Navbar className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             Signed in as: <a href="#login">Mark Otto</a>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }