import { Search, User, X } from "lucide-react";
import { Link } from "react-router";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../hooks/useUserStore";
import { Button } from "./ui/button";

export default function Navbar({ plain = false }: { plain: boolean }) {
  const user = useUserStore((state) => state.user);

  return (
    <div className="relative w-full flex items-center justify-between border-b border-b-zinc-100 dark:border-b-zinc-700 shadow">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3 m-0 sticky top-0 min-h-16 h-16">
        <Link to="/" className="flex items-center space-x-8">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/synergy-logo.png" alt="" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-2xl font-medium dark:text-white">Synergy</h1>
        </Link>

        {
          //  =====================  Search Bar  =====================
        }
        {!plain && (
          <>
            <div className="px-2 h-full w-fit lg:min-w-lg flex items-center border border-zinc-300 dark:border-zinc-700 shadow-sm rounded-full overflow-hidden">
              <Search className="hover-darken dark:text-white cursor-pointer p-1" size={32} />
              <input type="text" className="w-full h-full flex items-center outline-none px-3 dark:text-white dark:border-zinc-700 py-3 justify-center rounded-full" />
              <X size={32} className="dark:text-white hover-darken cursor-pointer p-1" />
            </div>

            <div className="flex space-x-8 items-center justify-center">
              <ThemeSwitch />
              {user ? (
                <Profile />
              ) : (
                <div className="flex flex-center space-x-4 dark:text-white">
                  <Button asChild className="cursor-pointer" variant="outline">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button className="cursor-pointer">
                    <Link to="/login">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Profile() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const userPopupRef = useRef<HTMLDivElement>(null);

  const handleOnUserClick = () => {
    setIsUserPopupOpen(true);
  };

  const hanldeClickOutside = (event: MouseEvent) => {
    if (userPopupRef.current && (event.target as HTMLDivElement)?.id !== "user-profile-icon") setIsUserPopupOpen(userPopupRef.current.contains(event.target as HTMLDivElement));
  };

  useEffect(() => {
    document.addEventListener("click", hanldeClickOutside);
    return () => document.removeEventListener("click", hanldeClickOutside);
  }, []);

  return (
    <div ref={userPopupRef}>
      <div
        id="user-profile-icon"
        className="relative dark:text-white dark:border-white cursor-pointer flex justify-center items-center p-2 min-w-10 min-h-10 overflow-hidden w-10 h-10 rounded-full border-2 border-gray-800"
      >
        <User onClick={handleOnUserClick} className="dark:text-white" />
      </div>
      {isUserPopupOpen && (
        <div className="absolute z-30 top-14 right-16 min-h-20 min-w-20 flex flex-col rounded-xl overflow-hidden dark:bg-zinc-700">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="min-h-10 min-w-32 dark:text-white hover:bg-zinc-800 px-4 cursor-pointer py-2">
              Text
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
