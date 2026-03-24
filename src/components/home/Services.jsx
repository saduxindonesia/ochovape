import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';

export default function Services() {
  const { t } = useTranslation();
  const { services } = useData();

  return (
    <section id="services" className="py-20 md:py-28 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-dark-card glass rounded-2xl p-5 md:p-6 card-hover cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: 'var(--text-heading)' }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm leading-relaxed mb-3 line-clamp-3" style={{ color: 'var(--text-body)' }}>
                  {service.description}
                </p>

                {/* Price */}
                <div className="text-gray-300 font-heading font-semibold text-sm">
                  {service.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          {t('services.note')}
        </motion.p>
      </div>
    </section>
  );
}

