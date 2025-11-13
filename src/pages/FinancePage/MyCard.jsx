import AddCardBtn from "./MyCardComponents/AddCardBtn";
import CardContainer from "./MyCardComponents/CardContainer";
import MyCardTable from "./MyCardComponents/MyCardTable";
import PageTitle from "../../components/layout/PageTitle";
import { transactions as data } from "../../data/financemockData/transactionsMockData";


export default function MyCard() {
  return (
    <section className="w-full min-w-7xl font-Geist">
        <div className="flex justify-between items-end mb-6">
            <PageTitle title="My Card" navigationRoute="My Card" />

            {/* Add Card Button */}
            <AddCardBtn />
        </div>

        <div className="w-full">
            <CardContainer />
        </div>  

        <div>
          <MyCardTable data={data} />
        </div>     
    </section>
  )
};

