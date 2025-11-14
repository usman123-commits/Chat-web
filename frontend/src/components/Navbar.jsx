import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../slices/auth/slice.auth.thunk.js";
import { LogOut, MessageSquare, Settings, User, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {location.pathname === "/VideoCall" ? (
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-content transition-colors">
                  <ArrowLeft className="w-5 h-5 text-primary hover:text-primary-content" />
                </div>
                <h1 className="text-lg font-bold hidden sm:inline">Back to Chat</h1>
              </Link>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Chatty</h1>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/SettingPage"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/ProfilePage"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={() => {
                    dispatch(logOut());
                  }}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default navbar;
