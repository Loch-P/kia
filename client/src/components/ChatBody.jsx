import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";

const ChatBody = ({ chat }) => {
  const aiStyle = "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  const parent = useRef(null);
  const bottomRef = useRef(null);

  // Only for auto animations
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  // For scrolling to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Convert <a> tags to clickable links
  const convertLinksToAnchorTags = (text) => {
    const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;
    return text.replace(regex, '<a href="$2" target="_blank">$3</a>');
  };

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender === "ai" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              <span dangerouslySetInnerHTML={{ __html: convertLinksToAnchorTags(message.message) }} />
            </pre>
          </div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;