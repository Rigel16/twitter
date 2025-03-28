import React from "react";
import { Routes, Route } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import Notification from "./Notification";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile";
import Messages from "./Messages";
import UserProfile from "./UserProfile";
import ChatRoom from "./ChatRoom";
import FollowersPage from "./FollowersPage";
import FollowingPage from "./FollowingPage";
import "../darshboard.css";
import { Search } from "lucide-react";

const MainPage = () => {
  return (
    <div className="app" >
      <div className="container vh-100 d-flex justify-content-center">
        <div className="row w-100">
          {/* Left Sidebar */}
          <div className="col-md-2 col-lg-2 d-md-block border-end border-secondary p-3 app__left">
            <LeftSidebar />
          </div>

          <div className="col-md-10 col-lg-7 p-3 app__center" >
            <div className="content-wrapper" >
              <Routes>
                <Route path="MainContent" element={<MainContent />} />
                <Route path="Notification" element={<Notification />} />
                <Route path="LeftSidebar" element={<LeftSidebar />} />
                <Route path="RightSidebar" element={<RightSidebar />} />
                <Route path="Bookmarks" element={<Bookmarks />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Messages" element={<Messages />} />
                <Route path="/UserProfile/:userId" element={<UserProfile />} />
                <Route path="/chatRoom/:receiverId" element={<ChatRoom />} />
                <Route path="/user/:userId/followers" element={<FollowersPage />} />
                <Route path="/user/:userId/following" element={<FollowingPage />} />
              </Routes>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-3 d-none d-lg-block border-start border-secondary p-3 app__right">
            <div className="right__container" style={{ position: "fixed", height: "100vh" }}>
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;