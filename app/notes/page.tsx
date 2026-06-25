import DashboardLayout from "@/components/layout/dashboard-layout";
import NoteForm from "@/components/notes/note-form";
import NoteList from "@/components/notes/note-list";

export default function NotesPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Notes
      </h1>

      <NoteForm />

      <NoteList />
    </DashboardLayout>
  );
}