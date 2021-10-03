/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Button, Stack } from "@material-ui/core";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const CreatePost = () => (
  <div className="web-container">
    <Header />
    <div className="web-content">
      <SidebarLeft />
      <div className="web-content-center">
        <form className="form-create-post">
          <div className="mb-3">
            <label htmlFor="post-title" className="form-label">Title</label>
            <input type="text" className="form-control" name="post-title" id="post-title" placeholder="Title..." />
          </div>
          <div className="mb-3">
            <label htmlFor="post-hastag" className="form-label">Hastag</label>
            <input type="text" className="form-control" name="post-hastag" id="post-hastag" placeholder="#react, #laptrinh, ...." />
          </div>
          <div className="mb-3">
            <label htmlFor="post-content" className="form-label">Content</label>
            <textarea className="form-control" name="post-content" id="post-content" rows="15" />
          </div>
          <Stack spacing={2} direction="row">
            <Button variant="contained">CREATE</Button>
            <Button variant="contained">CANCEL</Button>
          </Stack>
        </form>
      </div>
      <SidebarRight />
    </div>
    <Footer />
  </div>
);

export default CreatePost;
