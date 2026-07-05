import Card from "./Card";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardContainer({ cards, onCardClick }){
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
            <div className="w-full relative">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 w-full"
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
                            onClick={() => onCardClick && onCardClick(card)}
                        />
                    ))}
                </div>

                {/* navigation arrows */}
                <div className="absolute right-0">
                    <button 
                        onClick={scrollLeft}
                        disabled={activeCard === 0}
                        className=" bg-[#E5E0FC] text-primary-light rounded-lg p-1 mr-2 hover:bg-primary-light hover:text-white transition"
                    >
                        <ChevronLeft/>
                    </button>

                    <button 
                        onClick={scrollRight}
                        disabled={activeCard === cards.length - 1}
                        className="bg-[#E5E0FC] text-primary-light rounded-lg p-1 mr-2 hover:bg-primary-light hover:text-white transition"
                    >
                        <ChevronRight/>
                    </button>
                </div>
                
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
