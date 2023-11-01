import React, { useEffect, useState, useContext } from 'react';
import useForm from '../hooks/form';
import { v4 as uuid } from 'uuid';
import List from '../lists/list';
import { Button, TextInput, Paper, Text, Slider, Grid, Pagination } from '@mantine/core';
import './Todo.scss';
import { SettingsContext } from '../Context/Settings/SettingsContext';
import SettingsForm from '../SettingsForm';

const Todo = () => {
  const [settings] = useContext(SettingsContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / settings.itemsToShow);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  // Assuming sort by item text, change accordingly
  const sortedList = [...list].sort((a, b) => a.text.localeCompare(b.text));

  const displayedTodos = sortedList.slice(
    (currentPage - 1) * settings.itemsToShow,
    currentPage * settings.itemsToShow
  );

  return (
    <Grid>
      <Grid.Col span={6}>
        <div className="todo-app">
          <Paper padding="md" className="todo-header" data-testid="todo-header">
            <Text align="center" size="xl">
              To Do List: {incomplete} items pending
            </Text>
          </Paper>

          <div>
            <h2>Current Settings:</h2>
            <ul>
              <li>Show Completed ToDos: {settings.hideCompleted ? 'Yes' : 'No'}</li>
              <li>Items per page: {settings.itemsToShow}</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <Paper padding="md" className="todo-form">
              <Text size="lg">Add To Do Item</Text>

              <div className="input-group">
                <TextInput label="To Do Item" placeholder="Item Details" onChange={handleChange} name="text" />
              </div>

              <div className="input-group">
                <TextInput label="Assigned To" placeholder="Assignee Name" onChange={handleChange} name="assignee" />
              </div>

              <div className="input-group">
                <Text>Difficulty</Text>
                <Slider onChange={handleChange} defaultValue={defaultValues.difficulty} min={1} max={5} name="difficulty" />
              </div>

              <Button type="submit" fullWidth>
                Add Item
              </Button>
            </Paper>
          </form>

          <SettingsForm />
          <Pagination 
            page={currentPage} 
            total={totalPages} 
            onPageChange={(event) => setCurrentPage(event.value)} 
          />
        </div>
      </Grid.Col>

      <Grid.Col span={6}>
        <List list={displayedTodos} setList={setList} />
      </Grid.Col>
    </Grid>
  );
};

export default Todo;
