import logoImage from "@/assets/dungeon-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-4xl"
  };

  return (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent animate-glow-pulse">
        <img 
          src={logoImage} 
          alt="Private Dungeon Loot"
          className={`${sizeClasses[size]} object-contain filter brightness-0 invert`}
        />
      </div>
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent`}>
            Private Dungeon Loot
          </h1>
          <p className="text-lg text-secondary font-semibold mt-1 animate-treasure-shimmer bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_100%]">
            Loot Protected Until Victory
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;