import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Compare from "./pages/Compare";
import Rankings from "./pages/Rankings";
import WeaponDetail from "./pages/WeaponDetail";
import CountryDetail from "./pages/CountryDetail";
import Countries from "./pages/Countries";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/weapon/:name" element={<WeaponDetail />} />
          <Route path="/country/:name" element={<CountryDetail />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
