/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
import { BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import SidebarLeft from "./components/SidebarLeft/SidebarLeft";
import SidebarRight from "./components/SidebarRight/SidebarRight";
import Footer from "./components/Footer/Footer";
import CreatePost from "./pages/Post/CreatePost/CreatePost";

const Test = () => (
  <>
    <BrowserRouter>
      <Switch>
        <CreatePost />
      </Switch>
    </BrowserRouter>
  </>
);
export default Test;
