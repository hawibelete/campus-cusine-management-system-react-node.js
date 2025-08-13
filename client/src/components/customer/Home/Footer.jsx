import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/utility/i18n';
import { setLanguage } from '@/redux/slices/customer/uiSlice';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Globe
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const currentLanguage = useSelector((state) => state.ui.language);
  const dispatch = useDispatch();

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    dispatch(setLanguage(languageCode));
  };

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container py-2">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none">
              <span className="fs-4 fw-bold text-primary">CampusBites</span>
            </Link>
            <p className="text-muted mb-3">
              {t('footer.description')}
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <Instagram />
              </a>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="mb-3">{t('footer.quickLinks')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">{t('footer.links.home')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/lounge" className="footer-link">{t('footer.links.lounges')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/menu" className="footer-link">{t('footer.links.menu')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/prepaid" className="footer-link">{t('footer.links.prepaid')}</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="footer-link">{t('footer.links.about')}</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="mb-3">{t('footer.contact')}</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <MapPin size={20} className="text-primary flex-shrink-0 me-2 mt-1" />
                <span className="text-light">{t('footer.address')}</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Phone size={20} className="text-primary flex-shrink-0 me-2" />
                <span className="text-light">{t('footer.phone')}</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <Mail size={20} className="text-primary flex-shrink-0 me-2" />
                <span className="text-light">{t('footer.email')}</span>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="mt-3">
              <h5 className="mb-2 d-flex align-items-center gap-2">
                <Globe size={18} />
                {t('footer.language')}
              </h5>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button 
                  className={`btn btn-sm ${currentLanguage === 'en' ? 'btn-light' : 'btn-outline-light'}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </button>
                <button 
                  className={`btn btn-sm ${currentLanguage === 'am' ? 'btn-light' : 'btn-outline-light'}`}
                  onClick={() => handleLanguageChange('am')}
                >
                  አማርኛ
                </button>
                <button 
                  className={`btn btn-sm ${currentLanguage === 'sid' ? 'btn-light' : 'btn-outline-light'}`}
                  onClick={() => handleLanguageChange('sid')}
                >
                  Sidaamu Afoo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top border-secondary mt-4">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-muted small mb-0">
                &copy; {currentYear} Campus Bites. {t('footer.rights')}
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-muted small text-decoration-none">
                  {t('footer.privacy')}
                </a>
                <a href="#" className="text-muted small text-decoration-none">
                  {t('footer.terms')}
                </a>
                <a href="#" className="text-muted small text-decoration-none">
                  {t('footer.cookies')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
