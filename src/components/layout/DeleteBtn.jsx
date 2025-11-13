
import { Trash2 } from "lucide-react";

export default function DeleteBtn() {
    return (
        <button className="flex items-center gap-2 px-3 py-1 rounded bg-[#FCE0E0] text-[#F16363] rounded-lg">
            <Trash2 size={20} />
            <span>Delete</span>
        </button>
    );
}
