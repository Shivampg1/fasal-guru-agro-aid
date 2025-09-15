const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-crop rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">FG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">FasalGuru</h1>
            <p className="text-sm text-muted-foreground">Smart Farming Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
