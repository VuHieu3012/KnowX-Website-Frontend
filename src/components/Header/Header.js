/* eslint-disable import/no-unresolved */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Input } from "@material-ui/core";

const ariaLabel = { 'aria-label': 'description' };

const Header = () => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <div className="header-container">
    <div className="header-banner" />
    <div className="header-navbar">
      <button>HOMEPAGE</button>
      <button className="post-option">POST
        <i className="ti-angle-down" />
        <div className="hover-post">
          <a href="#">Followings</a>
          <a href="#">Newest</a>
          <a href="#">Top read</a>
          <a href="#">Master post</a>
          <a href="#">Create post</a>
        </div>
      </button>
      <button className="question-option">QUESTION
        <i className="ti-angle-down" />
        <div className="hover-question">
          <a href="#">Followings</a>
          <a href="#">Newest</a>
          <a href="#">Unsolved</a>
          <a href="#">Interest</a>
        </div>
      </button>
      <button>FIND BUDDY</button>
      <button>FIND MENTOR</button>
      <button>VIDEO CALL</button>
      <div className="header-search">
        <Input placeholder="Search something..." inputProps={ariaLabel} />
        <i className="ti-search" />
      </div>
    </div>
  </div>
);

export default Header;
