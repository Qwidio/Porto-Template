document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const html = document.documentElement;
    const themeToggleDesktop = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // === Theme Toggle Logic ===
    // Check local storage or system preference on load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    const toggleTheme = () => {
        html.classList.toggle('dark');
        // Save preference to localStorage
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    };

    // Attach theme toggle events
    themeToggleDesktop.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);


    // === Mobile Sidebar Logic ===
    const openSidebar = () => {
        mobileSidebar.classList.remove('translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        // slight delay to allow display block to apply before changing opacity
        setTimeout(() => sidebarOverlay.classList.remove('opacity-0'), 10);
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
    };

    const closeSidebar = () => {
        mobileSidebar.classList.add('translate-x-full');
        sidebarOverlay.classList.add('opacity-0');
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
        document.body.classList.remove('overflow-hidden');
    };

    mobileMenuBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});