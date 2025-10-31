import Card from "./Card";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';


const cards = [
  { id: 1, bgColor: "bg-[#7F63F1]", balance: "11,240.00", cardNumber: "9090", expDate: "07/25" },
  { id: 2, bgColor: "bg-[#333843]", balance: "10,540.00", cardNumber: "9054", expDate: "02/25" },
  { id: 3, bgColor: "bg-[#2D99FE]", balance: "15,320.00", cardNumber: "9080", expDate: "05/25" },
  { id: 4, bgColor: "bg-[#14CB74]", balance: "30,200.00", cardNumber: "9070", expDate: "08/25" },
];


export default function CardContainer(){
    const scrollContainerRef = useRef(null);
    const [activeCard, setActiveCard] = useState(0);

    function scrollLeft(){
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: -350,
                behavior: 'smooth'
            });
            setActiveCard(Math.max(0, activeCard - 1));
        }        
    }

    function scrollRight(){
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: 350,
                behavior: 'smooth'
            });
            setActiveCard(Math.min(cards.length - 1, activeCard + 1));
        }
    }
    

    return(
        <div className=" mx-auto p-2 w-full">
            <div className="w-full">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 cursor-pointer w-full"
                    style={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            bgColor={card.bgColor}
                            balance={card.balance}
                            cardNumber={card.cardNumber}
                            expDate={card.expDate}
                        />
                    ))}
                </div>

                {/* navigation arrows */}
                <button 
                    onClick={scrollLeft}
                    disabled={activeCard === 0}
                    className=" "
                >
                    <ChevronLeft/>
                </button>

                <button 
                    onClick={scrollRight}
                    disabled={activeCard === cards.length - 1}
                    className=" "
                >
                    <ChevronRight/>
                </button>
            </div>


            {/* Pagination Dots */}
            <div>
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                        setActiveCard(index);
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({ 
                            left: index * 350, 
                            behavior: 'smooth' 
                            });
                        }
                        }}
                        className={`h-2 mr-1 rounded-full transition-all ${
                        index === activeCard 
                            ? 'w-8 bg-primary-light' 
                            : 'w-2 bg-gray-300'
                        }`}
                    />
                 ))}
            </div>
            {/* Hide Scrollbar CSS */}
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                    }
                    .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    }
                `}</style>
        </div>
    )

}