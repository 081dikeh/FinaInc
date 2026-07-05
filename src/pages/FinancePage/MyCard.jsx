import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCardBtn from "./MyCardComponents/AddCardBtn";
import AddCardModal from "./MyCardComponents/AddCardModal";
import CardContainer from "./MyCardComponents/CardContainer";
import MyCardTable from "./MyCardComponents/MyCardTable";
import PageTitle from "../../components/layout/PageTitle";
import { transactions as data } from "../../data/financemockData/transactionsMockData";
import { initialCards } from "../../data/financemockData/cardsData";

export default function MyCard() {
  const [cards, setCards] = useState(initialCards);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCard = (card) => {
    setCards((prev) => [...prev, card]);
  };

  const handleCardClick = (card) => {
    navigate(`/finance/my-card/${card.id}`, { state: { card } });
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
        <div className="flex justify-between items-end mb-6">
            <PageTitle title="My Card" navigationRoute="My Card" />

            {/* Add Card Button */}
            <AddCardBtn onClick={() => setIsAddOpen(true)} />
        </div>

        <div className="w-full">
            <CardContainer cards={cards} onCardClick={handleCardClick} />
        </div>  

        <div>
          <MyCardTable data={data} />
        </div>

        <AddCardModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddCard}
        />
    </section>
  )
};
