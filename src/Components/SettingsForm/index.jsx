import React, { useContext, useState } from 'react';
import { SettingsContext } from '../Context/Settings/SettingsContext';
import { Container, Text, Paper, Input, Checkbox, Button, Select } from '@mantine/core';

function SettingsForm() {
  const [settings, setSettings] = useContext(SettingsContext);
  const [formValues, setFormValues] = useState(settings);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formValues);
  };

  return (
    <Container align="left" size={1200}>
      <Paper style={{ width: '50%', marginRight: '20px' }}>
        {/* ... (existing form code) */}
        <Text align="left">Default Sort Field:</Text>
        <Select
          data={['name', 'date', 'priority']}
          value={formValues.sortField}
          onChange={(value) => setFormValues((prev) => ({ ...prev, sortField: value }))}
        />
      </Paper>
      <Paper style={{ width: 'calc(50% - 20px)' }}>
        <Text align="left" size="xl">Current Settings:</Text>
        <Text>Show Completed ToDos: {formValues.hideCompleted ? "Yes" : "No"}</Text>
        <Text>Items per page: {formValues.itemsToShow}</Text>
        <Text>Sort by: {formValues.sortField}</Text>
      </Paper>
    </Container>
  );
}

export default SettingsForm;
