import Header from "./Header";

const CustomLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default CustomLayout;
