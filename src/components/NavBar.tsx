import { useState } from "react";
import Modal from "./Modal";
import CreateTicketModal from "./CreateTicketForm";

const NavBar = () => {

    const [showModal, setShowModal] = useState(false);

    function onShowModal() {
        setShowModal(!showModal);
    }

  return (
    <>
      <header className="h-14 border-b-2 border-b-gray-300 bg-[#F4F5F7] text-white flex items-center px-6 shadow">
        <div className="flex items-center justify-start mr-5">
          <span className="text-xl text-black text-15">Jira Software</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => {(onShowModal())}}>Create</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => {(onShowModal())}}>Create</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => {(onShowModal())}}>Create</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => {(onShowModal())}}>Create</button>
          </div>
        </div>

        <div className="flex items-center justify-end ml-5">
          <input className="w-60 py-1 px-4 rounded bg-[white] text-black text-base border-2 border-gray-300 placeholder:text-[#b6c2cf]" type="text" placeholder="Search Jira" />
        </div>
      </header>
      {showModal && (
        <Modal open={showModal} onClose={onShowModal}>
            <CreateTicketModal onClose={onShowModal} />
        </Modal>
      )}
    </>
  );
};

export default NavBar;
