function Navbar({ role, setRole }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold tracking-wide">Finance Dashboard</h1>
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        className="border p-2"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}

export default Navbar;