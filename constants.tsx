
import React from 'react';

export const COLORS = {
  blue: '#007AFF',
  indigo: '#5856D6',
  green: '#34C759',
  orange: '#FF9500',
  red: '#FF3B30',
  teal: '#30B0C7',
  gray: '#8E8E93',
  systemBackground: 'bg-[#F2F2F7] dark:bg-black',
  secondaryBackground: 'bg-white dark:bg-[#1C1C1E]',
  label: 'text-black dark:text-white',
  secondaryLabel: 'text-[#3C3C43]/60 dark:text-[#EBEBF5]/60',
  separator: 'border-[#C6C6C8] dark:border-[#38383A]',
};

export const Icons = {
  Today: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  ),
  Trends: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  ),
  Check: (props: any) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Apple: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.95-2.04 1.72-3.3 1.72-1.2 0-1.61-.75-3.08-.75-1.46 0-1.95.73-3.08.73-1.18 0-2.31-.76-3.32-1.74-2.1-2.04-3.71-5.76-3.71-8.98 0-3.32 2.1-5.07 4.14-5.07.91 0 1.76.35 2.45.35.6 0 1.57-.45 2.62-.45 1.05 0 2.21.43 3.03 1.17-2.6 1.4-2.17 5.14.47 6.22-.84 1.54-1.96 3.1-3.27 4.8zm-3.32-15.03c.87-1.1 1.47-2.63 1.47-4.14-.02-.21-.05-.42-.09-.61-1.35.05-2.98.92-3.95 2.06-.88 1.02-1.64 2.58-1.64 4.07 0 .23.03.45.08.64 1.48.11 2.97-.84 4.13-2.02z"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
};
