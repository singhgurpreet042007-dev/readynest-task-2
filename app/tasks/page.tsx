import DashboardLayout from "@/components/layout/dashboard-layout";
import KanbanBoard from "@/components/tasks/kanban-board";
import CreateTaskForm from "@/components/tasks/create-task-form";
export default function TasksPage() {
  return (
   <DashboardLayout>
  <div className="mb-8">
    <h1 className="text-4xl font-bold">
      Task Manager
    </h1>

    <p className="mt-2 text-slate-500">
      Organize your work efficiently.
    </p>
  </div>

  <CreateTaskForm />

  <KanbanBoard />
</DashboardLayout>
  );
}