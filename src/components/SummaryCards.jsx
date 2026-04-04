function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6">

  <div className="bg-green-500/10 border border-green-500 p-5 rounded-2xl 
hover:shadow-lg hover:shadow-green-500/20 
hover:scale-105 transition duration-300 ease-in-out">
    <p className="text-gray-400 text-sm">Income</p>
    <h2 className="text-2xl font-bold text-green-400">₹{income}</h2>
  </div>

  <div className="bg-red-500/10 border border-red-500 p-5 rounded-2xl hover:shadow-lg hover:shadow-red-500/20 
hover:scale-105 transition duration-300 ease-in-out">
    <p className="text-gray-400 text-sm">Expenses</p>
    <h2 className="text-2xl font-bold text-red-400">₹{expense}</h2>
  </div>

  <div className="bg-blue-500/10 border border-blue-500 p-5 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 
hover:scale-105 transition duration-300 ease-in-out">
    <p className="text-gray-400 text-sm">Balance</p>
    <h2 className="text-2xl font-bold text-blue-400">₹{balance}</h2>
  </div>

</div>
  );
}

export default SummaryCards;