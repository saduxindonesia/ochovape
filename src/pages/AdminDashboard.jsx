import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import RunningTextManager from '../components/admin/RunningTextManager';
import ServicesManager from '../components/admin/ServicesManager';
import GalleryManager from '../components/admin/GalleryManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import FAQManager from '../components/admin/FAQManager';
import BlogManager from '../components/admin/BlogManager';
import MessagesManager from '../components/admin/MessagesManager';
import SettingsManager from '../components/admin/SettingsManager';

const panels = {
  'dashboard': Dashboard,
  'running-text': RunningTextManager,
  'services': ServicesManager,
  'gallery': GalleryManager,
  'testimonials': TestimonialsManager,
  'faq': FAQManager,
  'blog': BlogManager,
  'messages': MessagesManager,
  'settings': SettingsManager,
};

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const ActivePanel = panels[activeMenu] || Dashboard;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Roma Motor</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
        <ActivePanel />
      </AdminLayout>
    </>
  );
}
