import { motion } from "motion/react";
import { Controls } from "./Controls";
import { AlertMessage } from "../Alert";
import { Profile } from "../Profile";

interface HeaderProps {
  hidden: boolean;
}

export function Header({ hidden }: HeaderProps) {
  return (
    <motion.header
      className="header"
      animate={{
        y: hidden ? -240 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onWheel={(event) => {
        event.stopPropagation();
        event.currentTarget.closest("#example")?.scrollBy({
          top: event.deltaY,
          behavior: "auto",
        });
      }}
    >
      <div
        className="header-content"
        style={{
          gap: "12px",
          width: "100%",
          display: "flex",
          position: "relative",
          marginTop: "12px",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Controls />
        <AlertMessage />
        <Profile />
      </div>
    </motion.header>
  );
}
