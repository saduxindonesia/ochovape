import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTag } from 'react-icons/fi';

export default function BlogList() {
  const { t } = useTranslation();
  const { blogPosts } = useData();

  const handleClick = (slug) => {
    window.location.href = `/blog/${slug}`;
  };

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('blog.title')}</h2>
          <p className="section-subtitle">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden glass card-hover cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)' }}
              onClick={() => handleClick(post.slug)}
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-white/5 to-white/2 relative overflow-hidden">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl opacity-20">📝</span>
                  </div>
                )}
                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur rounded-full text-xs text-white"
                    >
                      <FiTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-base mb-2 group-hover:text-white transition-colors line-clamp-2" style={{ color: 'var(--text-heading)' }}>
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-body)' }}>
                  {post.content?.substring(0, 120)}...
                </p>
                <span className="inline-flex items-center gap-1 text-gray-300 text-sm font-medium group-hover:gap-2 transition-all">
                  {t('blog.readMore')} <FiArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
