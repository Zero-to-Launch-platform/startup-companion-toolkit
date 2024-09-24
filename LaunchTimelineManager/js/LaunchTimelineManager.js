// src/components/LaunchTimelineManager/LaunchTimelineManager.js

class LaunchTimelineManager {
  constructor() {
    this.categories = [
      'Product Development',
      'Marketing',
      'Sales',
      'Operations',
      'Legal & Compliance'
    ];
    this.tasks = this.initializeTasks();
  }

  initializeTasks() {
    return [
      { id: 1, name: 'Finalize product features', category: 'Product Development', duration: 14, dependencies: [] },
      { id: 2, name: 'Complete MVP development', category: 'Product Development', duration: 30, dependencies: [1] },
      { id: 3, name: 'Conduct user testing', category: 'Product Development', duration: 7, dependencies: [2] },
      { id: 4, name: 'Develop marketing strategy', category: 'Marketing', duration: 7, dependencies: [] },
      { id: 5, name: 'Create marketing materials', category: 'Marketing', duration: 14, dependencies: [4] },
      { id: 6, name: 'Set up social media accounts', category: 'Marketing', duration: 3, dependencies: [4] },
      { id: 7, name: 'Develop sales strategy', category: 'Sales', duration: 7, dependencies: [4] },
      { id: 8, name: 'Train sales team', category: 'Sales', duration: 5, dependencies: [7] },
      { id: 9, name: 'Set up CRM system', category: 'Sales', duration: 3, dependencies: [7] },
      { id: 10, name: 'Set up office space', category: 'Operations', duration: 14, dependencies: [] },
      { id: 11, name: 'Hire key personnel', category: 'Operations', duration: 21, dependencies: [] },
      { id: 12, name: 'Set up accounting systems', category: 'Operations', duration: 7, dependencies: [10] },
      { id: 13, name: 'File necessary legal documents', category: 'Legal & Compliance', duration: 10, dependencies: [] },
      { id: 14, name: 'Obtain required licenses and permits', category: 'Legal & Compliance', duration: 21, dependencies: [13] },
      { id: 15, name: 'Review and sign contracts', category: 'Legal & Compliance', duration: 7, dependencies: [13] }
    ];
  }

  generateTimeline(launchDate, customTasks = []) {
    const allTasks = [...this.tasks, ...customTasks];
    const sortedTasks = this.topologicalSort(allTasks);
    const scheduledTasks = this.scheduleTasks(sortedTasks, launchDate);
    const criticalPath = this.calculateCriticalPath(scheduledTasks);

    return {
      tasks: scheduledTasks,
      criticalPath: criticalPath,
      categories: this.categories
    };
  }

  topologicalSort(tasks) {
    const sorted = [];
    const visited = new Set();
    const tempVisited = new Set();

    const visit = (task) => {
      if (tempVisited.has(task.id)) throw new Error("Circular dependency detected");
      if (!visited.has(task.id)) {
        tempVisited.add(task.id);
        task.dependencies.forEach(depId => {
          const depTask = tasks.find(t => t.id === depId);
          if (depTask) visit(depTask);
        });
        tempVisited.delete(task.id);
        visited.add(task.id);
        sorted.unshift(task);
      }
    };

    tasks.forEach(task => {
      if (!visited.has(task.id)) visit(task);
    });

    return sorted;
  }

  scheduleTasks(sortedTasks, launchDate) {
    const launchTimestamp = new Date(launchDate).getTime();
    const scheduledTasks = sortedTasks.map(task => ({
      ...task,
      endDate: new Date(launchTimestamp - (task.duration * 24 * 60 * 60 * 1000)),
      startDate: new Date(launchTimestamp - ((task.duration + this.getMaxDependencyDuration(task, sortedTasks)) * 24 * 60 * 60 * 1000))
    }));

    return scheduledTasks.reverse();
  }

  getMaxDependencyDuration(task, tasks) {
    return task.dependencies.reduce((max, depId) => {
      const depTask = tasks.find(t => t.id === depId);
      return depTask ? Math.max(max, depTask.duration + this.getMaxDependencyDuration(depTask, tasks)) : max;
    }, 0);
  }

  calculateCriticalPath(tasks) {
    const endDate = Math.max(...tasks.map(t => t.endDate.getTime()));
    let currentDate = endDate;
    const criticalPath = [];

    while (currentDate > 0) {
      const criticalTask = tasks.find(task => 
        task.endDate.getTime() === currentDate &&
        !task.dependencies.some(depId => 
          criticalPath.find(ct => ct.id === depId)
        )
      );

      if (!criticalTask) break;

      criticalPath.unshift(criticalTask);
      currentDate = criticalTask.startDate.getTime();
    }

    return criticalPath;
  }
}

export const generateLaunchTimeline = (launchDate, customTasks = []) => {
  const manager = new LaunchTimelineManager();
  return manager.generateTimeline(launchDate, customTasks);
};