import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const About = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [imageLoaded, setImageLoaded] = useState(false);
  const aboutImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

  useEffect(() => {
    const img = new Image();
    img.src = aboutImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="py-5 py-md-7 bg-light mt-1" id="about">
      <div className="container">
        <div className="section-title mt-1">
          <span className="badge rounded-pill">
            {t('aboutOurStoryBadge')}
          </span>
          <h2 className="display-6 fw-bold">{t('aboutUsTitle')}</h2>
        </div>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg">
                <div
                  className={`position-absolute top-0 start-0 w-100 h-100 bg-light placeholder-glow ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition`}
                ></div>

                <img
                  src={aboutImage}
                  alt={t('aboutImageAlt')}
                  className={`w-100 ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </div>

              <div className="position-absolute top-0 start-0 translate-middle-y translate-middle-x rounded-circle bg-primary opacity-10" style={{ width: "120px", height: "120px" }}></div>
              <div className="position-absolute bottom-0 end-0 translate-middle-y translate-middle-x rounded-circle bg-primary opacity-10" style={{ width: "120px", height: "120px" }}></div>

              <div className="position-absolute bottom-0 end-0 translate-middle-y bg-white rounded-4 shadow-lg p-4" style={{ width: "260px" }}>
                <div className="row g-0 mb-3">
                  <div className="col text-center">
                    <p className="fs-3 fw-bold text-campus mb-0">3+</p>
                    <p className="small text-muted mb-0">{t('aboutLoungesCount')}</p>
                  </div>
                  <div className="col text-center">
                    <p className="fs-3 fw-bold text-campus mb-0">20+</p>
                    <p className="small text-muted mb-0">{t('aboutDishesCount')}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="fs-3 fw-bold text-campus mb-0">1000+</p>
                  <p className="small text-muted mb-0">{t('aboutHappyStudentsCount')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="fs-2 fw-bold mb-4">{t('aboutRevolutionizingTitle')}</h3>

            <div className="mb-4">
              <p className="text-muted">
                {t('aboutParagraph1')}
              </p>

              <p className="text-muted">
                {t('aboutParagraph2')}
              </p>

              <p className="text-muted">
                {t('aboutParagraph3')}
              </p>
            </div>

            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "48px", height: "48px" }}>
                    <svg className="text-campus" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="fs-5 fw-semibold mb-1">{t('featureSkipWaitTitle')}</h4>
                  <p className="small text-muted">{t('featureSkipWaitDescription')}</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "48px", height: "48px" }}>
                    <svg className="text-campus" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h4 className="fs-5 fw-semibold mb-1">{t('featureEasyOrderingTitle')}</h4>
                  <p className="small text-muted">{t('featureEasyOrderingDescription')}</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "48px", height: "48px" }}>
                    <svg className="text-campus" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="fs-5 fw-semibold mb-1">{t('featureAffordableTitle')}</h4>
                  <p className="small text-muted">{t('featureAffordableDescription')}</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 rounded-circle" style={{ width: "48px", height: "48px" }}>
                    <svg className="text-campus" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="fs-5 fw-semibold mb-1">{t('featureGreatExperienceTitle')}</h4>
                  <p className="small text-muted">{t('featureGreatExperienceDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;