import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  defaultServices,
  defaultTestimonials,
  defaultFAQs,
  defaultRunningTexts,
  defaultBlogPosts,
  defaultGallery,
  defaultSettings,
  defaultMessages,
} from '../data/defaultData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [services, setServices] = useLocalStorage('roma-services', defaultServices);
  const [testimonials, setTestimonials] = useLocalStorage('roma-testimonials', defaultTestimonials);
  const [faqs, setFaqs] = useLocalStorage('roma-faqs', defaultFAQs);
  const [runningTexts, setRunningTexts] = useLocalStorage('roma-running-texts', defaultRunningTexts);
  const [blogPosts, setBlogPosts] = useLocalStorage('roma-blog-posts', defaultBlogPosts);
  const [gallery, setGallery] = useLocalStorage('roma-gallery', defaultGallery);
  const [settings, setSettings] = useLocalStorage('roma-settings', defaultSettings);
  const [messages, setMessages] = useLocalStorage('roma-messages', defaultMessages);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now(), date: new Date().toISOString() }]);
  };

  const value = {
    services, setServices,
    testimonials, setTestimonials,
    faqs, setFaqs,
    runningTexts, setRunningTexts,
    blogPosts, setBlogPosts,
    gallery, setGallery,
    settings, setSettings,
    messages, setMessages,
    addMessage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
