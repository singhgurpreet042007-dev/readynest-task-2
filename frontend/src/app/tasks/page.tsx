"use client";

import React, { useEffect, useState } from 'react';
import {
  CheckSquare,
  Plus,
  Clock,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/tasks';
import { AuthGuard } from '../../components/guards/RoleGuard';
import { Task, TaskStatus, TaskPriority } from '../../types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | TaskStatus>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [status, setStatus] = useState<TaskStatus>('TODO');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setIsLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTask({
        title,
        description,
        deadline: deadline || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority,
        status,
      });
      setAddModalOpen(false);
      setTitle('');
      setDescription('');
      loadTasks();
    } catch (err) {
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: TaskStatus) {
    try {
      await updateTask(id, { status: newStatus });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this task?')) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  const activeCount = tasks.filter((t) => t.status !== 'COMPLETED').length;

  return (
    <AuthGuard>
    <DashboardLayout
      title="Academic Deliverables"
      subtitle="Track laboratory writeups, research milestones, and deadline submissions"
    >
      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[10px] font-medium tracking-tight">
            <span>{activeCount} Active Sprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Assignments & Tasks Board</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Organized academic deliverables and course projects
          </p>
        </div>

        <Button
          variant="orange"
          size="sm"
          onClick={() => setAddModalOpen(true)}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Task
        </Button>
      </div>

      {/* Structured Tasks Card */}
      <div className="rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        {/* Filter Tabs (Apple segment control) */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-black/[0.06]">
          {(['ALL', 'TODO', 'IN_PROGRESS', 'COMPLETED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs transition duration-150 cursor-pointer ${
                statusFilter === st
                  ? 'border border-orange-500/50 bg-orange-50 text-orange-600 font-medium'
                  : 'border border-black/[0.1] text-neutral-500 hover:text-[#1d1d1f] hover:border-black/20'
              }`}
            >
              {st === 'ALL' ? 'All' : st === 'IN_PROGRESS' ? 'In Progress' : st}
            </button>
          ))}
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="py-14 text-center space-y-2">
            <p className="text-sm font-medium text-neutral-700">No tasks found</p>
            <p className="text-xs text-neutral-400">All deliverables under this filter have been cleared.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {filteredTasks.map((task) => {
              const isCompleted = task.status === 'COMPLETED';

              return (
                <div
                  key={task.id}
                  className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition duration-150 hover:bg-black/[0.015] px-2 rounded-xl ${
                    isCompleted ? 'opacity-50' : ''
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          isCompleted ? 'line-through text-neutral-400' : 'font-medium text-[#1d1d1f]'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          task.priority === 'HIGH'
                            ? 'border-orange-500/40 text-orange-600 bg-orange-50 font-medium'
                            : 'border-black/[0.08] text-neutral-500'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                    </span>

                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                      className="text-xs bg-white text-[#1d1d1f] border border-black/[0.12] rounded-full px-2.5 py-1 outline-none cursor-pointer focus:border-orange-500/50"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Create Academic Task"
        description="Add a new deliverable, assignment or submission deadline."
      >
        <form onSubmit={handleAddTask} className="space-y-3.5">
          <Input
            label="Task Title"
            placeholder="e.g. Implement MapReduce Lab"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
              Description & Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Task instructions, links, deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-black/[0.12] bg-white p-3 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none focus:border-orange-500/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] outline-none focus:border-orange-500/60 cursor-pointer"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] outline-none focus:border-orange-500/60 cursor-pointer"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          <Input
            label="Deadline Date"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
    </AuthGuard>
  );
}
