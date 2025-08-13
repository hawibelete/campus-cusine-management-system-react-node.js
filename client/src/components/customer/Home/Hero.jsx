import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const foodImages = [
  "https://images.unsplash.com/photo-1542367592-8849eb950fd8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682495889756-9229b479faaf?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
];

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { t } = useTranslation();
  useEffect(() => {
    const img = new Image();
    img.src = foodImages[currentImageIndex];
    img.onload = () => setImageLoaded(true);

    const intervalId = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % foodImages.length);
      setImageLoaded(false); 
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <section className="pb-1 min-vh-100 d-flex align-items-center pt-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="mb-3">
              <span className="bg-secondary rounded p-2 bg-opacity-5 text-light">
                {t("hero.studentChoice")}
              </span>
            </div>
            <h1 className="display-4 fw-bold mb-4">
              {t("hero.headlineLine1")}<br />
              <span className="text-primary">{t("hero.headlineLine2")}</span>
            </h1>
            <p className="lead text-secondary mb-4">
              {t("hero.description")}
            </p>
            <div className="mt-4">
              <Link to="/customer/lounges" className="btn btn-primary d-inline-flex align-items-center gap-2">
                {t("hero.orderNow")}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="ms-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              <div className="rounded-4 overflow-hidden shadow">
                <img 
                  src={foodImages[currentImageIndex]} 
                  alt="Ethiopian cuisine" 
                  className={`img-fluid  object-fit-cover img-blur-in ${imageLoaded ? 'loaded' : ''}`}
                />
              </div>
              <div className="position-absolute top-0 end-0 translate-y-n25 translate-x-25 bg-primary opacity-10 rounded-circle" style={{ width: '8rem', height: '8rem', filter: 'blur(40px)', zIndex: -1 }}></div>
              <div className="position-absolute bottom-0 start-0 translate-y-25 translate-x-n25 bg-primary opacity-10 rounded-circle" style={{ width: '6rem', height: '6rem', filter: 'blur(40px)', zIndex: -1 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
