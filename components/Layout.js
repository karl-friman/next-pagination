import Footer from './Footer';
import Meta from './Meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
