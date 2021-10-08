/* eslint-disable react/react-in-jsx-scope */
import "antd/dist/antd.css";
import "./styles.scss";
import { Layout, Button, Divider } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  BookTwoTone,
  createFromIconfontCN,
} from "@ant-design/icons";

import images from "../../assets/images";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Sider } = Layout;

const SidebarRight = () => (
  <div className="layout-sidebar-right">
    <Sider width={280} className="site-layout-background">
      <BookTwoTone
        style={{
          fontSize: "70px",
          color: "#00358E",
          marginTop: "36px",
          marginLeft: "45px",
        }}
      />
      <span style={{ color: "#00358E", fontWeight: "bold", fontSize: "20px" }}>
        BOOKMARK
      </span>
      <Button
        icon={<SearchOutlined />}
        size="large"
        style={{ marginTop: "10px", marginLeft: "46px" }}
      >
        Search Bookmarks
      </Button>
      <Divider orientation="left">
        <EditOutlined
          style={{
            fontSize: "28px",
            color: "#00358E",
            marginBottom: "18px",
            marginRight: "12px",
          }}
        />
        <span
          style={{
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          React: Hello word!
        </span>
      </Divider>
      <p
        style={{
          marginLeft: "35px",
          marginTop: "-25px",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        React creates a VIRTUAL DOM
        <br />
        in memory.
      </p>
      <Divider orientation="left">
        <EditOutlined
          style={{
            fontSize: "28px",
            color: "#00358E",
            marginBottom: "18px",
            marginRight: "12px",
          }}
        />
        <span
          style={{
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          Hooks
        </span>
      </Divider>
      <p
        style={{
          marginLeft: "35px",
          marginTop: "-25px",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        Hook: a specific example or story that
        <br />
        interests the reader.
      </p>
      <p
        style={{
          marginLeft: "35px",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "30px",
        }}
      >
        Introduction about
        <br />
        React Router
      </p>
      <div className="poster-right"> </div>
    </Sider>
  </div>
);

export default SidebarRight;

// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable no-undef */
// /* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable import/no-unresolved */
// import "./styles.scss";
// import { Input } from "@material-ui/core";

// const ariaLabel = { 'aria-label': 'description' };
// // eslint-disable-next-line arrow-body-style
// const SidebarRight = () => {
//   return (
//     // eslint-disable-next-line react/self-closing-comp
//     <div className="sidebar-right">
//       <div className="sidebar-right-content">
//         <i className="ti-bookmark" />
//         <p>Bookmark</p>
//       </div>
//       <div className="sidebar-right-search">
//         <Input placeholder="Search bookmark..." inputProps={ariaLabel} />
//         <i className="ti-search" />
//       </div>
//       <div className="list-bookmark">
//         <ul className="list-bookmark-items">
//           <li>
//             <div className="bookmark-item">
//               <i className="ti-pencil bookmark-icon" />
//               <div className="bookmark">
//                 <a src="#" className="title"> React: HelloWord</a>
//                 <p>ueqwheuqhwuedqjw</p>
//               </div>
//             </div>
//             <div className="bookmark-item">
//               <i className="ti-pencil bookmark-icon" />
//               <div className="bookmark">
//                 <a src="#" className="title"> React: HelloWord</a>
//                 <p>ueqwheuqhwuedqjw</p>
//               </div>
//             </div>
//             <div className="bookmark-item">
//               <i className="ti-pencil bookmark-icon" />
//               <div className="bookmark">
//                 <a src="#" className="title"> React: HelloWord</a>
//                 <p>ueqwheuqhwuedqjw</p>
//               </div>
//             </div>
//             <div className="bookmark-item">
//               <i className="ti-pencil bookmark-icon" />
//               <div className="bookmark">
//                 <a src="#" className="title"> React: HelloWord</a>
//                 <p>ueqwheuqhwuedqjw</p>
//               </div>
//             </div>
//             <div className="bookmark-item">
//               <i className="ti-pencil bookmark-icon" />
//               <div className="bookmark">
//                 <a src="#" className="title"> React: HelloWord</a>
//                 <p>ueqwheuqhwuedqjw</p>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SidebarRight;
