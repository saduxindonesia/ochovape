import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { t } = useTranslation();
  const { testimonials } = useData();

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testi) => (
            <SwiperSlide key={testi.id}>
              <div className="p-6 rounded-2xl glass border border-white/5 h-full flex flex-col">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < testi.rating ? 'text-accent' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testi.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-center gap-3">
                    {testi.avatar ? (
                      <img
                        src={testi.avatar}
                        alt={testi.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {testi.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{testi.name}</p>
                      <p className="text-gray-500 text-xs">{testi.vehicle || 'Local Guide'}</p>
                    </div>
                  </div>
                  <FcGoogle className="w-6 h-6 ml-2" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
