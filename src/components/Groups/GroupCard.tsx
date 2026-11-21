import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import type { ChatGroup } from "../../types/group";

interface GroupCardProps {
    group: ChatGroup;
    onOpen: (group: ChatGroup) => void;
}
// the group nam trong trang friend

function GroupCard({ group, onOpen }: GroupCardProps) {
    return (
        <article className="group-card">
            <div className="group-card__icon" aria-hidden="true">
                <FontAwesomeIcon icon={faUserGroup} />
            </div>

            <div className="group-card__info">
                <h3 className="group-card__name">{group.name}</h3>
                <p className="group-card__members">
                    {group.memberCount} thành viên · {group.onlineCount} đang hoạt động
                </p>
            </div>
            <button
                className="group-card__button"
                type="button"
                onClick={() => onOpen(group)}
            >
                Mở nhóm
            </button>
        </article>
    );
}


export default GroupCard;