import { MagnifyingGlass } from "phosphor-react";

interface FriendSearchProps {
    value: string;
    onChange: (value: string) => void;
}
//
//component khung search ban be de tim kiem ban be co trong danh sach

function FriendSearch({ value, onChange }: FriendSearchProps) {
    return (
        <label className="friend-search">
            <MagnifyingGlass size={20} aria-hidden="true" />

            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Tìm theo tên hoặc username..."
                aria-label="Tìm bạn bè"
            />
        </label>
    );
}



export default FriendSearch;