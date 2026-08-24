import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Route Code-Splitting with React.lazy
const NotFound = lazy(() => import("@/pages/NotFound"));
const PresidentialSuitePage = lazy(() => import("./pages/PresidentialSuitePage"));
const PresidentialSuite2Page = lazy(() => import("./pages/PresidentialSuite2Page"));
const SuiteRoomPage = lazy(() => import("./pages/SuiteRoomPage"));
const LuxuryRoomPage = lazy(() => import("./pages/LuxuryRoomPage"));
const LuxuryRoom2Page = lazy(() => import("./pages/LuxuryRoom2Page"));
const LuxuryRoomShowerGlassPage = lazy(() => import("./pages/LuxuryRoomShowerGlassPage"));
const DeluxeRoomPage = lazy(() => import("./pages/DeluxeRoomPage"));
const ResortRoomsPage = lazy(() => import("./pages/ResortRoomsPage"));
const StayPackagesPage = lazy(() => import("./pages/StayPackagesPage"));
const WaterParkPage = lazy(() => import("./pages/WaterParkPage"));
const AmusementParkPage = lazy(() => import("./pages/AmusementParkPage"));
const AdventureParkPage = lazy(() => import("./pages/AdventureParkPage"));
const WeddingsBanquetsPage = lazy(() => import("./pages/WeddingsBanquetsPage"));
const CorporateEventsPage = lazy(() => import("./pages/CorporateEventsPage"));
const SchoolPicnicGroupPage = lazy(() => import("./pages/SchoolPicnicGroupPage"));
const AbhipritiRestaurantPage = lazy(() => import("./pages/AbhipritiRestaurantPage"));
const PackagesOffersPage = lazy(() => import("./pages/PackagesOffersPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const FaqsPage = lazy(() => import("./pages/FaqsPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const UserAuthPage = lazy(() => import("./pages/UserAuthPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

const PageFallback = () => (
  <div className="min-h-screen bg-[#0A1E29] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-white">
      <div className="w-8 h-8 border-3 border-[#FFA96B] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-slate-300">Loading AapnoGhar...</span>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
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
        <Route path={"/lp/:slug"} component={LandingPage} />
        <Route path={"/independence-day-package"} component={LandingPage} />
        <Route path={"/new-year-package"} component={LandingPage} />
        <Route path={"/water-park-offer"} component={LandingPage} />
        <Route path={"/wedding-offer"} component={LandingPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

import { StickyMobileActionBar } from "@/components/StickyMobileActionBar";
import { AIConciergeWidget } from "@/components/AIConciergeWidget";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <StickyMobileActionBar />
          <AIConciergeWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
