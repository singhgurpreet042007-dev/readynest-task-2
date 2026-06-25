import DashboardLayout from "@/components/layout/dashboard-layout";
import KanbanBoard from "@/components/tasks/kanban-board";
import CreateTaskForm from "@/components/tasks/create-task-form";
import { CheckSquare } from "lucide-react";

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          <CheckSquare size={16} />
          Productivity Workspace
        </div>

        <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent">
          Task Manager
        </h1>

        <p className="mt-2 text-slate-400">
          Organize, manage and complete your daily academic tasks.
        </p>

      </div>

      <CreateTaskForm />

      <KanbanBoard />

    </DashboardLayout>
  );
}