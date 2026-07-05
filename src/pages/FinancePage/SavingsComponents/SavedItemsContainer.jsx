import { useState } from "react";
import SavedItem from "./SavedItem";
import { savingsGoals } from '../../../data/financemockData/savingsData'

export default function SavedItemsContainer() {
    const [mySavings, setMySavings] = useState(savingsGoals);

    const handleTopUp = (id, amount) => {
        setMySavings((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          currentAmount: item.currentAmount + amount,
                          percentage: Math.min(
                              100,
                              Math.round(((item.currentAmount + amount) / item.goalAmount) * 100)
                          ),
                      }
                    : item
            )
        );
    };

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
                    onTopUp={(amount) => handleTopUp(item.id, amount)}
                />
            ))}
        </div>
    )
} 
