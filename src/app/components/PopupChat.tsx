"use client";
import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import AutoSizeTextarea from "./Textarea";

const HUMAN = "HUMAN";
const AI = "AI";

const PopupChat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sendMsg, setSendMsg] = useState<string>("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const send = () => {
    console.log("Human: ", sendMsg);
  };

  const handleSendMsgInput = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      send();
    }
  };

  return (
    <div
      className={`${isOpen ? "cursor-auto" : "cursor-pointer"} flex w-14 h-14 items-center justify-center fixed bottom-10 right-10 translate-x-70px transition-all duration-250 ease-out`}
    >
      {!isOpen && (
        <button
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full shadow-lg"
          onClick={toggleChat}
        >
          <ChatBubbleOvalLeftIcon className="w-7 h-7 text-neutral-200" />
        </button>
      )}
      {isOpen && (
        <div className="flex flex-col absolute right-0 bottom-0 rounded-xl transition-all duration-250 ease-out bg-neutral-800 shadow-lg shadow-neutral-800 border border-stone-700">
          <div className="sm:w-screen lg:w-[500px] lg:h-[750px] max-h-[750px] grow flex flex-col">
            <div className="flex p-[10px] bg-transparent">
              <span className="flex-grow h-full flex-shrink py-0 px-4 font-medium">
                Talk to my Assistant
              </span>
              <button className="flex-shrink-0" onClick={toggleChat}>
                <XMarkIcon className="w-5 h-5 mr-1 text-neutral-50" />
              </button>
            </div>
            <div className="bg-transparent border-t border-neutral-600 w-full"></div>
            <ul className="h-full p-[10px] m-0 list-none overflow-x-hidden overflow-y-scroll x-scrollbar grow rounded bg-transparent">
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
              <li className="relative clear-both inline-block p-3 m-0 mb-4 rounded-lg bg-neutral-600 max-w-[81%] break-words float-right">
                Are we dogs??? 🐶
              </li>
              <li className="relative clear-both inline-block px-3 py-2 m-0 mb-4 rounded-lg bg-zinc-600 max-w-[81%] break-words float-left">
                no... we re human We are fucking human and you are shit, you are
                fucking shit
              </li>
            </ul>
          </div>
          <div className="p-[10px]">
            <div className="relative flex w-full text-neutral-50 min-h-full x-scrollbar bg-zinc-800 focus:ring-0 focus-visible:ring-0">
              <AutoSizeTextarea
                value={sendMsg}
                onChange={(e) => {
                  setSendMsg(e.target.value);
                }}
                className="w-full h-auto py-2 pl-3 pr-10 max-h-40 bg-transparent x-scrollbar rounded-md overflow-y-auto resize-none border border-neutral-700 focus:outline-none focus:border-zinc-500"
                placeholder="Message Jarvis..."
              />
              <button
                id=""
                className="absolute top-0 right-0 w-10 h-full flex justify-center items-end bg-transparent pb-[11px]"
                onClick={send}
              >
                <PaperAirplaneIcon className="w-5 h-5 text-primary-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupChat;
