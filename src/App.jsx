import { useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import TransactionsTable from "./components/TransactionsTable";
import Insights from "./components/Insights";
import { transactions as data } from "./data/transactions";

function App() {
  const [transactions, setTransactions] = useState(data);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6 max-w-6xl mx-auto">
      <Navbar role={role} setRole={setRole} />

      {/* Dashboard Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300 tracking-wide">Overview</h2>
        <SummaryCards transactions={transactions} />
      </div>

      {/* Charts Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300 tracking-wide">Analytics</h2>
        <Charts transactions={transactions} />
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300 tracking-wide">Transactions</h2>
        <TransactionsTable 
          transactions={transactions}
          role={role}
          filter={filter}
          setFilter={setFilter}
          setShowModal={setShowModal}
        />
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300 tracking-wide">Insights</h2>
        <Insights transactions={transactions} />
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white text-black p-6 rounded-xl w-80 space-y-4">

      <h2 className="text-lg font-semibold">Add Transaction</h2>

      <input
        type="date"
        className="w-full border p-2"
        id="date"
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2"
        id="amount"
      />

      <input
        type="text"
        placeholder="Category"
        className="w-full border p-2"
        id="category"
      />

      <select id="type" className="w-full border p-2">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <div className="flex justify-between">
        <button 
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button 
          onClick={() => {
            const newTransaction = {
              id: Date.now(),
              date: document.getElementById("date").value,
              amount: Number(document.getElementById("amount").value),
              category: document.getElementById("category").value,
              type: document.getElementById("type").value
            };

            setTransactions(prev => [...prev, newTransaction]);
            setShowModal(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default App;