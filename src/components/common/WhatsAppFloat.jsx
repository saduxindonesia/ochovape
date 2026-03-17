import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useData } from '../../context/DataContext';

export default function WhatsAppFloat() {
  const { settings } = useData();

  return (
    <motion.a
      href={`https://wa.me/${settings.whatsapp}?text=Halo Roma Motor, saya ingin konsultasi`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      aria-label="Chat WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat WhatsApp
      </span>
    </motion.a>
  );
}
