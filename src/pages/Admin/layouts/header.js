import "../assets/css/bootstrap.min.css";
import "../assets/css/dataTables.bootstrap4.min.css";
import "../assets/css/fullcalendar.min.css";
import "../assets/css/select2.min.css";
import "../assets/css/style.css";
import "../assets/css/tagsinput.css";
import logo from "../assets/img/KnowX_logo.png";
import "./styles.scss";

const header = () => {
  const avatar = sessionStorage.getItem("avatar");
  const handleLogout = () => {
    const token = sessionStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch("http://127.0.0.1:8000/api/user/logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          window.location.reload();
          sessionStorage.clear();
          const temp = window.location.origin;
          window.location.href = `${temp}/auth`;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="header">
      <div className="header-left">
        <a href="/admin" className="logo">
          <img src={logo} height="60" alt="" />{" "}
          <span className="mt-2">ADMIN</span>
        </a>
      </div>
      <a id="toggle_btn" href="javascript:void(0);">
        <i className="fa fa-bars" />
      </a>
      <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
        <i className="fa fa-bars" />
      </a>
      <ul className="nav user-menu float-right">
        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link user-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src={`http://127.0.0.1:8000/${avatar}`}
                width="40"
                alt="Admin"
              />
              <span className="status online" />
            </span>
            <span>Admin</span>
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="edit-profile.html">
              Edit Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <p
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu float-right">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="profile.html">
            My Profile
          </a>
          <a className="dropdown-item" href="edit-profile.html">
            Edit Profile
          </a>
          <a className="dropdown-item" href="settings.html">
            Settings
          </a>
          <a className="dropdown-item" href="login.html">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default header;
