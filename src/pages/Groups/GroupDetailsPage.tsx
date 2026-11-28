import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { groups } from "../../data/groups";

// trang chi tiet group

function GroupDetailsPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const group = groups.find((item) => item.id === groupId);

    if (!group) {
        return (
            <main className="group-details-page">
                <h1>Không tìm thấy nhóm</h1>
                <Link to="/friends">Quay lại danh sách bạn bè</Link>
            </main>
        );
    }

    return (
        <main className="group-details-page">
            <Link className="group-details-page__back" to="/friends">
                ← Quay lại
            </Link>

            <header className="group-details-page__header">
                <div className="group-details-page__icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>

                <div>
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>
                    <span>
                        {group.memberCount} thành viên · {group.onlineCount} đang hoạt động
                    </span>
                </div>
            </header>

            <section className="group-details-page__members">
                <h2>Thành viên ({group.members.length})</h2>

                <ul>
                    {group.members.map((member) => (
                        <li
                            className="group-member"
                            key={member.id}
                        >
                            <div className="group-member__avatar-wrap">
                                <img
                                    src={member.avatar_url}
                                    alt={member.name}
                                    className="group-member__avatar"
                                />

                                <span
                                    className={`group-member__status ${
                                        member.online ? "is-online" : ""
                                    }`}
                                    aria-label={
                                        member.online
                                            ? "Đang hoạt động"
                                            : "Đang offline"
                                    }
                                />
                            </div>

                            <div className="group-member__info">
                                <strong>{member.name}</strong>
                                <span>@{member.username}</span>
                            </div>

                            <span className="group-member__role">
                                {member.role === "admin"
                                    ? "Quản trị viên"
                                    : "Thành viên"}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}


export default GroupDetailsPage;