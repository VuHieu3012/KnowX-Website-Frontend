import React, {
  Suspense, useEffect, useState,
} from "react";
import {
  BrowserRouter, Route, Switch, Redirect,
} from "react-router-dom";
import axios from "axios";
import NotFound from "./components/NotFound";

/* eslint-disable react/react-in-jsx-scope */
import Header from "./components/Header/Header";
import SidebarLeft from "./components/SidebarLeft/SidebarLeft";
import SidebarRight from "./components/SidebarRight/SidebarRight";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import CreatePost from "./pages/Post/CreatePost/CreatePost";
import FollowingPost from "./pages/Post/FollowingPost/FollowingPost";
import PostDetail from "./pages/Post/PostDetail/PostDetail";
// import CreateQuestion from "./pages/Question/CreateQuestion/CreateQuestion";
import ViewQuestion from "./pages/Question/ViewQuestion/ViewQuestion";
import ListQuestion from "./pages/Question/ListQuestion/ListQuestion";
import CreateQuestion from "./pages/Question/CreateQuestion/CreateQuestion";
// import Authentication from './pages/Authentication';

const Authentication = React.lazy(() => import("./pages/Authentication"));

function App() {
  const [count, setCount] = useState([]);

  useEffect(() => {
    const api = callAPI();
    setCount(api);
    console.log(count);
  }, []);
  async function callAPI() {
    const config = {
      method: "get",
      url: "https://615c5fd3c298130017736127.mockapi.io/da",
    };
    const a = await axios(config)
      .then((result) => { return result })
    return a;
  }
  return (
    <div className="KnowX-Website">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/auth" />
            <Route path="/auth" component={CreateQuestion} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
