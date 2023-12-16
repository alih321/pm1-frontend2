import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainView } from "./mainpage/MainView";
import { NavBar } from "./NavBar";
import AptDetailsView from "./apartmentdetails/AptDetailsView";
import TenantDirectoryView from "./directories/TenantDirectoryView"
import UpdateComplexView from "./mainpage/UpdateComplexView";
import UpdateApartmentView from "./mainpage/UpdateApartmentView";
import UpdateTenantView from "./mainpage/UpdateTenantView";
import OwnerDirectoryView from "./directories/OwnerDirectoryView";
import UpdateOwnerView from "./mainpage/UpdateOwnerView";

export const AllRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/apartment/:aptID" element={<AptDetailsView />} />
        <Route path="/tenants" element={<TenantDirectoryView />} />
        <Route path="/complex/update/:complexID" element={<UpdateComplexView />} />
        <Route path="/apartment/update/:apartmentID" element={<UpdateApartmentView />} />
        <Route path="/tenant/update/:tenantID" element={<UpdateTenantView />} />
        <Route path="/owners" element={<OwnerDirectoryView />} />
        <Route path="/owner/update/:ownerID" element={<UpdateOwnerView />} />
      </Routes>
    </Router>
  );
};
