import "./App.css";
import "./normal.css";
import { useState } from "react";
// import ChatMessage from "./message";

function App({ message }) {
  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([
    {
      user: "gpt",
      message: "How can I help you today ?",
    },
    {
      user: "chatgpt",
      message: "I want to use ChatGPT today",
    },
  ]);

  const clearChat = () => {
    setChatlog([]);
  };

  //clear chart

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    let chatLogNew = [...chatlog, { user: "me", message: `${input}` }];
    setInput("");
    setChatlog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("http://localhost:3001/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });
    const data = await response.json();
    setChatlog([...chatLogNew, { user: "me", message: `${data.message}` }]);
    console.log(data.message);
  }

  return (
    <>
      <div className="App">
        <aside className="side-menu">
          <div className="side-menu-button" onClick={clearChat}>
            <span>+</span>
            New chart
          </div>
        </aside>

        <section className="chart-box">
          <div className="chat-log">
            {chatlog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>

          <div className="chart-input-holder" style={{overflowY:"scroll"} }>
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chart-input-textarea"
                placeholder="Type your concent here....."
              ></input>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message chatgpt`}>
      <div className="chat-message">
        <div
          className={`avatar chatgpt ${message.user === "gpt" || "chatgpt"}`}
        >
          {message.user === "gpt" || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={41}
              height={41}
              fill="none"
              strokeWidth={1.5}
              className="h-6 w-6"
            >
              <title>{"ChatGPT"}</title>
              <text x={-9999} y={-9999}>
                {"ChatGPT"}
              </text>
              <path
                fill="currentColor"
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
              />
            </svg>
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;


// import React, { useState, useRef, useEffect } from "react";

// function App({ message }) {
//   const [input, setInput] = useState("");
//   const [chatlog, setChatlog] = useState([
//     {
//       user: "gpt",
//       message: "How can I help you today ?",
//     },
//     {
//       user: "chatgpt",
//       message: "I want to use ChatGPT today",
//     },
//   ]);

//   const chatLogRef = useRef(null);

//   const clearChat = () => {
//     setChatlog([]);
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log("submit");
//     let chatLogNew = [...chatlog, { user: "me", message: `${input}` }];
//     setInput("");
//     setChatlog(chatLogNew);

//     const messages = chatLogNew.map((message) => message.message).join("\n");

//     const response = await fetch("http://localhost:3001/", {
//       method: "post",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         message: messages,
//       }),
//     });
//     const data = await response.json();
//     setChatlog([...chatLogNew, { user: "me", message: `${data.message}` }]);
//     console.log(data.message);

//     scrollToBottom();
//   }

//   function scrollToBottom() {
//     if (chatLogRef.current) {
//       chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
//     }
//   }

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatlog]);

//   return (
//     <>
//       <div className="App">
//         <aside className="side-menu">
//           <div className="side-menu-button" onClick={clearChat}>
//             <span>+</span>
//             New chart
//           </div>
//         </aside>

//         <section className="chart-box">
//           <div className="chat-log" ref={chatLogRef}>
//             {chatlog.map((message, index) => (
//               <ChatMessage key={index} message={message} />
//             ))}
//           </div>

//           <div className="chart-input-holder" style={{ overflowY: "scroll" }}>
//             <form onSubmit={handleSubmit}>
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="chart-input-textarea"
//                 placeholder="Type your content here....."
//               ></input>
//             </form>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// const ChatMessage = ({ message }) => {
//   return (
//     <div className={`chat-message chatgpt`}>
//       <div className="chat-message">
//         <div
//           className={`avatar chatgpt ${message.user === "gpt" || "chatgpt"}`}
//         >
//           {message.user === "gpt" || (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={41}
//               height={41}
//               fill="none"
//               strokeWidth={1.5}
//               className="h-6 w-6"
//             >
//               {/* ... */}
//             </svg>
//           )}
//         </div>
//         <div className="message">{message.message}</div>
//       </div>
//     </div>
//   );
// };

// export default App;

