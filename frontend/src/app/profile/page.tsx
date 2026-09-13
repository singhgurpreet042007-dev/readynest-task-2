"use client";

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { AuthGuard } from '../../components/guards/RoleGuard';
import {
  getStudentProfile,
  updateStudentProfile,
  updatePassword,
} from '../../services/student';

export default function ProfilePage() {
  const { user, role, logoutUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [enrollment, setEnrollment] = useState(user?.student?.enrollmentNumber || 'N/A');
  const [course, setCourse] = useState(user?.student?.course || '');
  const [semester, setSemester] = useState(user?.student?.semester || '');
  const [department, setDepartment] = useState(user?.student?.department || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getStudentProfile();
        if (res.profile) {
          setName(res.profile.name);
          setEmail(res.profile.email);
          setEnrollment(res.profile.enrollmentNumber || 'N/A');
          setCourse(res.profile.course || '');
          setSemester(res.profile.semester || '');
          setDepartment(res.profile.department || '');
        }
      } catch {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          if (user.student) {
            setEnrollment(user.student.enrollmentNumber);
            setCourse(user.student.course);
            setSemester(user.student.semester);
            setDepartment(user.student.department);
          }
        }
      }
    }

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    try {
      const res = await updateStudentProfile({
        name,
        course,
        semester,
        department,
      });
      setSuccessMsg(res.message || 'Academic profile updated successfully');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    try {
      const res = await updatePassword({
        currentPassword,
        newPassword,
      });
      setSuccessMsg(res.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update password');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthGuard>
    <DashboardLayout
      title="Identity & Credentials"
      subtitle="Manage your student profile, university registration details, and security"
    >
      {/* Top Header Row */}
      <div className="pb-6 border-b border-black/[0.08] flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-orange-500/40 bg-orange-50 text-orange-600 text-[10px] font-medium tracking-tight">
            <span>Verified Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">Account & Profile Settings</h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Institutional records and access security
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-500/30 text-emerald-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-500/30 text-rose-700 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column (4 cols): Profile Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full border border-orange-500/40 bg-orange-50 flex items-center justify-center font-normal text-xl text-orange-600">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">{name}</h3>
              <p className="text-xs text-neutral-500">{email}</p>
            </div>

            <div className="inline-block">
              <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-orange-500/40 text-orange-600 bg-orange-50">
                {role === 'ADMIN' ? 'Administrator' : 'Student'}
              </span>
            </div>

            <div className="pt-4 border-t border-black/[0.08] space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-black/[0.06]">
                <span className="text-neutral-500">Enrollment ID:</span>
                <span className="font-mono text-[#1d1d1f] font-medium">{enrollment}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-black/[0.06]">
                <span className="text-neutral-500">Program:</span>
                <span className="text-[#1d1d1f]">{course}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-black/[0.06]">
                <span className="text-neutral-500">Term:</span>
                <span className="text-[#1d1d1f]">{semester}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Status:</span>
                <span className="text-emerald-700 font-medium">Good Standing</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={logoutUser}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-xs text-neutral-500 hover:text-rose-600 border border-black/[0.1] hover:border-rose-500/40 hover:bg-rose-50/50 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Academic Details Form */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-5">
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">Academic Details</h3>
              <p className="text-xs text-neutral-500">Information registered with university records</p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Campus Email"
                  value={email}
                  disabled
                  helperText="Managed by institutional IT"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  label="Course / Program"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
                <Input
                  label="Current Semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>

              <Input
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />

              <div className="flex justify-end pt-1">
                <Button variant="orange" size="sm" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>

          {/* Security & Password Form */}
          <div className="p-6 rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-5">
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight">Security & Password</h3>
              <p className="text-xs text-neutral-500">Update your sign-in credentials</p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button variant="secondary" size="sm" type="submit" disabled={isSaving}>
                  {isSaving ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </AuthGuard>
  );
}
