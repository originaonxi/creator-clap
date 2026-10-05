import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CreatorDashboard from './pages/creator/CreatorDashboard';
import BookServicePage from './pages/creator/BookServicePage';
import MoodBoardPage from './pages/creator/MoodBoardPage';
import SellEarnPage from './pages/creator/SellEarnPage';
import CreatorClapEditsPage from './pages/creator/CreatorClapEditsPage';
import CampaignsPage from './pages/creator/CampaignsPage';
import EarningsPage from './pages/creator/EarningsPage';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import BrandDashboard from './pages/brand/BrandDashboard';
import CreateCampaignPage from './pages/brand/CreateCampaignPage';
import BeFamousLanding from './pages/BeFamousLanding';
import PitchSubmission from './pages/PitchSubmission';
import CCTVPage from './pages/CCTVPage';
import InfoPage from './pages/InfoPage';
import SectionPage from './pages/SectionPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';

const INFO_PAGES = ['about', 'careers', 'blog', 'press', 'help', 'terms', 'privacy', 'contact', 'forgot-password'];
const SECTION_PAGES = ['/creator/bookings', '/provider/reviews', '/brand/campaigns', '/brand/creators', '/brand/analytics', '/brand/billing'];

// Real sites open each page at the top, not at the previous page's scroll position.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

// Preview mode: any button that has no behaviour yet still responds, so nothing feels dead.
function DemoButtonFeedback() {
  const { addNotification } = useNotifications();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('button');
      if (!btn || btn.disabled || btn.form) return;
      const propsKey = Object.keys(btn).find(k => k.startsWith('__reactProps$'));
      const props = propsKey ? (btn as unknown as Record<string, { onClick?: unknown }>)[propsKey] : undefined;
      if (!props || props.onClick) return;
      addNotification({
        type: 'info',
        title: btn.textContent?.trim() || btn.getAttribute('aria-label') || 'Done',
        message: 'Preview: this action goes fully live once accounts and payments are connected.'
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [addNotification]);
  return null;
}

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.userType) {
      case 'creator': return '/creator/dashboard';
      case 'provider': return '/provider/dashboard';
      case 'brand': return '/brand/dashboard';
      default: return '/';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/:userType" element={<SignupPage />} />
      <Route path="/be-famous" element={<BeFamousLanding />} />
      <Route path="/be-famous/pitch" element={<PitchSubmission />} />
      <Route path="/cc-tv" element={<CCTVPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/creator/dashboard" 
        element={isAuthenticated && user?.userType === 'creator' ? <CreatorDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/creator/book" 
        element={isAuthenticated && user?.userType === 'creator' ? <BookServicePage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/creator/mood-board" 
        element={isAuthenticated && user?.userType === 'creator' ? <MoodBoardPage /> : <Navigate to="/login" />} 
      />
      <Route
        path="/creator/edits"
        element={isAuthenticated && user?.userType === 'creator' ? <CreatorClapEditsPage /> : <Navigate to="/login" />}
      />
      <Route 
        path="/creator/sell" 
        element={isAuthenticated && user?.userType === 'creator' ? <SellEarnPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/creator/campaigns" 
        element={isAuthenticated && user?.userType === 'creator' ? <CampaignsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/creator/earnings" 
        element={isAuthenticated && user?.userType === 'creator' ? <EarningsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/provider/dashboard" 
        element={isAuthenticated && user?.userType === 'provider' ? <ProviderDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/brand/dashboard" 
        element={isAuthenticated && user?.userType === 'brand' ? <BrandDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/brand/campaign/create" 
        element={isAuthenticated && user?.userType === 'brand' ? <CreateCampaignPage /> : <Navigate to="/login" />} 
      />
      
      {/* Dashboard redirect */}
      <Route 
        path="/dashboard" 
        element={<Navigate to={getDashboardRoute()} replace />} 
      />

      {INFO_PAGES.map(slug => <Route key={slug} path={`/${slug}`} element={<InfoPage />} />)}
      <Route path="/cc-tv/schedule" element={<SectionPage />} />
      {SECTION_PAGES.map(path => (
        <Route key={path} path={path} element={isAuthenticated ? <SectionPage /> : <Navigate to="/login" />} />
      ))}
      <Route path="*" element={<SectionPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <DemoButtonFeedback />
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;