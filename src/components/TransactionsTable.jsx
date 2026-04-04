function TransactionsTable({ transactions, role, filter, setFilter,setShowModal }) {

  const filtered = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <div>
      <div className="flex gap-3 mb-4 items-center">

  <select 
    onChange={(e) => setFilter(e.target.value)}
    className="bg-gray-800 border border-gray-600 px-3 py-2 rounded"
  >
    <option value="all">All</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  {role === "admin" && (
    <button 
  onClick={() => setShowModal(true)}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
>
  + Add Transaction
</button>
  )}

</div>

      <table className="w-full border border-gray-700 rounded-xl overflow-hidden">
  <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
    <tr className="border-t border-gray-700 text-center hover:bg-gray-800 even:bg-gray-900">
      <th className="p-3">Date</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Category</th>
      <th className="p-3">Type</th>
    </tr>
  </thead>

  <tbody>
    {filtered.map(t => (
      <tr key={t.id} className="border-t border-gray-700 text-center hover:bg-gray-800 even:bg-grey-900">
        <td className="p-3">{t.date}</td>
        <td className="p-3 font-semibold">₹{t.amount}</td>
        <td className="p-3">{t.category}</td>
        <td className={`p-3 font-medium ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
          {t.type}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default TransactionsTable;