import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ViewAll() {
  return (
    <Link className="text-brand-600 text-sm hover:underline flex gap-1 items-center font-[500]">
        View all     
        <ArrowRight size={14} />
    </Link>
  );
}