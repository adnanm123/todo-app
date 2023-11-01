import React from 'react';
import Todo from "./Components/Todo";
import '@mantine/core/styles.css';
import { SettingsProvider } from "./Components/Context/Settings/SettingsContext";

import SettingsForm from './Components/SettingsForm';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Index';


export default class App extends React.Component {
  render() {
    return (
      <MantineProvider>
        <SettingsProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/settings" element={<SettingsForm />} />
            </Routes>
          </Router>

        </SettingsProvider>
      </MantineProvider>
    );
  }
}
