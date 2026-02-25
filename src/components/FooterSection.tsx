import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto text-center space-y-4">
        <h3 className="text-xl font-bold gradient-text">DesertVision AI</h3>
        <p className="text-sm text-muted-foreground">
          Built for National Level AI Hackathon 2026
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition">
            <Github size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-xs text-muted-foreground/50 font-mono">
          © 2026 DesertVision AI Team. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
