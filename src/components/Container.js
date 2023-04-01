import { useState, useEffect } from "react";

const Container = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState("");

  const getResponse = async (event) => {
    if (event.key === "Enter") {
      try {
        const request = await fetch(
          `https://kbbi-api-amm.herokuapp.com/search?q=${input}`
        );
        const response = await request.json();

        setAnswer(response.data.resultLists);
      } catch (error) {
        setMessage("maaf, terjadi kesalahan...");
      }
    }
  };

  return (
    <div className="container">
      <header>KBBI</header>
      <div className="input-field">
        <input
          required
          type="text"
          className="keyword"
          placeholder="ketikan sebuah kata..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={getResponse}
        />
        <span className="fas fa-times" onClick={() => setInput("")}></span>
        <span className="fas fa-search"></span>
      </div>
      <ul className={answer && "active"}>
        {message ||
          answer.map((data, index) => {
            return (
              <li key={index}>
                <h1 className="text">{data.kata}</h1>
                <p className="meaning">{data.arti[0]}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Container;
