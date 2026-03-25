import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="The Foot Capacity System" className="h-8 w-8 md:h-14 md:w-14" />
          <span className="font-display font-semibold text-lg md:text-xl text-primary">
            The Foot Capacity System
          </span>
        </Link>
        <a
          href="https://whop.com/login/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors font-body text-sm md:text-base"
        >
          Patient Portal
        </a>
      </div>
    </header>
  );
};

export default Header;
