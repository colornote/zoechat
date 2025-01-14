"use client"

import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 mb-4">
        <h1 className="text-2xl font-bold">管理面板</h1>
      </header>
      <main className="bg-white rounded-lg shadow-md p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
