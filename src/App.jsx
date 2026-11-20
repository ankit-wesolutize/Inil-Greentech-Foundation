import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';

import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import OurApproach from './pages/OurApproach';
import Impact from './pages/Impact';
import Initiatives from './pages/Initiatives';
import Projects from './pages/Projects';
import Stories from './pages/Stories';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GetInvolved from './pages/GetInvolved';
import ProjectDetails from './components/common/ProjectDetails';
import Partner from './pages/Partner';
import StoriesDetails from './components/features/Stories/StoriesDetails';






function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/approach" element={<OurApproach />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/impact" element={<Impact />} />
            
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />

            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:id" element={<StoriesDetails />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/partners" element={<Partner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-involved" element={<GetInvolved />} />
          </Route>

          {/* <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard/>} />
            <Route path="account" element={<Account />} />
            <Route path="account/:id" element={<AccountDetails />} />
          </Route> */}

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}






export default App;
