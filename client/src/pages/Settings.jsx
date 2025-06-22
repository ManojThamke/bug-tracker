import { useState } from "react";

function Settings() {
  const [name, setName] = useState("Manoj Thamke");
  const [email, setEmail] = useState("manojthamke28@gmail.com");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`✅ Settings Updated:\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Account Settings</h2>

      <form onSubmit={handleUpdate} className="bg-white p-4 rounded-xl shadow space-y-4 text-purple-900 max-w-xl">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded hover:from-pink-500 hover:to-purple-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;
