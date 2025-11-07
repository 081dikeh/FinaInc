import AddCardBtn from "./MyCardComponents/AddCardBtn";
import CardContainer from "./MyCardComponents/CardContainer";
import MyCardTable from "./MyCardComponents/MyCardTable";


export default function MyCard() {
  return (
    <section className="w-full max-w-7xl font-Geist">
        <div className="flex justify-between items-center mb-6">
            <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Card</h1>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-600 font-semibold cursor-pointer hover:underline">Dashboard</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-500">My Card</span>
            </div>
            </div>

            {/* Add Card Button */}
            <AddCardBtn />
        </div>

        <div className="w-full">
            <CardContainer />
        </div>  

        <div>
          <MyCardTable />
        </div>     
    </section>
  )
};

