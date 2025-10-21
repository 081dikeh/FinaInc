export default function StatCard({ title, titleIcon, value, isPositive, change, incremental }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-1">
      <div className="flex justify-between">
        <p className="text-sm text-brand-200 ">{title}</p>
        <img src={titleIcon} alt="" />
      </div>

        <h3 className="mb-2 text-2xl font-semibold text-brand-500">{value}</h3>
        <p className={`text-sm mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} <span>{incremental = '+$150 today'}</span>
        </p>
    </div>
  )  
}  