import { Plus } from "lucide-react";

const AddCardBtn = () => {
    const handleAddCard = () => {
        alert('Add new card clicked!');
    };
    return (
        <button 
            onClick={handleAddCard}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
            <Plus size={20} />
            Add Card
        </button>
    )
}

export default AddCardBtn