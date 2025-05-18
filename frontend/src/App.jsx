import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingpage';
import Auth from './pages/loginOrsignup/auth';
import AboutUs from './pages/landingPage/aboutUs';
import FeedbacksPage from './pages/landingPage/feedbackPage';
import ContactPage from './pages/landingPage/contactPage';
import Home from './pages/home/home';
import Homelayout from './components/homecoms/homelayout';
import Inbox from './pages/inbox/inbox';
import Notification from './pages/notification/notification';
import Profile from './pages/profile/profile';
import RunnerHome from './runnermode/runnerHome';
import Runnerlayout from './components/runnercoms/runnerlayout';
import RunnerInbox from './runnermode/runnerInbox';
import RunnerNotification from './runnermode/runnerNotification';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/feedbacks" element={<FeedbacksPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route element={<Homelayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/runner"element={<Runnerlayout />}>
        <Route path="/runner" element={<RunnerHome />} />
        <Route path="/runner/notification" element={<RunnerNotification />} />
        <Route path="/runner/inbox" element={<RunnerInbox />} />
      </Route>
    </Routes>
  );
}

export default App;