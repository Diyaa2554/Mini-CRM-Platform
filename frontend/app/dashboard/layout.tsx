"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";

import {

  FiBox,
  FiChevronsRight,
  FiHome,

  FiLogOut,

  FiUser,

} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useIsMobile from "../hooks/useMobile";
import useAuthStore from "../store/useAuthStore";
import { log } from "console";
import { FaLessThan } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";

export default function Example({children } : {children: React.ReactNode}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return(<>
    {children}
    </>)
  }
  return (

    <div className="flex">
              <Sidebar />
              <div className="flex-1">{
                children
              }</div>
    </div>

 
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const {logout} = useAuthStore();
  const router = useRouter();
  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "15%" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard"
        />
        <Option
          Icon={FiUser}
          title="Customers"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/customers"
   
        />
        <Option
        Icon = {FiBox}
        title="Orders"
        selected={selected}
        setSelected={setSelected}
        open={open}
        href="/dashboard/orders"
        />
        <Option
        Icon = {FaLessThan}
        title="Segment Rules"
        selected={selected}
        setSelected={setSelected}
        open={open}
        href="/dashboard/segment-rules"
        />
        <Option
        Icon = {HiSpeakerphone}
        title="Campaign"
        selected={selected}
        setSelected={setSelected}
        open={open}
        href="/dashboard/campaign"
        />
        <Option
        Icon = {HiSpeakerphone}
        title="Campaign History"
        selected={selected}
        setSelected={setSelected}
        open={open}
        href="/dashboard/campaigns"
        />

       
                <Option
          Icon={FiLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
          onClick = {()=>{
            logout();
            router.push("/");
          }}
      
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  href, 
  onClick

 
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  href?: string;
  onClick?: () => void;

}) => {


  return (
    
    <>
    {
        title === "Logout" ?

        <motion.button
      layout
      onClick = {()=>{}}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className={`grid  h-full w-10 place-content-center text-lg ${title==="Logout" ? "text-red-500" : ""}`}
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className={`text-xs font-medium ${title==="Logout" ? "text-red-500" : ""}`}
          onClick={onClick}
        >
          {title}
        </motion.span>
      )}

      
    </motion.button> : 
    <Link href={href as string} >
        <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md cursor-pointer transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className={`grid h-full w-10 place-content-center text-lg ${title==="Logout" ? "text-red-500 " : ""}`}
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className={`text-xs font-medium ${title==="Logout" ? "text-red-500" : ""}`}
          onClick={onClick}
        >
          {title}
        </motion.span>
      )}

      
    </motion.button>
    </Link>
    }
    </>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center justify-center gap-2">
            <p>CRM</p>
        </div>
   
      </div>
    </div>
  );
};



const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

