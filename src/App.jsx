import { Route, Routes } from "react-router-dom";
import FileSend from "./pages/FileSend";
import Home from "./pages/Home";
import ReciedFiles from "./pages/ReciedFiles";
import DownloadFile from "./pages/DownloadFile";
import ConnectApp from "./pages/ConnectApp";
import GoToStore from "./pages/GoToStore";
import About from "./pages/About";

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<FileSend />} />
        <Route path="/recived-file" element={<ReciedFiles />} />
        <Route path="/downlaod-file" element={<DownloadFile />} />
        <Route path="/connect" element={<ConnectApp />} />
        <Route path="/GoToStore" element={<GoToStore />} />
      </Routes> */}
      <About />
    </div>
  );
}

export default App;
