import { useTheme } from "@/context/ThemeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode} className="btn btn-light rounded-circle" aria-label="Toggle Dark Mode">
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
