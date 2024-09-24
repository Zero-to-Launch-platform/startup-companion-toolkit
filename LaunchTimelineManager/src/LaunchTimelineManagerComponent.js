// src/components/LaunchTimelineManager/LaunchTimelineManagerComponent.js

import React, { useState } from 'react';
import { generateLaunchTimeline } from './LaunchTimelineManager';

const LaunchTimelineManagerComponent = () => {
  const [launchDate, setLaunchDate] = useState('');
  const [customTasks, setCustomTasks] = useState([]);
  const [timeline, setTimeline] = useState(null);

  const handleAddCustomTask = () => {
    setCustomTasks([...customTasks, { 
      id: Date.now(), 
      name: '', 
      category: '', 
      duration: 1, 
      dependencies: []
    }]);
  };

  const handleCustomTaskChange = (index, field, value) => {
    const updatedTasks = [...customTasks];
    updatedTasks[index][field] = value;
    setCustomTasks(updatedTasks);
  };

  const handleGenerateTimeline = () => {
    const result = generateLaunchTimeline(launchDate, customTasks);
    setTimeline(result);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>
      <h2>Launch Timeline Manager</h2>
      
      <div>
        <label>
          Launch Date:
          <input
            type="date"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <h3>Custom Tasks</h3>
        {customTasks.map((task, index) => (
          <div key={task.id}>
            <input
              type="text"
              value={task.name}
              onChange={(e) => handleCustomTaskChange(index, 'name', e.target.value)}
              placeholder="Task name"
            />
            <input
              type="text"
              value={task.category}
              onChange={(e) => handleCustomTaskChange(index, 'category', e.target.value)}
              placeholder="Category"
            />
            <input
              type="number"
              value={task.duration}
              onChange={(e) => handleCustomTaskChange(index, 'duration', parseInt(e.target.value))}
              placeholder="Duration (days)"
            />
            <input
              type="text"
              value={task.dependencies.join(', ')}
              onChange={(e) => handleCustomTaskChange(index, 'dependencies', e.target.value.split(',').map(d => parseInt(d.trim())))}
              placeholder="Dependencies (comma-separated IDs)"
            />
          </div>
        ))}
        <button onClick={handleAddCustomTask}>Add Custom Task</button>
      </div>

      <button onClick={handleGenerateTimeline}>Generate Timeline</button>

      {timeline && (
        <div>
          <h3>Launch Timeline</h3>
          {timeline.categories.map(category => (
            <div key={category}>
              <h4>{category}</h4>
              <ul>
                {timeline.tasks
                  .filter(task => task.category === category)
                  .map(task => (
                    <li key={task.id}>
                      {task.name} - Start: {formatDate(task.startDate)}, End: {formatDate(task.endDate)}
                      {timeline.criticalPath.some(t => t.id === task.id) && ' (Critical)'}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <h4>Critical Path</h4>
          <ol>
            {timeline.criticalPath.map(task => (
              <li key={task.id}>{task.name} ({task.duration} days)</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default LaunchTimelineManagerComponent;