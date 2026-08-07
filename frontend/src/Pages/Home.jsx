function Home() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-72 bg-white border-r flex flex-col">

        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold">Connected Users</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              M
            </div>
            <span>Muni</span>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              R
            </div>
            <span>Rahul</span>
          </div>

          <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
              A
            </div>
            <span>Aman</span>
          </div>

        </div>

        <div className="p-4 border-t">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
            Leave Room
          </button>
        </div>

      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="border-b bg-white p-4 flex justify-between items-center">

          <div>
            <h2 className="font-bold text-xl">Collaborative Room</h2>
            <p className="text-sm text-gray-500">
              Room ID: <span className="font-semibold">ABCD1234</span>
            </p>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Copy Room ID
          </button>

        </div>

        {/* Code Editor */}
        <div className="flex-1 p-4 bg-[#1e1e1e]">

          <textarea
            className="w-full h-full bg-[#1e1e1e] text-white outline-none resize-none font-mono text-sm"
            placeholder="// Start coding..."
          />

        </div>

      </div>

    </div>
  );
}

export default Home;