import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

function Charts({ transactions }) {

  // ✅ Correct Balance Trend (running balance)
  let balance = 0;

  const lineData = transactions.map(t => {
    if (t.type === "income") {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }

    return {
      date: t.date,
      balance: balance
    };
  });

  // ✅ Pie data (expense breakdown)
  const categoryMap = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15"];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 📈 Line Chart */}
      <div className="bg-gray-900 p-5 rounded-2xl shadow-lg">
        <h3 className="mb-4 text-center text-gray-300 font-medium">
          Balance Trend
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="balance"   // ✅ FIXED
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-gray-900 p-5 rounded-2xl shadow-lg">
        <h3 className="mb-4 text-center text-gray-300 font-medium">
          Spending Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={80}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;