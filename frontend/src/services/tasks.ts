import { apiClient } from './api';
import { Task, TaskSummary } from '../types';

export async function getTasks(): Promise<{ success: boolean; tasks: Task[]; stats: TaskSummary }> {
  return await apiClient<{ success: boolean; tasks: Task[]; stats: TaskSummary }>('/tasks');
}

export async function createTask(data: {
  title: string;
  description?: string;
  deadline?: string;
  status?: string;
  priority?: string;
}): Promise<{ success: boolean; task: Task }> {
  return await apiClient<{ success: boolean; task: Task }>('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<{ success: boolean; task: Task }> {
  return await apiClient<{ success: boolean; task: Task }>(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: string): Promise<{ success: boolean }> {
  return await apiClient<{ success: boolean }>(`/tasks/${id}`, { method: 'DELETE' });
}
