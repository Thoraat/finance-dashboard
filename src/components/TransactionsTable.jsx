import { useState } from "react";

function TransactionsTable({ transactions, role, filter, setFilter, setShowModal }) {

  const [search, setSearch] = useState("");

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === "all" || t.type === filter;

    const matchesSearch =
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div>

      {/* 🔍 Filter + Search + Add Button */}
      <div className="flex gap-3 mb-4 items-center flex-wrap">

        <select 
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-white"
        />

        {role === "admin" && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
          >
            + Add Transaction
          </button>
        )}

      </div>

      {/* 📋 Table */}
      <table className="w-full border border-gray-700 rounded-xl overflow-hidden">
        
        <thead className="bg-gray-800 text-gray-300 uppercase text-sm">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map(t => (
              <tr 
                key={t.id} 
                className="border-t border-gray-700 text-center hover:bg-gray-800 even:bg-gray-900"
              >
                <td className="p-3">{t.date}</td>
                <td className="p-3 font-semibold">₹{t.amount}</td>
                <td className="p-3">{t.category}</td>
                <td className={`p-3 font-medium ${
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }`}>
                  {t.type}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-400">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default TransactionsTable;