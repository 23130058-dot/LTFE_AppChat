import { useState } from "react";
import { friends } from "../../data/friends";
import type { Friend } from "../../types/friend";
import FriendSearch from "../../components/Friends/FriendSearch";
import FriendsList from "../../components/Friends/FriendList";

//Trang ban be cua ap tro chuyen

function FriendsPage() {
    const [searchText, setSearchText] = useState("");
    const [notice, setNotice] = useState("");

    const normalizedSearch = searchText.trim().toLowerCase();

    const filteredFriends = friends.filter((friend) =>
        `${friend.name} ${friend.username}`
            .toLowerCase()
            .includes(normalizedSearch)
    );
    const handleMessage = (friend: Friend) => {
        setNotice(`Bạn đã chọn nhắn tin với ${friend.name}.`);
    };
    return (
        <section className="friends-page">
            <header className="friends-page__header">
                <div>
                    <h1>Bạn bè</h1>
                    <p>Tìm bạn bè và chọn người để trò chuyện.</p>
                </div>

                <span>{friends.length} bạn bè</span>
            </header>

            <FriendSearch
                value={searchText}
                onChange={setSearchText}
            />

            {notice && <p role="status">{notice}</p>}
            <h2>Danh sách bạn bè</h2>

            <FriendsList
                friends={filteredFriends}
                onMessage={handleMessage}
            />
        </section>
    );
}


export default FriendsPage;