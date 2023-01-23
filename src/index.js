const barToggle = true;

const sideBar = document.getElementById('sideBar');
sideBar.addEventListener('mouseover', openSideBar);
sideBar.addEventListener('mouseout', closeSideBar)

function openSideBar() {
    sideBar.style.width = '200px';
}

function closeSideBar() {
    sideBar.style.width = '85px';
}

console.log('Hello World')