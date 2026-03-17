import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Gallery() {
  const { t } = useTranslation();
  const { gallery } = useData();
  const [lightbox, setLightbox] = useState(null);

  const placeholderColors = [
    'from-primary/30 to-accent/20',
    'from-accent/30 to-primary/20',
    'from-blue-500/30 to-primary/20',
    'from-green-500/30 to-accent/20',
    'from-purple-500/30 to-primary/20',
    'from-pink-500/30 to-accent/20',
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('gallery.title')}</h2>
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 5 ? 'md:row-span-2' : ''
              }`}
              onClick={() => setLightbox(item)}
            >
              {item.url ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-full aspect-square ${index === 0 || index === 5 ? 'md:aspect-auto md:h-full' : ''} bg-gradient-to-br ${placeholderColors[index % placeholderColors.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                >
                  <span className="text-4xl opacity-50">📸</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <FiX className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.url ? (
                <img src={lightbox.url} alt={lightbox.caption} className="w-full" />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <span className="text-6xl">📸</span>
                </div>
              )}
              <div className="p-4 bg-dark-card">
                <p className="text-white font-medium">{lightbox.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
