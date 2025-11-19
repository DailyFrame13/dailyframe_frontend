import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Center from "./pages/Center.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Center />} />  
      </Route>
    </Routes>
  );
};

export default App;