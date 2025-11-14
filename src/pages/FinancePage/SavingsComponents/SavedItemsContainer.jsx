import SavedItem from "./SavedItem";
import { savingsGoals } from '../../../data/financemockData/savingsData'

export default function SavedItemsContainer() {
    const mySavings = savingsGoals

    return(
        <div className=" grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-16">
            {mySavings.map((item, index) => (
                <SavedItem 
                    key={item.id} 
                    title={item.title}
                    percentage={item.percentage}
                    dueDate={item.dueDate}
                    goalAmount={item.goalAmount}
                    monthlyContribution={item.monthlyContribution}
                    currentAmount={item.currentAmount}

                />
            ))}
        </div>
    )
} 