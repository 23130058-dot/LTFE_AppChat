import type { ChatGroup } from "../../types/group";
import GroupCard from "./GroupCard";

interface GroupListProps {
    groups: ChatGroup[];
    onOpen: (group: ChatGroup) => void;
}

// group list chua cac group card

function GroupList({ groups, onOpen }: GroupListProps) {
    if (groups.length === 0) {
        return (
            <p className="group-list__empty">
                Bạn chưa tham gia nhóm nào.
            </p>
        );
    }

    return (
        <div className="group-list">
            {groups.map((group) => (
                <GroupCard
                    key={group.id}
                    group={group}
                    onOpen={onOpen}
                />
            ))}
        </div>
    );
}

export default GroupList;