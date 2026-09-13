"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role, isAuthenticated } = useAuth();

  const workspaceHref = role === 'ADMIN' ? '/admin' : '/dashboard';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 rounded-lg border border-orange-500/40 bg-orange-50 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f] flex items-center gap-1.5">
              SmartCampus
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-orange-500/40 text-orange-600 font-mono">
                OS
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="#why-us"
              className="text-xs text-neutral-600 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <Link
              href="#features"
              className="text-xs text-neutral-600 hover:text-black transition-colors"
            >
              Features
            </Link>
            <Link
              href="#showcase"
              className="text-xs text-neutral-600 hover:text-black transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#how-it-works"
              className="text-xs text-neutral-600 hover:text-black transition-colors"
            >
              Workflow
            </Link>
            <Link
              href="#technology"
              className="text-xs text-neutral-600 hover:text-black transition-colors"
            >
              Technology
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {isAuthenticated ? (
              <Link href={workspaceHref}>
                <Button variant="orange" size="sm" className="text-xs">
                  Open Workspace
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs text-neutral-700 hover:text-black">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="orange"
                    size="sm"
                    className="text-xs"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-neutral-600 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1d1d1f]" /> : <Menu className="w-5 h-5 text-[#1d1d1f]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.08] bg-white/95 px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            <Link
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-xs text-neutral-700 hover:text-black"
            >
              Overview
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-xs text-neutral-700 hover:text-black"
            >
              Features
            </Link>
            <Link
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-xs text-neutral-700 hover:text-black"
            >
              Experience
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-xs text-neutral-700 hover:text-black"
            >
              Workflow
            </Link>
            <Link
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-xs text-neutral-700 hover:text-black"
            >
              Technology
            </Link>
          </nav>
          <div className="pt-3 border-t border-black/[0.08] flex items-center gap-3">
            {isAuthenticated ? (
              <Link href={workspaceHref} className="w-full">
                <Button variant="orange" size="sm" className="w-full justify-center text-xs">
                  Open Workspace
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="w-full">
                  <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button variant="orange" size="sm" className="w-full justify-center text-xs">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
