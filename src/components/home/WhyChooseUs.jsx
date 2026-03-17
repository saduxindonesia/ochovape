import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiCheckCircle, FiShield, FiDollarSign } from 'react-icons/fi';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target, 10);
    if (isNaN(num) || num <= 0) return;
    const totalFrames = Math.max(Math.floor(duration / 16), 1);
    const step = Math.max(Math.ceil(num / totalFrames), 1);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      setCount(current);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const points = [
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: t('whyUs.point1_title'),
      desc: t('whyUs.point1_desc'),
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: t('whyUs.point2_title'),
      desc: t('whyUs.point2_desc'),
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: t('whyUs.point3_title'),
      desc: t('whyUs.point3_desc'),
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
  ];

  const counters = [
    { value: '10', suffix: '+', label: t('whyUs.experience') },
    { value: '5000', suffix: '+', label: t('whyUs.customers') },
    { value: '50', suffix: '+', label: t('whyUs.mechanics') },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('whyUs.title')}</h2>
          <p className="section-subtitle">{t('whyUs.subtitle')}</p>
        </motion.div>

        {/* Counter Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {counters.map((counter, i) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6 rounded-2xl glass border border-white/5"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">
                <Counter target={counter.value} suffix={counter.suffix} />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-2">{counter.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group p-6 md:p-8 rounded-2xl glass card-hover text-center"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${point.bg} ${point.color} mb-4`}>
                {point.icon}
              </div>
              <h3 className="text-lg font-heading font-bold mb-2" style={{ color: 'var(--text-heading)' }}>{point.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
