import SavedItem from "./SavedItem";

export default function SavedItemsContainer({ items, onTopUp }) {
    return(
        <div className=" grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8">
            {items.map((item) => (
                <SavedItem 
                    key={item.id} 
                    title={item.title}
                    percentage={item.percentage}
                    dueDate={item.dueDate}
                    goalAmount={item.goalAmount}
                    monthlyContribution={item.monthlyContribution}
                    currentAmount={item.currentAmount}
                    onTopUp={(amount) => onTopUp(item.id, amount)}
                />
            ))}
            {items.length === 0 && (
                <p className="col-span-full text-center text-brand-100 text-sm py-12">
                    No savings goals match your search.
                </p>
            )}
        </div>
    )
} 
