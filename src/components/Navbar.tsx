import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Cpu } from "lucide-react";
import { UserType } from "../types";
import Logo from "./Logo";

interface NavbarProps {
  activeTab: UserType;
  setActiveTab: (tab: UserType) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, selectTab?: UserType) => {
    setMobileMenuOpen(false);
    if (selectTab) {
      setActiveTab(selectTab);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { name: "الرئيسية", onClick: () => scrollToSection("hero") },
    { name: "حلول الأفراد", onClick: () => scrollToSection("services", "individuals") },
    { name: "حلول الشركات", onClick: () => scrollToSection("services", "companies") },
    { name: "فيديوهاتنا", onClick: () => scrollToSection("videos") },
    { name: "الأسئلة الشائعة", onClick: () => scrollToSection("faqs") },
    { name: "تواصل معنا", onClick: () => scrollToSection("contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-purple-900/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
              <Logo className="w-12 h-12 text-[#7C5CFF]" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="font-sans text-sm font-medium text-[#AEB7CC] hover:text-white transition-colors duration-300 relative group py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-[#5B5CFF] to-[#7C5CFF] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="relative group px-6 py-2.5 rounded-xl font-sans text-sm font-medium text-white overflow-hidden transition-all duration-300"
              >
                {/* Button gradient border background */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#5B5CFF] via-[#7C5CFF] to-[#3B82F6] rounded-xl"></span>
                <span className="absolute inset-[1px] bg-[#050816] rounded-[11px] transition-all duration-300 group-hover:bg-[#050816]/70"></span>
                
                <span className="relative flex items-center gap-2">
                  ابدأ الآن
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#AEB7CC] hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#050816] z-[100] flex flex-col animate-fade-in">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
              <Logo className="w-10 h-10 text-[#7C5CFF]" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#AEB7CC] hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-8 flex flex-col gap-5 text-right overflow-y-auto max-h-[calc(100vh-80px)]">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="font-sans text-lg font-medium text-[#AEB7CC] hover:text-white transition-colors border-b border-white/5 pb-3.5 text-right w-full"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B5CFF] to-[#7C5CFF] text-white font-sans font-medium text-center shadow-[0_0_20px_rgba(124,92,255,0.3)] hover:opacity-90 transition-opacity"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
