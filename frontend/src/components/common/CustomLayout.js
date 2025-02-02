import Header from "./Header";
import Footer from "./Footer";

const CustomLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default CustomLayout;
