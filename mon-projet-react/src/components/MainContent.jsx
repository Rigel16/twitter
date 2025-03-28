import React from "react";
import WrittingMsg from './WritingMessage';
import PostCard from './Post';

function Home() {
  return(
    <div className="homeMenu" >
     <div><WrittingMsg /></div>
      <div className=""><PostCard /></div>
    </div>
  
  )
}

export default Home;