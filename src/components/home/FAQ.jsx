import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
  const { t } = useTranslation();
  const { faqs } = useData();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-subtitle">{t('faq.subtitle')}</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl border transition-all duration-300 ${
                openId === faq.id
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-white/5 dark:border-white/5 glass'
              }`}
              style={{ borderColor: openId !== faq.id ? 'var(--border-subtle)' : undefined }}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left min-h-[56px]"
              >
                <span
                  className="font-medium text-sm md:text-base pr-4"
                  style={{ color: 'var(--text-heading)' }}
                >
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`faq-answer ${openId === faq.id ? 'open' : ''}`}
                style={{
                  maxHeight: openId === faq.id ? '500px' : '0',
                  padding: openId === faq.id ? '0 1.25rem 1.25rem' : '0 1.25rem',
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
