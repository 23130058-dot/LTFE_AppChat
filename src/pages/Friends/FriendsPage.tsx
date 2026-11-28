import { useState } from "react";
import { friends } from "../../data/friends";
import { groups } from "../../data/groups";
import type { Friend } from "../../types/friend";
import type { ChatGroup } from "../../types/group";
import FriendSearch from "../../components/Friends/FriendSearch";
import FriendsList from "../../components/Friends/FriendList";
import GroupList from "../../components/Groups/GroupList";
import "../../styles/friends-page.scss";
import { useNavigate } from "react-router-dom";

type ActiveTab = "friends" | "groups";

//trang ban be cua app tro chuyen

function FriendsPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("friends");
    const [searchText, setSearchText] = useState("");
    const [notice, setNotice] = useState("");

    const normalizedSearch = searchText.trim().toLowerCase();

    const filteredFriends = friends.filter((friend) =>
        `${friend.name} ${friend.username}`
            .toLowerCase()
            .includes(normalizedSearch)
    );

    const handleOpenFriend = (friend: Friend) => {
        setNotice(`Bạn đã chọn nhắn tin với ${friend.name}.`);
    };

    const handleOpenGroup = (group: ChatGroup) => {
        setNotice("");
        navigate(`/groups/${group.id}`);
    };

    const selectTab = (tab: ActiveTab) => {
        setActiveTab(tab);
        setNotice("");
    };
    const navigate = useNavigate();

    return (
        <section className="friends-page">
            <header className="friends-page__header">
                <div>
                    <h1>Bạn bè</h1>
                    <p>Xem bạn bè và các nhóm của bạn.</p>
                </div>

                <span>{friends.length} bạn bè</span>
            </header>

            <div
                className="friends-page__tabs"
                role="tablist"
                aria-label="Danh bạ"
            >
                <button
                    id="friends-tab"
                    className={activeTab === "friends" ? "active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "friends"}
                    aria-controls="friends-panel"
                    onClick={() => selectTab("friends")}
                >
                    Bạn bè
                    <span>{friends.length}</span>
                </button>

                <button
                    id="groups-tab"
                    className={activeTab === "groups" ? "active" : ""}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "groups"}
                    aria-controls="groups-panel"
                    onClick={() => selectTab("groups")}
                >
                    Nhóm
                    <span>{groups.length}</span>
                </button>
            </div>

            {notice && (
                <p className="friends-page__notice" role="status">
                    {notice}
                </p>
            )}

            {activeTab === "friends" ? (
                <div
                    id="friends-panel"
                    role="tabpanel"
                    aria-labelledby="friends-tab"
                >
                    <FriendSearch
                        value={searchText}
                        onChange={setSearchText}
                    />

                    <h2>Danh sách bạn bè</h2>

                    <FriendsList
                        friends={filteredFriends}
                        onMessage={handleOpenFriend}
                    />
                </div>
            ) : (
                <div
                    id="groups-panel"
                    role="tabpanel"
                    aria-labelledby="groups-tab"
                >
                    <h2>Nhóm của bạn</h2>

                    <GroupList
                        groups={groups}
                        onOpen={handleOpenGroup}
                    />
                </div>
            )}
        </section>
    );
}

export default FriendsPage;