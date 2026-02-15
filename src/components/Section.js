export default function Section({
  children,
  className = "",
  background = "white"
}) {
  const bgClasses = {
    white: "bg-white",
    stone: "bg-stone-50",
    blush: "bg-[#FBF6F7]",
    blushSoft:
      "bg-gradient-to-b from-[#FBF6F7] via-[#FCF9FA] to-white",
    dark: "bg-stone-900 text-white"
  };

  return (
    <section
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
