import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdvancedModeProvider } from "@/contexts/AdvancedMode";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Compare from "./pages/Compare";
import Rankings from "./pages/Rankings";
import WeaponDetail from "./pages/WeaponDetail";
import CountryDetail from "./pages/CountryDetail";
import Countries from "./pages/Countries";
import WarDomains from "./pages/WarDomains";
import Simulator from "./pages/Simulator";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdvancedModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/weapon/:name" element={<WeaponDetail />} />
            <Route path="/country/:name" element={<CountryDetail />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/war-domains" element={<WarDomains />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdvancedModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
