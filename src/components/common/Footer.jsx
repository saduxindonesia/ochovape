import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { FaWhatsapp, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useData();

  const quickLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.gallery'), href: '#gallery' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary dark:bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-2">
              Roma<span className="text-white">Motor</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{settings.tagline}</p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-500 hover:bg-green-600/40 transition-all"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href={`https://instagram.com/${settings.instagram?.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-500 hover:bg-pink-600/40 transition-all"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={`https://tiktok.com/${settings.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>{t('footer.contactInfo')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaWhatsapp className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>{t('location.hours')}</h4>
            <p className="text-gray-400 text-sm">{settings.operatingHours}</p>
            <div className="mt-4">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Halo Roma Motor, saya ingin booking service`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !px-4 !text-sm inline-block"
              >
                {t('nav.booking')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-gray-600 text-xs mt-2">
            {t('footer.credit')}{' '}
            <a
              href="https://sadux.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors"
            >
              sadux.my.id
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
