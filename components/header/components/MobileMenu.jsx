import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "./Navbar2";
import AuthButtons from "./AuthButtons";

const MobileMenu = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6">
                <Navbar 
                  links={links} 
                  onLinkClick={onClose}
                  className="flex flex-col space-y-4"
                />
              </nav>

              {/* Auth Buttons */}
              <div className="p-4 border-t">
                <AuthButtons 
                  className="flex flex-col space-y-3"
                  mobileLayout
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;