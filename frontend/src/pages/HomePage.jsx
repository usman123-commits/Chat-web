import {  useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";


import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  // useSelector gives you access to state
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  //useDispatch() this fun returns function where you can dispatch the action(what you want to do)
 return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
