import PageTitle from "../../components/layout/PageTitle"
import { Plus, Search  } from "lucide-react"
import { useState } from "react"
import DeleteBtn from "../../components/layout/DeleteBtn";
import SavedItemsContainer from "./SavingsComponents/SavedItemsContainer";



export default function Savings() {
    const [cashType, setCashType] = useState('All Types');
    const [timeFrame, setTimeFrame] = useState('Newest');
    return (
        <section>
            <div className="flex justify-between items-end mb-6">
                <PageTitle title="Savings" navigationRoute="Savings" />

                <button className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"><Plus /> Add new</button>
            </div>
            <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                        <input placeholder="Search transaction..." className=" pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-2 text-sm text-brand-400 font-medium">

                        <select name="" id=""                        
                            value={cashType}
                            onChange={(e) => setCashType(e.target.value)}
                            className="border rounded-lg p-2"
                        
                        >
                            <option value={'All Types'}>All Types</option>
                            <option value={'Income'}>Income</option>
                            <option value={'Expense'}>Expense</option>
                            <option value={'Transfer'}>Transfer</option>
                        </select>

                        <select name="" id=""                       
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                            className="border rounded-lg p-2"
                        
                        >
                            <option value={'Newest'}>Newest</option>
                            <option value={'Oldest'}>Oldest</option>
                        </select>

                        <DeleteBtn />

                    </div>   
                </div>

                <div>
                    <SavedItemsContainer/>
                </div>
        </section>
    )
}