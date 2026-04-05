function Insights({ transactions }) {
  const categoryTotals = {};

  let totalIncome = 0;
  let totalExpense = 0;

  // Calculate totals
  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
      totalExpense += t.amount;
    } else {
      totalIncome += t.amount;
    }
  });

  // Find highest spending category
  const highest = Object.keys(categoryTotals).length
    ? Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
      )
    : "N/A";

  const savings = totalIncome - totalExpense;

  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow space-y-2">

      {/* Insight 1 */}
      <p className="text-gray-300">
        💡 You are spending most on{" "}
        <span className="text-yellow-400 font-semibold">
          {highest}
        </span>.
      </p>

      {/* Insight 2 */}
      <p className="text-gray-300">
        💰 Your total savings this month:{" "}
        <span className="font-semibold text-green-400">
          ₹{savings}
        </span>
      </p>

      {/* Insight 3 (dynamic message) */}
      {savings < 0 ? (
        <p className="text-red-400">
          ⚠️ You are spending more than your income. Try reducing expenses.
        </p>
      ) : (
        <p className="text-green-400">
          ✅ Good job! You are saving money this month.
        </p>
      )}

    </div>
  );
}

export default Insights;