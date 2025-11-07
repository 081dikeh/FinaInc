import { Search } from "lucide-react"
import { useState } from "react"

export default function MyCardTable() {
    const [cashType, setCashType] = useState('All Types');
    return (
        <section>
            <div>
                <ul className="flex gap-2 text-brand-300 text-sm cursor-pointer font-semibold">
                    <li>All Card</li>
                    <li>Purple Card</li>
                    <li>Black Card</li>
                    <li>Blue Card</li>
                    <li>Green Card</li>
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-3 p-4 bg-white">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input placeholder="Search transaction..." className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <select name="" id=""
                        
                            value={cashType}
                            onChange={(e) => setCashType(e.target.value)}
                            className="border rounded-lg p-2"
                        
                        >
                            <option value={8}>8</option>
                            <option value={16}>16</option>
                            <option value={32}>32</option>
                        </select>

                    </div>
                </div>
            </div>
        </section>
    )
}