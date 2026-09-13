"use client";

import React, { useEffect, useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  Calendar,
  Building,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { AuthGuard } from '../../components/guards/RoleGuard';
import { getNotices, createNotice, deleteNotice } from '../../services/notices';
import { Notice } from '../../types';

export default function NoticesPage() {
  const { role } = useAuth();
  const isAdmin = role === 'ADMIN';

  const [notices, setNotices] = useState<Notice[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Notice form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Academic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', 'Academic', 'Exams', 'Events', 'Urgent', 'General'];

  useEffect(() => {
    loadNotices();
  }, [categoryFilter, searchQuery]);

  async function loadNotices() {
    setIsLoading(true);
    try {
      const res = await getNotices(categoryFilter, searchQuery);
      setNotices(res.notices);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePublishNotice(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createNotice({
        title,
        content,
        category,
      });
      setAddModalOpen(false);
      setTitle('');
      setContent('');
      loadNotices();
    } catch (err) {
      alert('Failed to broadcast notice');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this notice?')) {
      try {
        await deleteNotice(id);
        loadNotices();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <AuthGuard>
    <DashboardLayout
      title="Campus Circulars"
      subtitle="Official notices, examination date sheets, and university broadcasts"
    >
      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[10px] font-medium tracking-tight">
            <span>Official Communications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Campus Announcements</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Verified circulars from Examination Office, Deans, and Department Chairs
          </p>
        </div>

        {isAdmin && (
          <Button
            variant="orange"
            size="sm"
            onClick={() => setAddModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Publish Notice
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-4 border-b border-black/[0.08]">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs transition duration-150 cursor-pointer ${
                categoryFilter === cat
                  ? 'border border-orange-500/50 bg-orange-50 text-orange-600 font-medium'
                  : 'border border-black/[0.1] text-neutral-500 hover:text-[#1d1d1f] hover:border-black/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-black/[0.12] bg-white pl-8 pr-3 py-1.5 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none focus:border-orange-500/60 transition"
          />
        </div>
      </div>

      {/* Notices Feed */}
      {notices.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <p className="text-sm font-medium text-neutral-700">No circulars found</p>
          <p className="text-xs text-neutral-400">There are currently no announcements matching your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-3 pt-2">
          {notices.map((not) => (
            <div
              key={not.id}
              className="p-5 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-500/40 transition duration-150 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                      not.category === 'Urgent' || not.category === 'Exams'
                        ? 'border-orange-500/40 text-orange-600 bg-orange-50'
                        : 'border-black/[0.08] text-neutral-500'
                    }`}
                  >
                    {not.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    {new Date(not.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-neutral-400" />
                    {not.authorName}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(not.id)}
                      className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove Circular"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                {not.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-4xl">
                {not.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Broadcast Notice Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Broadcast Campus Notice"
        description="Publish an official announcement to the university notice board."
      >
        <form onSubmit={handlePublishNotice} className="space-y-3.5">
          <Input
            label="Notice Title"
            placeholder="e.g. Schedule of Annual Technical Fest 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2 text-xs text-[#1d1d1f] outline-none focus:border-orange-500/60 cursor-pointer"
            >
              <option value="Academic">Academic</option>
              <option value="Exams">Exams</option>
              <option value="Events">Events</option>
              <option value="Urgent">Urgent</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-500 tracking-tight mb-1.5">
              Announcement Content
            </label>
            <textarea
              rows={4}
              placeholder="Provide all essential guidelines, deadlines, and contact information..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-xl border border-black/[0.12] bg-white p-3 text-xs text-[#1d1d1f] placeholder-neutral-400 outline-none focus:border-orange-500/60"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="orange" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Broadcast Notice'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
    </AuthGuard>
  );
}
