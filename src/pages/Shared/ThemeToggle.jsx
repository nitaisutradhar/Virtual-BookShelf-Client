import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  // localStorage থেকে থিম লোড করা অথবা ডিফল্ট হিসেবে light থিম ('virtualbookshelf') ব্যবহার করা
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'virtualbookshelf'
  );

  // থিম পরিবর্তনের হ্যান্ডলার
  const handleToggle = (e) => {
    const newTheme = e.target.checked ? 'virtualbookshelf_dark' : 'virtualbookshelf';
    setTheme(newTheme);
  };

  // থিম পরিবর্তন হলে localStorage এবং <html> ট্যাগে আপডেট করা
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
    // SweetAlert2 থিমও পরিবর্তন করা
    document.body.dataset.swal2Theme = theme === 'virtualbookshelf_dark' ? 'dark' : 'light';
  }, [theme]);

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === 'virtualbookshelf_dark'}
      />
      <Sun className="swap-off fill-current w-6 h-6 text-yellow-400" />
      <Moon className="swap-on fill-current w-6 h-6" />
    </label>
  );
};

export default ThemeToggle;
