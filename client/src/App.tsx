import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PresidentialSuitePage from "./pages/PresidentialSuitePage";
import PresidentialSuite2Page from "./pages/PresidentialSuite2Page";
import SuiteRoomPage from "./pages/SuiteRoomPage";
import LuxuryRoomPage from "./pages/LuxuryRoomPage";
import LuxuryRoom2Page from "./pages/LuxuryRoom2Page";
import LuxuryRoomShowerGlassPage from "./pages/LuxuryRoomShowerGlassPage";
import DeluxeRoomPage from "./pages/DeluxeRoomPage";
import ResortRoomsPage from "./pages/ResortRoomsPage";
import StayPackagesPage from "./pages/StayPackagesPage";
import WaterParkPage from "./pages/WaterParkPage";
import AmusementParkPage from "./pages/AmusementParkPage";
import AdventureParkPage from "./pages/AdventureParkPage";
import WeddingsBanquetsPage from "./pages/WeddingsBanquetsPage";
import CorporateEventsPage from "./pages/CorporateEventsPage";
import SchoolPicnicGroupPage from "./pages/SchoolPicnicGroupPage";
import AbhipritiRestaurantPage from "./pages/AbhipritiRestaurantPage";
import PackagesOffersPage from "./pages/PackagesOffersPage";
import GalleryPage from "./pages/GalleryPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import BlogPage from "./pages/BlogPage";
import FaqsPage from "./pages/FaqsPage";
import CareersPage from "./pages/CareersPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import UserAuthPage from "./pages/UserAuthPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={AdminPage} />
      <Route path={"/admin/login"} component={AdminPage} />
      <Route path={"/cms"} component={AdminPage} />
      <Route path={"/login"} component={UserAuthPage} />
      <Route path={"/signup"} component={UserAuthPage} />
      <Route path={"/booking"} component={BookingPage} />
      <Route path={"/book-now"} component={BookingPage} />
      <Route path={"/rooms"} component={ResortRoomsPage} />
      <Route path={"/stay"} component={ResortRoomsPage} />
      <Route path={"/stay-packages"} component={StayPackagesPage} />
      <Route path={"/water-park"} component={WaterParkPage} />
      <Route path={"/amusement-park"} component={AmusementParkPage} />
      <Route path={"/adventure-park"} component={AdventureParkPage} />
      <Route path={"/activity-park"} component={AdventureParkPage} />
      <Route path={"/weddings-banquets"} component={WeddingsBanquetsPage} />
      <Route path={"/weddings-banquet"} component={WeddingsBanquetsPage} />
      <Route path={"/corporate-events"} component={CorporateEventsPage} />
      <Route path={"/school-picnic-group-packages"} component={SchoolPicnicGroupPage} />
      <Route path={"/abhipriti-restaurant"} component={AbhipritiRestaurantPage} />
      <Route path={"/packages-offers"} component={PackagesOffersPage} />
      <Route path={"/gallery"} component={GalleryPage} />
      <Route path={"/about-us"} component={AboutUsPage} />
      <Route path={"/contact-us"} component={ContactUsPage} />
      <Route path={"/blog"} component={BlogPage} />
      <Route path={"/faqs"} component={FaqsPage} />
      <Route path={"/careers"} component={CareersPage} />
      <Route path={"/presidential-suite-room-1"} component={PresidentialSuitePage} />
      <Route path={"/presidential-suite-room-2"} component={PresidentialSuite2Page} />
      <Route path={"/suite-room"} component={SuiteRoomPage} />
      <Route path={"/luxury-room"} component={LuxuryRoomPage} />
      <Route path={"/luxury-room-2"} component={LuxuryRoom2Page} />
      <Route path={"/Luxury-Room-with-Shower-Glass-Partition"} component={LuxuryRoomShowerGlassPage} />
      <Route path={"/deluxe-room"} component={DeluxeRoomPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
