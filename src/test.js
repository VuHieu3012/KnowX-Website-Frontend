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
import Homepage from "./pages/Homepage/Homepage";
import DetailPost from "./pages/Post/DetailPost/DetailPost";
import FindBuddy from "./pages/Find/FindBuddy/FindBuddy";

const Test = () => (
  <>
    <BrowserRouter>
      <Switch>
        <FindBuddy />
      </Switch>
    </BrowserRouter>
  </>
);
export default Test;
