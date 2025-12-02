export default function PageTitle({ title, navigationRoute}) {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-600 font-semibold cursor-pointer hover:underline">Dashboard</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-500">{navigationRoute}</span>
            </div>
        </div>
    )
}