import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <Header 
      title={
        <p>
            Taste the World with 
            <br /> FlavorVerse!
        </p>
      }
      type="home"
      />
    </div>
  );
};

export default Home;
