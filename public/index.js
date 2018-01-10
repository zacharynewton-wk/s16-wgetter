const availableForDL = ['windows', 'mac', 'linux'];

// Src: http://www.javascripter.net/faq/operatin.htm
// This script sets OSName variable as follows:
// "Windows"    for all versions of Windows
// "MacOS"      for all versions of Macintosh OS
// "Linux"      for all versions of Linux
// "UNIX"       for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS
function detectOS() {
    let OSName="unknown";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
    return OSName;
}

function assignOSActive() {
    let osName = detectOS();
    if (availableForDL.indexOf(osName) == -1) {
        osName = availableForDL[0];
    }
    let activeNavElement = document.getElementById(`nav-${osName}`);
    let activeMainElement = document.getElementById(`main-${osName}`);
    activeNavElement.classList.add('active');
    activeMainElement.classList.add('active');
}

function assignNavListeners() {
    for (let i = 0; i < availableForDL.length; i++) {
        let navElement = document.getElementById(`nav-${availableForDL[i]}`);
        navElement.addEventListener('click', function (e) {
            this.classList.add('active');
            let name = this.id.replace('nav-','');
            let mainElement = document.getElementById(`main-${name}`);
            mainElement.classList.add('active');
            for (let j = 0; j < availableForDL.length; j++) {
                if (availableForDL[j] == name) continue;
                document.getElementById(`nav-${availableForDL[j]}`).classList.remove('active');
                document.getElementById(`main-${availableForDL[j]}`).classList.remove('active');
            }
        });
    }
}

assignOSActive();
assignNavListeners();