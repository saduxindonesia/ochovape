import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Gallery() {
  const { t } = useTranslation();
  const { gallery } = useData();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const placeholderColors = [
    'from-gray-800 to-gray-900',
    'from-gray-700 to-gray-800',
    'from-gray-900 to-black',
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

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

        {/* Clean Square Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square bg-dark-card border border-white/5"
              onClick={() => setLightboxIndex(index)}
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
                  className={`w-full h-full bg-gradient-to-br ${placeholderColors[index % placeholderColors.length]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                >
                  <span className="text-4xl opacity-50">📸</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={handlePrev}
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10 bg-black flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery[lightboxIndex].url ? (
                <img 
                  src={gallery[lightboxIndex].url} 
                  alt={gallery[lightboxIndex].caption} 
                  className="w-full h-auto max-h-[75vh] object-contain bg-black" 
                />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center gap-4">
                  <span className="text-6xl">📸</span>
                  <span className="text-gray-500 text-sm">No Image Provided</span>
                </div>
              )}
              <div className="w-full p-5 bg-dark-bg border-t border-white/10 text-center">
                <p className="text-white font-medium text-lg">{gallery[lightboxIndex].caption}</p>
                <p className="text-gray-500 text-sm mt-1">{lightboxIndex + 1} / {gallery.length}</p>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={handleNext}
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
