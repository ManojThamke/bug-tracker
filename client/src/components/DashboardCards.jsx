function DashboardCards() {
  const cards = [
    { title: "Total Projects", count: 5, color: "bg-[#EAD6F9]" }, 
    { title: "Open Tickets", count: 12, color: "bg-[#F9D6EC]" },  
    { title: "In Progress", count: 8, color: "bg-[#FFF2CC]" },    
    { title: "Completed", count: 15, color: "bg-[#D9F7E6]" },     
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl text-purple-800 shadow ${card.color}`}
        >
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-3xl font-bold">{card.count}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
