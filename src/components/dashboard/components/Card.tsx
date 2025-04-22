type Card= {
    title:string,
    value:string,
    icon:any,
    color:string
}

export default function Card (card:Card) {
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{card.value}</p>
          </div>
          <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
            {card.icon}
          </div>
        </div>
      </div>
    );
  };