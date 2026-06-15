import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAd-hO7b3O7earWSAilzzZuLaivnFYrC_w",
    authDomain: "porto-54f19.firebaseapp.com",
    projectId: "porto-54f19",
    storageBucket: "porto-54f19.firebasestorage.app",
    messagingSenderId: "25219068431",
    appId: "1:25219068431:web:5cce59235013b8571f297a"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadPublicBlogPosts() {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        console.log("Post Title:", post.title);
        // Map these properties to your public HTML template elements!
    });
}
loadPublicBlogPosts();

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