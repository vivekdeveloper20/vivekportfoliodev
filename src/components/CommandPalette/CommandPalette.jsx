import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands = [
    {
      id: 1,
      name: 'Go to About',
      category: 'Navigation',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G A'
    },
    {
      id: 2,
      name: 'Go to Skills',
      category: 'Navigation',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G S'
    },
    {
      id: 3,
      name: 'Go to Projects',
      category: 'Navigation',
      action: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G P'
    },
    {
      id: 4,
      name: 'Go to Experience',
      category: 'Navigation',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G E'
    },
    {
      id: 5,
      name: 'Go to Certifications',
      category: 'Navigation',
      action: () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G C'
    },
    {
      id: 6,
      name: 'Go to Contact',
      category: 'Navigation',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'G C'
    },
    {
      id: 7,
      name: 'Copy Email',
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText('vivekkumarlpu1@gmail.com');
        setOpen(false);
        alert('Email copied to clipboard!');
      },
      shortcut: 'C E'
    },
    {
      id: 8,
      name: 'Open GitHub',
      category: 'Links',
      action: () => {
        window.open('https://github.com/vivekdeveloper20', '_blank');
        setOpen(false);
      },
      shortcut: 'O G'
    },
    {
      id: 9,
      name: 'Open LinkedIn',
      category: 'Links',
      action: () => {
        window.open('https://www.linkedin.com/in/vivekkr-gupta/', '_blank');
        setOpen(false);
      },
      shortcut: 'O L'
    },
    {
      id: 10,
      name: 'Scroll to Top',
      category: 'Actions',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpen(false);
      },
      shortcut: 'H'
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
        setSearch('');
      }

      // Escape to close
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Floating Command Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2 text-sm font-semibold"
      >
        <FiSearch className="w-4 h-4" />
        <span className="hidden sm:inline">Cmd+K</span>
      </button>

      {/* Command Palette Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-700 overflow-hidden">
            {/* Search Input */}
            <div className="border-b border-slate-700 px-6 py-4 flex items-center gap-3">
              <FiSearch className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-slate-800 rounded transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                <div>
                  {/* Group by Category */}
                  {['Navigation', 'Actions', 'Links'].map(category => {
                    const categoryCommands = filteredCommands.filter(cmd => cmd.category === category);
                    if (categoryCommands.length === 0) return null;

                    return (
                      <div key={category}>
                        <div className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-slate-800/50">
                          {category}
                        </div>
                        {categoryCommands.map(cmd => (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-800 transition-colors text-left group"
                          >
                            <span className="text-white group-hover:text-cyan-300 transition-colors">
                              {cmd.name}
                            </span>
                            <span className="text-xs text-gray-500 group-hover:text-gray-400">
                              {cmd.shortcut}
                            </span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-400">No commands found</p>
                </div>
              )}
            </div>

            {/* Footer Info */}
            <div className="border-t border-slate-700 px-6 py-3 text-xs text-gray-500 bg-slate-800/50">
              <p>💡 Tip: Press <kbd className="bg-slate-700 px-2 py-1 rounded text-gray-300">ESC</kbd> to close</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
