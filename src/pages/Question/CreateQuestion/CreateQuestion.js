/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const CreateQuestion = () => (
  <div className="web-container">
    <Header />
    <div className="web-content">
      <SidebarLeft />
      <div className="web-content-center">
        <br />
        <TextField fullWidth label="Add title of question" className="atquestion" />
        <br />
        <br />
        <TextField fullWidth label="Hashtag" className="hashtag" />
        <br />
        <br />
        <CKEditor
          editor={ClassicEditor}
          data="<p>Content...</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <br />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>CREATE</Button>
            <Button>DRAFT</Button>
            <Button>CANCLE</Button>
          </ButtonGroup>

        </Box>
      </div>
      <SidebarRight />
    </div>
    <Footer />
  </div>
);

export default CreateQuestion;
