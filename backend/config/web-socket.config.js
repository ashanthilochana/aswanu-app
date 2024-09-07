import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase.config.js";

export default function socketConfig(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    const refer = ref(database, "/");
    onValue(refer, (snapshot) => {
      const data = snapshot.val();
      io.emit("data-refresh", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
