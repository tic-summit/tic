import { motion } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "./Navbar2";
import AuthButtons from "./AuthButtons";

const MobileMenu = ({ isOpen, onClose, links }) => (
    <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        exit={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut'}}
        className="p-6 w-[300px] fixed left-0 top-[6rem] bg-white z-50 shadow-lg"
    >
        <div className="flex justify-end text-gray-700" onClick={onClose}>
            <X className='h-6 w-6' />
        </div>
        <div className="content flex flex-col justify-between h-full space-y-10">
            <Navbar links={links} onLinkClick={onClose} />
            <AuthButtons />
        </div>
    </motion.div>
)

export default MobileMenu;