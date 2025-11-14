import PageTitle from "../../components/layout/PageTitle";
import { useState } from "react";
import { Search, ChevronDown} from "lucide-react";
import InandOutTable from "./InandOutComponents/InandOutTable";
import { transactions as data } from "../../data/financemockData/transactionsMockData";


export default function InAndOut() {
    const [accountType, setAccountType] = useState('All Account');

    const [cashType, setCashType] = useState('All Types');
    const [timeFrame, setTimeFrame] = useState('Newest');    
      const [selectedAccount, setSelectedAccount] = useState('All Account');

  const accounts = [
    { id: 1, name: 'All Account', colors: ['bg-red-500', 'bg-orange-500'] },
    { id: 2, name: 'Savings Account', colors: ['bg-blue-500', 'bg-cyan-500'] },
    { id: 3, name: 'Checking Account', colors: ['bg-green-500', 'bg-emerald-500'] },
    { id: 4, name: 'Investment Account', colors: ['bg-purple-500', 'bg-pink-500'] }
  ];

  const selectedAccountData = accounts.find(acc => acc.name === selectedAccount);
    return (
        <section>
            <div>
                <PageTitle title="In and Out" navigationRoute="In and Out" />
            </div>

            <div className="flex items-center gap-3 mt-8">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                        <input placeholder="Search transaction..." className=" pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-2 text-sm text-brand-400 font-medium">

                            <div className="relative inline-block">
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg pointer-events-none absolute inset-0 z-10">
                                    {/* Mastercard-like icon */}
                                    <div className="relative w-8 h-6 flex items-center">
                                    <div className={`absolute w-5 h-5 ${selectedAccountData.colors[0]} rounded-full opacity-90`}></div>
                                    <div className={`absolute left-3 w-5 h-5 ${selectedAccountData.colors[1]} rounded-full opacity-90`}></div>
                                    </div>
                                    
                                    <span className="text-sm font-medium text-gray-700 flex-1">
                                    {selectedAccount}
                                    </span>
                                    
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </div>

                                <select
                                    value={selectedAccount}
                                    onChange={(e) => setSelectedAccount(e.target.value)}
                                    className="appearance-none w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors min-w-[160px] opacity-0 relative z-20"
                                >
                                    {accounts.map((account) => (
                                    <option key={account.id} value={account.name}>
                                        {account.name}
                                    </option>
                                    ))}
                                </select>
                            </div>

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

                    </div>  

                </div>
                <InandOutTable data={data} /> 
        </section>
    )
}