export default function Section({
  children,
  className = "",
  background = "white",
  contained = true,
}) {
  const bgClasses = {
    white: "bg-transparent",
    stone: "bg-[#f7f2ef]/90",
    blush: "bg-[#f9f3f0]/90",
    blushSoft: "bg-gradient-to-b from-[#fbf5f2] via-[#f8f1ed] to-transparent",
    dark: "bg-[#181210] text-white",
  };

  return (
    <section
      className={`relative py-20 md:py-28 ${bgClasses[background] ?? bgClasses.white} ${className}`}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
