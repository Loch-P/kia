import React, { useState } from "react";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import Popup from "./components/Popup";

function App() {
  const [chat, setChat] = useState([]);
  const [popupUrl, setPopupUrl] = useState(null);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  const openPopup = (url) => {
    setPopupUrl(url);
  };

  const closePopup = () => {
    setPopupUrl(null);
  };

  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      {/* gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* header */}
      <div>
        <img className="h-auto max-w-xs mx-auto" src="src/assets/2.gif" alt="image description" />
      </div>

      {/* body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md">
        <ChatBody chat={chat} openPopup={openPopup} />
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>

      {/* footer */}
      <footer className="text-center text-gray-400 text-sm mt-4">
        &copy; All rights reserved. Made with{" "}
        <a href="#" className="text-white mx-1 text-l" onClick={() => openPopup("#")}>
          {String.fromCharCode(9829)}
        </a>{" "}
        by{" "}
        <a href="#" className="text-white underline" onClick={() => openPopup("#")}>
          Team XVIII
        </a>
      </footer>

      {/* popup */}
      {popupUrl && (
        <Popup url={popupUrl} onClose={closePopup} />
      )}
    </div>
  );
}

export default App;
