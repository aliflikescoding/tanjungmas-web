import Header from "./Header";
import Footer from "./Footer";

const CustomLayout = ({ children, blackText }) => {
  return (
    <>
      <Header blackText={blackText} />
      {children}
      <Footer />
    </>
  );
};

export default CustomLayout;
