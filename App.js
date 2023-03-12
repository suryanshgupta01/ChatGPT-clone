import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {

  useEffect(() => {
    getEngines();
  }, []);

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can i help you today?"
  },
  {
    user: "me",
    message: "I wanted to use ChatGPT today"
  }
  ]);

  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
      .then(res => res.json())
      .then(data => {
        // console.log(431);
        // console.log(data.models[0].id);
        {
          models.map((model, index) => {
            console.log(model.id);
          })
        };
        setModels(data.models);
      })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, {
      user: "me", message:
        `${input}`
    }]
    setInput("");
    setChatLog(chatLogNew);
    const msg = chatLogNew.map((message) => message.message)
      .join("\n")
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: msg, currentModel,
      })
    });

    const data = await response.json();
    setChatLog([...chatLogNew, {
      user: "gpt", message:
        `${data.message}`
    }])
    console.log(data.message);
  }

  const random = ["asf", "gdsag", "gdsa"]
  return (
    <>
      <div className="App">
        <aside className='sidemenu'>
          <div className='side-button' onClick={clearChat}>+
            New Chat</div>
          <div className='models'>
            <select onChange={(e) => setCurrentModel(e.target.value)}>
              {models.map((model, index) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))}
            </select>

            {/* <option>sgsaga</option>
              <option>gbdf</option>
              <option>gsdfg</option>
              <option>ewf</option>
            </select> */}
          </div>
        </aside>

        <section className='chatbox'>
          <div className='chat-log'>
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

          </div>

          <div className='chat-holder'>
            <form onSubmit={handleSubmit}>
              <input value={input}
                rows="1"
                onChange={(e) => setInput(e.target.value)}
                className='chat-textarea'
                placeholder='enter response here'
                name="response">
              </input></form>
          </div>
        </section>
      </div>
    </>
  );
}

const ChatMessage = ({ message }) => {

  return (
    <>
      <div className={`chat-message ${message.user === "gpt"
        && "chatgpt"}`}>
        <div className='chat-message-center'>
          <div className={`avatar ${message.user === "gpt"
            && "chatgpt"}`}>

          </div>
          <div className='message'>
            {message.message}
          </div>
        </div>
      </div>
    </>
  )
};
export default App;
