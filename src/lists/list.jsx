import React, { useContext, useState } from 'react';
import { Paper, Text, Badge, Pagination } from '@mantine/core';
import { SettingsContext } from '../Context/SettingsContext';

const List = ({ tasks }) => {
  const settings = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  // This determines how many pages in total we will have
  const totalPages = Math.ceil(tasks.length / settings.displayItems);

  // This slices the tasks to only show the tasks for the current page
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * settings.displayItems,
    currentPage * settings.displayItems
  );

  return (
    <>
      {paginatedTasks.map(item => (
        <Paper padding="md" style={{ margin: '10px 0' }} key={item.id}>
          <Text size="md">{item.text}</Text>
          <Text size="sm" style={{ marginTop: '5px' }}>Assigned to: <Badge>{item.assignee}</Badge></Text>
          <Text size="sm" style={{ marginTop: '5px' }}>Difficulty: <Badge color={item.difficulty > 3 ? 'red' : 'green'}>{item.difficulty}</Badge></Text>
          <Text size="sm" style={{ marginTop: '5px' }}>Complete: <Badge color={item.complete ? 'green' : 'red'}>{item.complete.toString()}</Badge></Text>
        </Paper>
      ))}

      {/* The Pagination component from Mantine */}
      <Pagination
        total={totalPages}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default List;
