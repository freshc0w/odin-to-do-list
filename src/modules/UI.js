export default class UI {
    static loadHomePage() {
        UI.addSideBarFunc();
    }

    static addSideBarFunc() {
        const sideBar = document.getElementById('sideBar');
        sideBar.addEventListener('mouseover', () => {
            sideBar.style.width = '200px';
        });
        sideBar.addEventListener('mouseout', () => {
            sideBar.style.width = '65px';
        });

        document.getElementsByClassName('inbox-bar');
        

    };

};

