import React from "react";

const LinkButton = ({ text, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button>{text}</button>
    </a>
  );
};

function App() {
  return (
    <>
      <LinkButton text={"Google"} url={"https://google.com"}/>
    </>
  );
}

export default App;