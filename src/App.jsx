import React from 'react';
import Todo from './Components/Todo';
import { MantineProvider } from '@mantine/core';
import { SettingsProvider } from './Context/SettingsContext';
import './App.scss';


export default class App extends React.Component {
  render() {
    return (
      <MantineProvider>
        <SettingsProvider>
          <Todo />
        </SettingsProvider>
      </MantineProvider>
    );
  }
}
