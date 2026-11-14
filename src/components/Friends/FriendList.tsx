import type { Friend } from "../../types/friend";
import FriendCard from "./FriendCard";

//component danh sach ban be cua app tro chuyen

interface FriendsListProps {
    friends: Friend[];
    onMessage: (friend: Friend) => void;
}

function FriendsList({ friends, onMessage }: FriendsListProps) {
    if (friends.length === 0) {
        return (
            <p className="friends-list__empty">
                Không tìm thấy bạn bè.
            </p>
        );
    }
    return (
        <div className="friends-list">
            {friends.map((friend) => (
                <FriendCard
                    key={friend.id}
                    friend={friend}
                    onMessage={onMessage}
                />
            ))}
        </div>
    );
}

export default FriendsList;