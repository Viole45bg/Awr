"use client";

export default function NavCta() {
  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("awr:open-contact"));
  };

  return (
    <button className="nav-cta" onClick={handleClick}>
      Connect with Us
    </button>
  );
}
