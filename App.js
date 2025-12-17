import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Linkedin, FileText, ExternalLink } from 'lucide-react';
import htm from 'htm';
import Sidebar from './components/Sidebar.js';
import Card from './components/Card.js';
import TechStack from './components/TechStack.js';
import Experience from './components/Experience.js';
import Contact from './components/Contact.js';
import Works from './components/Works.js';
import ProjectDetail from './components/ProjectDetail.js';

const html = htm.bind(React.createElement);

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    subtitle: 'Open Source Portfolio Template',
    category: 'Web App',
    status: 'Completed',
    image: 'https://picsum.photos/1200/800?random=1', 
    tags: ['HTML | CSS | JS', 'GitHub Pages'],
    description: 'A simple, static portfolio website to showcase personal info and projects. Open for anyone to clone, personalize, and host for free on GitHub Pages.'
    ,
    features: [
      'Responsive, mobile-friendly design',
      'Open-source & easy to clone and customize',
      'Dark/light mode toggle',
      'Easy and free to host and maintain'
    ],
    highlights: [
      'Built a responsive, device-agnostic static website to ensure a seamless user experience across desktop, tablet, and mobile screen sizes',
      'Leveraged AI-assisted pair programming to speed up development, iterate quickly, and explore creative solutions efficiently',
      'Designed modular and customizable components to make the site easy to clone, personalize, and maintain',
    ],
    liveLink: 'https://github.com/jennazch/jenna',
  },
  {
    id: 2,
    title: 'Euchre',
    subtitle: 'Lightweight Terminal Game',
    category: 'Command Line',
    status: 'Completed',
    image: 'https://picsum.photos/1200/800?random=2',
    tags: ['C++', 'Command Line', 'Scripting'],
    description: 'A lightweight and fun Euchre simulator of the popular Midwest card game that I love. Comes with the option to play with 1-3 other players and/or robots.',
    features: [
      'Option to play with AI robot players when there are not enough people',
      'Fast and lightweight compared to other games that take up GBs of storage',
      'Accurate rules engine for Euchre, supporting bidding, trump selection, trick-taking, scoring, and win conditions',
    ],
    highlights: [
      'Modeled complex game logic and state transitions using clean abstractions and modular design',
      'Developed AI decision-making logic to simulate realistic opponent behavior and strategic play',
      'Created a user-friendly command-line interface with clear prompts, input validation, and error handling'
    ],
    liveLink: 'https://github.com/jennazch/Euchre/tree/master#',
  },
  {
    id: 3,
    title: 'Fishbowl',
    subtitle: 'Bluetooth Dating App',
    category: 'iOS App',
    status: 'Completed',
    image: 'https://picsum.photos/1200/800?random=3',
    tags: ['Swift', 'Postgres DB', 'AWS', 'Core Bluetooth SDK'],
    description: 'A Bluetooth-based dating app that connects you with people nearby in real time.',
    features: [
      'Real-time discovery of nearby profiles using Bluetooth proximity',
      'Built-in safety controls, including user blocking and the ability to disable profile visibility',
      'Personalized accounts with customizable preferences and likes',
    ],
    highlights: [
      'Built client–server workflows for key social interactions (blocking, liking, and matching) by implementing API-driven functions that updated real-time user visibility and relationship states across devices.',
      'Designed a match-generation flow using Postgres Users and Likes tables, enabling efficient detection of mutual interest and seamless UI updates through optimized /getmatches fetch cycles.',
      'Integrated Google OAuth sign-in and orchestrated backend user provisioning, creating unique user identifiers and structured profile records that power the app’s proximity-based discovery and matching logic.'
    ],
    liveLink: 'https://github.com/aelhamah/fishbowl',
  },
  {
    id: 4,
    title: 'Roomie',
    subtitle: 'Mobile App for Finding Roommates',
    category: 'Mobile App',
    status: 'Work In Progress',
    image: 'https://picsum.photos/1200/800?random=4',
    tags: ['TBD'],
    description: 'Finding a compatible roommate, whether you\'re a property owner with available space or an individual seeking a new place to live, is often a stressful, time-consuming, and inefficient process. Existing methods, such as social media groups or word-of-mouth, lack the necessary tools for effective filtering, verification, and compatibility matching.',
    features: [
      'TBD. Reach out for more details.'
    ],
    highlights: [
      'TBD. Reach out for more details.'
    ],
    liveLink: '#',
  }
];

