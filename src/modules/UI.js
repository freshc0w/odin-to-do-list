

export default function loadHomePage() {
    addSideBarFunctionality();
};


function addSideBarFunctionality() {
    const sideBar = document.getElementById('sideBar');
    sideBar.addEventListener('mouseover', () => {
        sideBar.style.width = '200px';
    });
    sideBar.addEventListener('mouseout', () => {
        sideBar.style.width = '65px';
    });
};
