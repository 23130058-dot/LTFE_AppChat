import type { Friend } from "../../types/friend";

interface FriendCardProps {
    friend: Friend;
    onMessage: (friend: Friend) => void;
}
// component hien thi thong tin cua friend
//bao gom anh dai dien, ten, trang thai online hay offline, va  chat button.

function FriendCard({ friend, onMessage }: FriendCardProps) {
    return (
        <article className="friend-card">
            <div className="friend-card__identity">
                <div className="friend-card__avatar-wrap">
                    <img
                        className="friend-card__avatar"
                        src={friend.avatar_url}
                        alt={`Ảnh đại diện của ${friend.name}`}
                    />

                    <span
                        className={`friend-card__status-dot ${
                            friend.online ? "is-online" : ""
                        }`}
                    />
                </div>

                <div className="friend-card__info">
                    <h2 className="friend-card__name">{friend.name}</h2>
                    <p className="friend-card__username">@{friend.username}</p>
                    <p className="friend-card__status">
                        {friend.online ? "Đang hoạt động" : "Đang offline"}
                    </p>
                </div>
            </div>


            <button
                className="friend-card__message-button"
                type="button"
                onClick={() => onMessage(friend)}
            >
                Nhắn tin
            </button>
        </article>
    );
}


export default FriendCard;