const drawings = [
  'https://lh3.googleusercontent.com/d/1Pl4gLG-1fiXLMBDBrH0RtLH0PHF-z5rf',
  'https://lh3.googleusercontent.com/d/1YphSFI7VKWNzidLSvr-jWCI31HnubOkT',
  'https://lh3.googleusercontent.com/d/1uD1hWYVb5wWjm67OqOV4R94mzYeb_Wg_',
  'https://lh3.googleusercontent.com/d/1b1hz-RCYO1v3qu0FcrTIrl2nOoC0VIjj',
  'https://lh3.googleusercontent.com/d/1fi4uE7A_LkMDt56stp5rayGykcIf0vPx',
  'https://lh3.googleusercontent.com/d/1o4vbJNuIhE8GrGnbHLbIJYmy0izbtYLO',
  'https://lh3.googleusercontent.com/d/1yoZa4ehqznWWwA0lc4KkGwd8iKDxfQ53',
  'https://lh3.googleusercontent.com/d/14HQTJ4Z4ellTwZa9IYGZ-b5yHO5ieya8',
  'https://lh3.googleusercontent.com/d/1-PluSqDBquEWZKaN34oMYsgoIUS7pST3',
  'https://lh3.googleusercontent.com/d/1npJCpdJbvaqXL3xsBcCHEArcVg-kTtlZ',
  'https://lh3.googleusercontent.com/d/1O26ijiKhNZ8Z6p5L3jhJHsFcj4dMjlvz',
  'https://lh3.googleusercontent.com/d/1aL74Mq10SOUCpmirn2EndV23KagdvBnb',
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Reverse drawing order as requested
  const displayDrawings = [...drawings].reverse();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const nextProject = (e) => {
    e.stopPropagation();
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = (e) => {
    e.stopPropagation();
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleProjectClick = (id) => {
    setSelectedProjectId(id);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeContent = "Product — Software — UI/UX — Strategy —\u00A0";
  const profilePhotoUrl = "https://lh3.googleusercontent.com/d/1xcJedrW0ssjvlCSMUNSePdeks7-46jFj";

  const renderContent = () => {
    if (currentView === 'contact') {
      return html`<${Contact} />`;
    }

    if (currentView === 'works') {
      return html`<${Works} projects=${projects} onProjectClick=${handleProjectClick} />`;
    }

    if (currentView === 'project' && selectedProjectId) {
      const project = projects.find(p => p.id === selectedProjectId);
      return html`<${ProjectDetail} project=${project} onBack=${() => setCurrentView('works')} />`;
    }

    // Home View
    return html`
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        
        <!-- Row 1: Bio/Marquee (Left) & Picture (Right) -->
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-6">
              <!-- Marquee Card -->
              <${Card} className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 flex items-center overflow-hidden h-64 relative" noPadding=${true}>
                 <div className="absolute inset-0 z-0 bg-transparent"></div> 
                 <div className="w-full overflow-hidden flex items-center h-full z-10 relative">
                    <div className="flex whitespace-nowrap animate-marquee-slow items-center">
                      <span className="text-5xl font-bold tracking-tighter text-black dark:text-white opacity-90 transition-colors">${marqueeContent}</span>
                      <span className="text-5xl font-bold tracking-tighter text-black dark:text-white opacity-90 transition-colors">${marqueeContent}</span>
                      <span className="text-5xl font-bold tracking-tighter text-black dark:text-white opacity-90 transition-colors">${marqueeContent}</span>
                      <span className="text-5xl font-bold tracking-tighter text-black dark:text-white opacity-90 transition-colors">${marqueeContent}</span>
                    </div>
                 </div>
              </${Card}>

              <!-- Bio Card -->
              <${Card} className="h-64 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden text-xl">
                     👩🏻‍💻
                  </div>
                  <h2 className="text-2xl font-bold">Hi, I'm Jenna</h2>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                    A Product Manager and former Software Engineer passionate about using technology as a vehicle for creating meaningful and positive impact in the world 🌍.
                  </p>           
                  <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed mt-4">
                    Outside of work, you can find me knitting sweaters 🧶, at the gym 🎧, or getting lost in nature 🌲.
                  </p>
                </div>
              </${Card}>
          </div>

          <!-- Picture Card -->
          <${Card} className="relative h-full min-h-[500px] md:min-h-0" noPadding=${true}>
             <img src=${profilePhotoUrl} alt="A photo of Jenna" className="w-full h-full object-cover object-top" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </${Card}>

        </div>

        <!-- Row 2: Projects (Full Width) -->
        <${Card} className="w-full min-h-[500px] flex flex-col relative group cursor-pointer" noPadding=${true}>
          <div className="absolute inset-0 w-full h-full" onClick=${() => handleProjectClick(projects[currentProjectIndex].id)}>
            <img 
              src=${projects[currentProjectIndex].image} 
              alt=${projects[currentProjectIndex].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
          </div>
          
          <div className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
                <div className="flex gap-2">
                  <span className="text-xs font-bold tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full uppercase text-white">
                      Project ${currentProjectIndex + 1} / ${projects.length}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick=${prevProject} className="p-2 bg-black/30 hover:bg-white hover:text-black rounded-full backdrop-blur-md transition-all text-white">
                    <${ChevronLeft} size=${20} />
                  </button>
                  <button onClick=${nextProject} className="p-2 bg-black/30 hover:bg-white hover:text-black rounded-full backdrop-blur-md transition-all text-white">
                    <${ChevronRight} size=${20} />
                  </button>
                </div>
            </div>

            <div className="mt-auto text-center md:text-left max-w-3xl pointer-events-none">
              <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                ${projects[currentProjectIndex].title}
              </h3>
              <p className="text-lg md:text-2xl font-medium text-white mt-2 tracking-wide">
                ${projects[currentProjectIndex].subtitle}
              </p>
              <div className="flex gap-2 mt-4 justify-center md:justify-start">
                ${projects[currentProjectIndex].tags.map(tag => html`
                  <span key=${tag} className="text-xs md:text-sm text-neutral-300 border border-white/20 px-3 py-1 rounded-md">
                    ${tag}
                  </span>
                `)}
              </div>
            </div>
          </div>
        </${Card}>

        <!-- Row 3: Remaining Widgets -->
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
           
           <!-- Experience -->
           <${Card} className="h-full flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Experience</h3>
              <${Experience} />
           </${Card}>

           <!-- Open To Work & Socials -->
           <div className="flex flex-col gap-6">
              <${Card} className="bg-white dark:bg-neutral-900 flex-1 flex flex-col items-start justify-center">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-neutral-300">Open to work</span>
                 </div>
                 <h3 className="text-xl font-bold mb-1">Have an opportunity in mind?</h3>
                 <div className="flex flex-col gap-4 w-full mt-4">
                    <!-- TODO: Replace with real resume link. -->
                    <a 
                      href="https://github.com/jennazch/jenna" 
                      target="_blank"
                      className="bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors w-full sm:w-max group"
                    >
                       View resume <${FileText} size=${16} className="text-gray-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"/>
                    </a>
                    <button 
                      onClick=${() => setCurrentView('contact')}
                      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-between gap-2 hover:opacity-80 transition-opacity w-full sm:w-max"
                    >
                       Contact me <${ArrowRight} size=${16} />
                    </button>
                 </div>
              </${Card}>

              <${Card} className="flex items-center justify-center py-6">
                 <a href="https://www.linkedin.com/in/jennazch/" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 dark:bg-neutral-800 rounded-2xl hover:bg-[#0077b5] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group hover:scale-110">
                   <${Linkedin} size=${28} />
                 </a>
              </${Card}>
           </div>

           <!-- Tech Stack -->
           <${Card} className="h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skills</h3>
              <${TechStack} />
           </${Card}>

           <!-- Canvas (Drawings Carousel) -->
           <${Card} className="md:col-span-3 min-h-[250px] mt-2 overflow-hidden flex flex-col justify-center bg-white dark:bg-neutral-900" noPadding=${true}>
              <div className="p-8 pb-4 relative z-10 bg-white dark:bg-neutral-900">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Canvas (just for fun)</h3>
                  <p className="text-gray-500 dark:text-neutral-400 text-sm">Some drawings I've done while on my self-taught journey</p>
              </div>
              
              <div className="relative w-full overflow-hidden py-8">
                  <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none"></div>

                  <div className="flex w-max animate-marquee-fast hover:pause-animation">
                      ${[...displayDrawings, ...displayDrawings].map((src, index) => html`
                          <div key=${index} className="flex-shrink-0 w-64 h-48 mx-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800">
                              <img src=${src} alt="Drawing" className="w-full h-full object-cover transition-all duration-500" />
                          </div>
                      `)}
                  </div>
              </div>
           </${Card}>

        </div>
      </div>
    `;
  };

  return html`
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-neutral-200 dark:selection:bg-white/20 transition-colors duration-300">
      <${Sidebar} isDarkMode=${isDarkMode} toggleTheme=${toggleTheme} setView=${setCurrentView} currentView=${currentView} />
      
      <main className="flex-1 lg:ml-96 p-4 lg:p-8 overflow-x-hidden">
         ${renderContent()}
      </main>
    </div>
  `;
}

export default App;