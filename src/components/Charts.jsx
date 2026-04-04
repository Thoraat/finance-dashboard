import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

function Charts({ transactions }) {

  // Line data
  const lineData = transactions.map(t => ({
    date: t.date,
    amount: t.amount
  }));

  // Pie data
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

      {/* Line Chart */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h3 className="mb-2">Balance Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#60a5fa" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-900 p-5 rounded-2xl shadow-lg">
        <h3 className="mb-4 text-center text-gray-300 font-medium">Spending Breakdown</h3>
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