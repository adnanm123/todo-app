import React from 'react';
import Todo from './Components/Todo';
import '@mantine/core/styles.css';
import { SettingsProvider } from './Context/Settings/SettingsContext';
import SettingsForm from './Components/SettingsForm/index';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header/Index';
import LoginProvider from './Context/Auth/context';
import Login from './Components/Login/Login';
import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <MantineProvider>
        <LoginProvider>
          <SettingsProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Todo />} />
                <Route path="/settings" element={<SettingsForm />} />
                {/* Redirect unauthenticated users to the login page */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </SettingsProvider>
        </LoginProvider>
      </MantineProvider>
    );
  }
}




// import React from 'react';
// import Todo from './Components/Todo';
// // import Login from './Components/Login/login';
// import Header from './Components/Header/Index';
// import '@mantine/core/styles.css';
// import { SettingsProvider } from './Context/Settings/SettingsContext';
// import { MantineProvider} from '@mantine/core';
// import  LoginProvider  from './Context/Auth/context'; 
// import Auth from './Components/Auth/Auth';

// export default class App extends React.Component {
//   render() {
//     return (
//       <SettingsProvider>
//         <LoginProvider>
//           <MantineProvider>
//             <Header />
//             {/* <Login /> */}
//               <Auth>
//                 <Todo />
//               </Auth>
//           </MantineProvider>
//         </LoginProvider>
//       </SettingsProvider>
//     );
//   }
// }