/* eslint-disable react/react-in-jsx-scope */
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";

const Homepage = () => (
  <div className="web-container">
    <Header />
    <div className="web-content">
      <SidebarLeft />
      <SidebarRight />
    </div>
    <Footer />
  </div>

);

export default Homepage;
