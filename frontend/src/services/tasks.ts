import { apiClient } from './api';
import { Task, TaskSummary } from '../types';
import { mockTasks } from './mockData';

const TASKS_KEY = 'smart_campus_tasks_data';

function getLocalTasks(): Task[] {
  if (typeof window === 'undefined') return mockTasks;
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    if (!stored) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
      return mockTasks;
    }
    return JSON.parse(stored);
  } catch {
    return mockTasks;
  }
}

function saveLocalTasks(tasks: Task[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Failed saving local tasks', err);
  }
}

function calculateTaskSummary(tasks: Task[]): TaskSummary {
  const todo = tasks.filter((t) => t.status === 'TODO').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  return {
    total: tasks.length,
    todo,
    inProgress,
    completed,
  };
}

export async function getTasks(): Promise<{ success: boolean; tasks: Task[]; stats: TaskSummary }> {
  try {
    return await apiClient<{ success: boolean; tasks: Task[]; stats: TaskSummary }>('/tasks');
  } catch {
    const tasks = getLocalTasks();
    return {
      success: true,
      tasks,
      stats: calculateTaskSummary(tasks),
    };
  }
}

export async function createTask(data: {
  title: string;
  description?: string;
  deadline?: string;
  status?: string;
  priority?: string;
}): Promise<{ success: boolean; task: Task }> {
  try {
    return await apiClient<{ success: boolean; task: Task }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    const tasks = getLocalTasks();
    const newTask: Task = {
      id: `tsk_${Date.now()}`,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      status: (data.status as any) || 'TODO',
      priority: (data.priority as any) || 'MEDIUM',
      createdAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    saveLocalTasks(tasks);
    return { success: true, task: newTask };
  }
}

export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<{ success: boolean; task: Task }> {
  try {
    return await apiClient<{ success: boolean; task: Task }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch {
    const tasks = getLocalTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Task not found');
    tasks[idx] = { ...tasks[idx], ...data };
    saveLocalTasks(tasks);
    return { success: true, task: tasks[idx] };
  }
}

export async function deleteTask(id: string): Promise<{ success: boolean }> {
  try {
    return await apiClient<{ success: boolean }>(`/tasks/${id}`, { method: 'DELETE' });
  } catch {
    const tasks = getLocalTasks().filter((t) => t.id !== id);
    saveLocalTasks(tasks);
    return { success: true };
  }
}
