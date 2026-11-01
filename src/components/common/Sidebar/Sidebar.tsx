
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faComments, faMessage, faUserGroup, faGear, faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.scss";

function Sidebar() {
    const [activeItem, setActiveItem] = useState("chat");
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <aside className="sidebar">

            {/*logo*/}
            <div className="sidebar__logo">
                <FontAwesomeIcon icon={faComments} />
            </div>

            {/*navigation*/}
            <nav className="sidebar__navigation">
                <button
                    className={`sidebar__nav-item ${activeItem === "chat" ? "active" : ""}`}
                    onClick={() => setActiveItem("chat")}
                    title="Chat"
                >
                    <FontAwesomeIcon icon={faMessage} />
                </button>

                <button
                    className={`sidebar__nav-item ${
                        activeItem === "friends" ? "active" : ""
                    }`}
                    onClick={() => setActiveItem("friends")}
                    title="Bạn bè"
                >
                    <FontAwesomeIcon icon={faUserGroup} />
                </button>

                <div className="sidebar__divider"></div>

                <button
                    className={`sidebar__nav-item ${
                        activeItem === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveItem("settings")}
                    title="Cài đặt"
                >
                    <FontAwesomeIcon icon={faGear} />
                </button>

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
