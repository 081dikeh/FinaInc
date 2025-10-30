

export default function Card({ balance, cardNumber, expDate, bgColor }) {
    return (

        <div className={` rounded-2xl p-4 shadow-xl text-white font-geist ${bgColor} h-48 flex-shrink-0 w-80`} >
        {/* Header Section */}
            <div className="flex justify-between mb-6 ">
                <div>
                <p className="text-sm mb-2">Total Balance</p>
                <h2 className="text-2xl font-semibold">${balance}</h2>
                </div>
                
                {/* Mastercard Logo */}
                <div className="flex gap-[-8px]">
                <div className="w-8 h-8 rounded-full bg-red-500 opacity-90"></div>
                <div className="w-8 h-8 rounded-full bg-orange-400 opacity-90 -ml-4"></div>
                </div>
            </div>

            {/* Card Details Section */}
            <div className="flex justify-between gap-20 mt-12">
                {/* Card Number */}
                <div>
                <p className="text-sm mb-2">Card Number</p>
                <p className="text-base font-semibold">
                    **** **** **** {cardNumber}
                </p>
                </div>

                {/* Expiry Date */}
                <div className="text-right">
                <p className="text-sm mb-2">Exp</p>
                <p className="text-base font-semibold">{expDate}</p>
                </div>
            </div>

        </div>
    );
}

/* carousel */