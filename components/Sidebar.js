import React, { useState, useEffect } from 'react';
import { Home, Box, Mail, FileText, Sun, Moon } from 'lucide-react';
import htm from 'htm';
import Globe from './Globe.js';

const html = htm.bind(React.createElement);

const navItems = [
  { id: 'home', label: 'Home', subLabel: 'About me', icon: html`<${Home} size=${20} />` },
  { id: 'works', label: 'Works', subLabel: 'Recent projects', icon: html`<${Box} size=${20} />` },
  { id: 'contact', label: 'Contact', subLabel: 'Talk to me', icon: html`<${Mail} size=${20} />` },
  { id: 'resume', label: 'Resume', subLabel: 'View my resume', icon: html`<${FileText} size=${20} />` },
];

const Sidebar = ({ isDarkMode, toggleTheme, setView, currentView }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      timeZone: 'America/Chicago',
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const handleNavClick = (e, id) => {
    if (id === 'resume') {
      window.open('https://drive.google.com/file/d/1ZZZUkVRjG8CdWT716jxBzavQGDQUqJJw/view?usp=sharing', '_blank');
      return;
    }

    e.preventDefault();
    if (id === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'works') {
      setView('works');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      setView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return html`
    <aside className="w-full lg:w-96 lg:fixed lg:h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-neutral-800 flex flex-col z-50 transition-colors duration-300">
      <div className="pt-8 px-6 text-center z-10 relative">
        <button 
          onClick=${toggleTheme} 
          className="absolute top-8 right-6 p-2 rounded-full bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
          title="Toggle Theme"
        >
          ${isDarkMode ? html`<${Sun} size=${16} />` : html`<${Moon} size=${16} />`}
        </button>

        <h2 className="text-2xl font-light text-gray-900 dark:text-white tracking-wide">${formatTime(time)}</h2>
        <p className="text-gray-500 dark:text-neutral-500 text-sm mt-1">Dallas, TX</p>
      </div>

      <div className="relative -mt-8 mb-4">
        <${Globe} isDarkMode=${isDarkMode} />
      </div>
      <nav className="flex-1 px-4 pb-8 space-y-2">
        ${navItems.map((item) => html`
          <a
            key=${item.id}
            href=${item.id === 'resume' ? 'https://github.com/jennazch/jenna' : `#${item.id}`}
            target=${item.id === 'resume' ? '_blank' : ''}
            onClick=${(e) => handleNavClick(e, item.id)}
            className=${`group flex items-center gap-4 p-4 rounded-2xl transition-all border ${currentView === item.id || (currentView === 'project' && item.id === 'works') ? 'bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700' : 'bg-gray-50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700'}`}
          >
            <div className="p-3 bg-gray-200 dark:bg-neutral-800 rounded-xl text-gray-900 dark:text-white group-hover:bg-gray-300 dark:group-hover:bg-neutral-700 transition-colors">
              ${item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-medium text-base leading-tight">${item.label}</span>
              <span className="text-gray-500 dark:text-neutral-500 text-xs">${item.subLabel}</span>
            </div>
          </a>
        `)}
      </nav>
    </aside>
  `;
};

export default Sidebar;
