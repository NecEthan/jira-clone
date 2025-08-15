
const NavBar = () => {
  return (
    <header className="h-14 border-b-2 border-b-gray-300 bg-[#F4F5F7] text-white flex items-center justify-between px-6 shadow">
      <div className="flex items-center">
        <span className="text-xl text-black text-15">Jira Software</span>
      </div>
      <div className="flex-1 flex justify-center">
        <input className="w-80 py-2 px-4 rounded bg-[#2c333a] text-white text-base border-none placeholder:text-[#b6c2cf]" type="text" placeholder="Search Jira" />
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-transparent border-none text-[#b6c2cf] text-xl cursor-pointer hover:text-[#36b37e]" title="Notifications">🔔</button>
        <button className="bg-transparent border-none text-[#b6c2cf] text-xl cursor-pointer hover:text-[#36b37e]" title="Help">❓</button>
        <div className="w-8 h-8 bg-[#36b37e] text-white rounded-full flex items-center justify-center font-bold text-base">N</div>
      </div>
    </header>
  );
};

export default NavBar;
