import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <img src={logo} alt="The Foot Capacity System" className="h-10 w-10" />
          <span className="font-display font-semibold text-lg text-primary">
            The Foot Capacity System
          </span>
        </div>
        <a
          href="#"
          className="text-muted-foreground hover:text-primary transition-colors font-body text-base"
        >
          Member Login
        </a>
      </div>
    </header>
  );
};

export default Header;
