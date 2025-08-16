import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children?: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className="p-0 bg-transparent border-none"
      style={{ padding: 0 }}
    >
      <div
        className="fixed overlay inset-0 z-50 flex items-center justify-center"
      >
  <div className="bg-white p-4 shadow-lg w-full max-w-xl min-w-xl md:min-w-xl mx-auto">
              {children}
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal')!
  );
}