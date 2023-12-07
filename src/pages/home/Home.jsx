import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Content from "./Content/Content";
import FormRegister from "./FormRegister/FormRegister";
import Footer from "./Footer/Footer";

//Component trang home
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <Content></Content>
      <FormRegister></FormRegister>
      <Footer></Footer>
    </div>
  );
};

export default Home;
