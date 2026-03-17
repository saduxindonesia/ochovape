import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FiArrowLeft, FiCalendar, FiTag, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { blogPosts } = useData();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Artikel tidak ditemukan</h2>
            <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const shareWA = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — Roma Motor Blog</title>
        <meta name="description" content={post.content?.substring(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content?.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "author": { "@type": "Organization", "name": "Roma Motor" },
          })}
        </script>
      </Helmet>

      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary text-sm mb-8 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            {t('blog.back')}
          </Link>

          {/* Hero Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-accent/10">
            {post.thumbnail ? (
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl opacity-30">📝</span>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <FiCalendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {post.tags?.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                <FiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">{post.title}</h1>

          {/* Content */}
          <article className="prose prose-invert prose-sm md:prose-base max-w-none">
            {post.content?.split('\n').map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <FiShare2 className="w-4 h-4" />
              {t('blog.share')}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={shareWA}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-500 rounded-lg text-sm hover:bg-green-600/30 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
