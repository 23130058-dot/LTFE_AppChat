
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faComments, faMessage, faUserGroup, faGear, faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <aside className="sidebar">

            {/*logo*/}
            <div className="sidebar__logo">
                <FontAwesomeIcon icon={faComments} />
            </div>

            {/*navigation*/}
            <nav className="sidebar__navigation">
                <NavLink
                    to="/app"
                    className={({ isActive }) =>
                        `sidebar__nav-item ${isActive ? "active" : ""}`
                    }
                    title="Chat"
                >
                    <FontAwesomeIcon icon={faMessage} />
                </NavLink>

                <NavLink
                    to="/friends"
                    className={({ isActive }) =>
                        `sidebar__nav-item ${isActive ? "active" : ""}`
                    }
                    title="Bạn bè"
                >
                    <FontAwesomeIcon icon={faUserGroup} />
                </NavLink>

                <div className="sidebar__divider"></div>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `sidebar__nav-item ${isActive ? "active" : ""}`}
                    title="Cài đặt"
                >
                    <FontAwesomeIcon icon={faGear} />
                </NavLink>

            </nav>

            {/* Bottom actions */}
            <div className="sidebar__bottom">

                {/* Theme Switch */}
                <button
                    className={`sidebar__theme-switch ${
                        isDarkMode ? "dark" : ""
                    }`}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title="Chuyển đổi giao diện"
                    aria-label="Chuyển đổi giao diện"
                    aria-pressed={isDarkMode}
                >
                    <span className="sidebar__theme-icon">
                        <FontAwesomeIcon icon={faSun} />
                    </span>

                    <span className="sidebar__theme-icon">
                        <FontAwesomeIcon icon={faMoon} />
                    </span>

                    <span className="sidebar__theme-thumb"></span>
                </button>

                {/* User Avatar */}
                <button
                    className="sidebar__avatar"
                    title="Tài khoản của tôi"
                >
                    TN
                    <span className="sidebar__online-status"></span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
