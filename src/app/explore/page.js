"use client";
import { getAll } from "@/services/chatbot";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchAllChatbots() {
      let response = await getAll();
      const data = await response.json();
      setData(data)
    }
    fetchAllChatbots();
  }, []);
  return (

  <div>
    {
      data.map((ele,indx)=>(
        <h2 key={indx}>{ele.name}</h2>
      ))
    }
  </div>
  )
};

export default Explore;
