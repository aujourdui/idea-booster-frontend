import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "./App.css";

const App: FC = () => {
  const [words, setWords] = useState<any>();

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000", {
        headers: {
          "Content-Type": "application/json",
        },
        query: `query{
            words {
              word
              type
            }
          }`,
      });
      const data = await response.data.data.words;
      // console.log(data);
      setWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(words);
  // }, [words]);

  return (
    <div className="app">
      <h1>Randomized words app</h1>
      {words &&
        words.map((word, index) => (
          <div key={index} className="word__container">
            <li className="word__list--first">{word.word}</li>
            <li className="word__list--second">{word.type}</li>
          </div>
        ))}
    </div>
  );
};

export default App;
