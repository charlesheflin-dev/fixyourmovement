import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <p className="text-muted-foreground font-body text-base">
          © {new Date().getFullYear()} The Foot Capacity System by Dr. Jonathan Schutza, PT, DPT. All rights reserved.
        </p>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground/70 max-w-lg mx-auto">
          This program is for educational purposes and is not a substitute for personalized
          medical advice. Consult your healthcare provider before beginning any exercise program.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
