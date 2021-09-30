/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import "./styles.scss";
import { Input } from "@material-ui/core";

const ariaLabel = { 'aria-label': 'description' };
// eslint-disable-next-line arrow-body-style
const SidebarRight = () => {
  return (
    // eslint-disable-next-line react/self-closing-comp
    <div className="sidebar-right">
      <div className="sidebar-right-content">
        <i className="ti-bookmark" />
        <p>Bookmark</p>
      </div>
      <div className="sidebar-right-search">
        <Input placeholder="Search bookmark..." inputProps={ariaLabel} />
        <i className="ti-search" />
      </div>
      <div className="list-bookmark">
        <ul className="list-bookmark-items">
          <li>
            <div className="bookmark-item">
              <i className="ti-pencil bookmark-icon" />
              <div className="bookmark">
                <a src="#" className="title"> React: HelloWord</a>
                <p>ueqwheuqhwuedqjw</p>
              </div>
            </div>
            <div className="bookmark-item">
              <i className="ti-pencil bookmark-icon" />
              <div className="bookmark">
                <a src="#" className="title"> React: HelloWord</a>
                <p>ueqwheuqhwuedqjw</p>
              </div>
            </div>
            <div className="bookmark-item">
              <i className="ti-pencil bookmark-icon" />
              <div className="bookmark">
                <a src="#" className="title"> React: HelloWord</a>
                <p>ueqwheuqhwuedqjw</p>
              </div>
            </div>
            <div className="bookmark-item">
              <i className="ti-pencil bookmark-icon" />
              <div className="bookmark">
                <a src="#" className="title"> React: HelloWord</a>
                <p>ueqwheuqhwuedqjw</p>
              </div>
            </div>
            <div className="bookmark-item">
              <i className="ti-pencil bookmark-icon" />
              <div className="bookmark">
                <a src="#" className="title"> React: HelloWord</a>
                <p>ueqwheuqhwuedqjw</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarRight;
