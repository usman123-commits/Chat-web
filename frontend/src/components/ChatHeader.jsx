import { X, Phone } from "lucide-react";
import {useDispatch,useSelector} from "react-redux";
import {setSelectedUser } from "../slices/chat/slice.chatData.js"
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {selectedUser} = useSelector((state)=>state.chat);
     const {onlineUsers} = useSelector((state)=>state.auth);


  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate("/VideoCall")}
            className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white transition-colors"
            title="Start video call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button onClick={() => dispatch(setSelectedUser(null))} className="btn btn-circle btn-sm btn-ghost">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;