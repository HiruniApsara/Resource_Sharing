import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/user/Dashboard';
import MyResourcesPage from './pages/user/MyResourcesPage';
import Saved from './pages/user/Saved';
import Recent from './pages/user/Recent';
import './App.css';
import Settings from './pages/user/Settings';
import Profile from './pages/user/Profile';
import PreviewPage from './components/PreviewPage';
import UploadModal from './components/UploadModal';
import AdminDashboard from './pages/admin/adminDashboard';
import ManageFiles from './pages/admin/ManageFiles';
import ReviewReports from './pages/admin/ReviewReports';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-resources" element={<MyResourcesPage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/settings" element={<Settings />} /> 
        <Route path="/profile" element={<Profile />}/>
        <Route path="/previewpage" element={<PreviewPage/>}/>
        <Route path="/uploadmodal" element={<UploadModal/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-files" element={<ManageFiles />} />
        <Route path="/review-reports" element={<ReviewReports />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/admin-analytics" element={<Analytics />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
