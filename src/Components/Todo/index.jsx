import React, { useState, useContext } from 'react';
import { Button, TextInput, Slider, Text, Pagination } from '@mantine/core';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import List from '../../lists/list';  // Importing the List component
import { SettingsContext } from '../../Context/SettingsContext';
import './Todo.scss';


const Todo = () => {
  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.filter(item => !item.complete).length / (settings?.displayItems || 3));

  const defaultValues = settings?.defaultValues || {};
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList(prevList => [...prevList, item].sort((a, b) => a.difficulty - b.difficulty));
  }

  const startIndex = (currentPage - 1) * (settings?.displayItems || 3);
  const endIndex = startIndex + (settings?.displayItems || 3);
  const displayList = list.filter(item => !item.complete).slice(startIndex, endIndex);

  return (
    <>
      <header data-testid="todo-header">
        <Text align="center" size="xl">To Do List: {displayList.length} items pending</Text>
      </header>

      <form onSubmit={handleSubmit}>
        <Text align="center" size="lg">Add To Do Item</Text>
        <label>
          <span>To Do Item</span>
          <TextInput onChange={handleChange} name="text" placeholder="Item Details" />
        </label>
        <label>
          <span>Assigned To</span>
          <TextInput onChange={handleChange} name="assignee" placeholder="Assignee Name" />
        </label>
        <label>
          <span>Difficulty</span>
          <Slider onChange={handleChange} defaultValue={defaultValues?.difficulty || 3} min={1} max={5} name="difficulty" />
        </label>
        <label>
          <Button type="submit">Add Item</Button>
        </label>
      </form>

      <List tasks={displayList} />
      <Pagination
          total={totalPages}
          current={currentPage}
          onChange={setCurrentPage}
          size="sm"
      />
    </>
  );
};

export default Todo;
