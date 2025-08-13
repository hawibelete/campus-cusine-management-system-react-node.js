import { Navbar } from '../components/customer/Home/Navbar';
import { Footer } from '../components/customer/Home/Footer';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
