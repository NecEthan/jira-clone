import { useState } from "react";




const SideNav = () => {
    const [collapsed, setCollapsed] = useState(false);

    const buttonClass = [
        "absolute z-50 bg-white text-gray-800 px-2 py-1 rounded-full shadow hover:bg-[#439aff] transition-all duration-300",
        collapsed ? "top-[20px] left-[48px]" : "top-[20px] left-[205px]"
    ].join(" ");

    return (
        <nav className={`bg-[#F4F5F7] text-white h-screen fixed flex flex-col shadow-md transition-all duration-300 border-r-2 border-r-gray-300 ${collapsed ? 'w-16' : 'w-[220px]'}`}>
            <div className={`font-bold pt-6 pb-4 pl-8 tracking-widest text-[black] ${collapsed ? 'text-xs pl-2' : 'text-s pl-8'}`}>{!collapsed && 'PLANNING'}</div>
            <button
                className={buttonClass}
                onClick={() => setCollapsed((c) => !c)}
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <ul className="list-none p-0 m-0 flex-1">
                <li className={`flex items-center py-3 ${collapsed ? 'px-2 justify-center' : 'px-8'} cursor-pointer transition bg-[#EBECF0] text-white`}>
                    <span className="mr-4 text-lg"><i className="fa-solid fa-bars-staggered"></i></span>
                    {!collapsed && <span className="text-black">Dashboards</span>}
                </li>
                <li className={`flex items-center py-3 ${collapsed ? 'px-2 justify-center' : 'px-8'} cursor-pointer transition text-[#0052CC] hover:bg-[#EBECF0] hover:text-white`}>
                    <span className="mr-4 text-lg"><i className="fa-solid fa-bars-staggered"></i></span>
                    {!collapsed && <span className="text-black">Projects</span>}
                </li>
                <li className={`flex items-center py-3 ${collapsed ? 'px-2 justify-center' : 'px-8'} cursor-pointer transition text-[#b6c2cf] hover:bg-[#EBECF0] hover:text-white`}>
                    <span className="mr-4 text-lg"><i className="fa-solid fa-bars-staggered"></i></span>
                    {!collapsed && <span className="text-black">Teams</span>}
                </li>
                <li className={`flex items-center py-3 ${collapsed ? 'px-2 justify-center' : 'px-8'} cursor-pointer transition text-[#b6c2cf] hover:bg-[#EBECF0] hover:text-white`}>
                    <span className="mr-4 text-lg"><i className="fa-solid fa-gear"></i></span>
                    {!collapsed && <span className="text-black">Settings</span>}
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;
