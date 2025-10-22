import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function StatCard({ title, titleIcon, value, isPositive, change, incremental }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-1">
      <div className="flex justify-between">
        <p className="text-sm text-brand-200 font-[500] ">{title}</p>
        <img src={titleIcon} className="w-[32px]" alt="" />
      </div>

        <h3 className="mb-2 text-2xl font-semibold text-brand-500">{value}</h3>
        <div className=" flex gap-3">
          <p className={`text-sm mt-2 font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} 
          {isPositive ? <ArrowUpRight size={14} className="inline-block ml-1"/> : <ArrowDownRight size={14} className="inline-block ml-1"/>}
        </p>
        <span className="text-sm mt-2 text-brand-200 font-[500]">{incremental = '+$150 today'}</span>
        </div>

    </div>
  )  
}  