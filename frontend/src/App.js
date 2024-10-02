import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";

// Import Admin Components
import AdminDashboard from "./scenes/admin/dashboard";
import SensorDashboard from "./scenes/admin/sensors-data";
import SensorForm from "./scenes/admin/add-sensor";
import SensorLog from "./scenes/admin/sensor-log";
import AddSolutions from "./scenes/admin/add-solutions";
import ViewSolutions from "./scenes/admin/view-solutions";
import AddTanks from "./scenes/admin/add-tanks";
import ViewTanks from "./scenes/admin/view-tanks";
import AddRiceVariations from "./scenes/admin/add-rice-variations";
import ViewRiceVariations from "./scenes/admin/view-rice-variations";
import AddUsers from "./scenes/admin/add-users";
import ViewUsers from "./scenes/admin/view-users";
import Reccommendation from "./scenes/admin/recomendation";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/sensors-data" element={<SensorDashboard />} />
              <Route path="/admin/add-sensor" element={<SensorForm />} />
              <Route path="/admin/sensor-log" element={<SensorLog />} />
              <Route path="/admin/add-solutions" element={<AddSolutions />} />
              <Route path="/admin/view-solutions" element={<ViewSolutions />} />
              <Route path="/admin/add-tanks" element={<AddTanks />} />
              <Route path="/admin/view-tanks" element={<ViewTanks />} />
              <Route path="/admin/add-rice-variations" element={<AddRiceVariations />} />
              <Route path="/admin/view-rice-variations" element={<ViewRiceVariations />} />
              <Route path="/admin/reccommendation" element={<Reccommendation />} />
              <Route path="/admin/add-users" element={<AddUsers />} />
              <Route path="/admin/view-users" element={<ViewUsers />} />
              <Route path="/admin/add-rice-disease-catagory" element={<AddRiceDiseaseCategory />} />
              <Route path="/admin/add-rice-disease-details" element={<AddRiceDiseaseDetails />} />
              

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
