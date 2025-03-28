import React,{useState} from "react";

function Notification() {
    const [selectedTab,setSelectedTab] = useState("all");
    const content = {
        all: (
            <div className="notification__contents__all">
                <h1>Nothing to see here — <br/>yet</h1>
                <p>From likes to reposts and a whole lot more,this is where all the action happens.</p>
            </div>
        ),
        verified:(
            <div className="notification__contents__mention">
            <h1>Nothing to see here — <br/>yet</h1>
            <p>When someone mentions you, you’ll find it here the action happens.</p>
        </div>
        ),
        mention:(
            <div className="notification__contents__mention">
            <h1>Nothing to see here — <br/>yet</h1>
            <p>When someone mentions you, you’ll find it here the action happens.</p>
        </div>
        ),
      };
    return (
        <div class="container text-center notification">
            <p className="notification__header">Notification</p>
        <ul class="row align-items-start notification__menu">
            <div class="col">
                <li onClick={()=>setSelectedTab("all")}>All</li>
            </div>
            <div class="col">
            <li onClick={()=>setSelectedTab("verified")}>Verified</li>
            </div>
            <div class="col">
            <li onClick={()=>setSelectedTab("mention")}>Mention</li>            </div>
        </ul>
        <div className="notification__content text-center">
            <p>{content[selectedTab]}</p>
        </div>
        </div>
        
        );
}
export default Notification;