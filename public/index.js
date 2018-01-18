const availableForDL = ['windows', 'mac', 'linux'];
const version = '0.1.0';

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

function assignSuggestedDL() {
    let osname = detectOS();
    let parentElement = document.getElementById(`main-${osname}`);
    let osbit = '';
    if (osname == 'mac') {
        osbit = 'mac'
    } else if (navigator.userAgent.indexOf("WOW64") != -1 || 
        navigator.userAgent.indexOf("Win64") != -1 ){
        osbit = '64';
    } else {
        osbit = '32';
    }
    let suggestedCards = parentElement.getElementsByClassName(`${osbit}-bit`);
    for (let i = 0; i < suggestedCards.length; i++) {
        suggestedCards[i].classList.add('suggested');
    }
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

function setDownloadLinks() {
    const base_url = `https://github.com/zacharynewton-wk/s16-wgetter/releases/download/v${version}/section-16-wgetter`;
    // Windows Installer
    let win_inst_dl = document.getElementById('win-inst-dl');
    win_inst_dl.setAttribute('href', `${base_url}.Setup.${version}.exe`);
    // Windows Portable
    let win_port_dl = document.getElementById('win-port-dl');
    win_port_dl.setAttribute('href', `${base_url}.${version}.exe`);
    // Windows Zip
    let win_zip_dl = document.getElementById('win-zip-dl');
    win_zip_dl.setAttribute('href', `${base_url}-${version}-win.zip`);
    // Mac Dmg
    let mac_dmg_dl = document.getElementById('mac-dmg-dl');
    mac_dmg_dl.setAttribute('href', `${base_url}-${version}.dmg`);
    // Mac Zip
    let mac_zip_dl = document.getElementById('mac-zip-dl');
    mac_zip_dl.setAttribute('href', `${base_url}-${version}-mac.zip`);
    // Linux Deb
    let linux_deb_dl = document.getElementById('linux-deb-dl');
    linux_deb_dl.setAttribute('href', `${base_url}_${version}_amd64.deb`);
    // Linux RPM
    let linux_rpm_dl = document.getElementById('linux-rpm-dl');
    linux_rpm_dl.setAttribute('href', `${base_url}-${version}.x86_64.rpm`);
    // Linux tar.gz
    let linux_tar_dl = document.getElementById('linux-tar-dl');
    linux_tar_dl.setAttribute('href', `${base_url}-${version}.tar.gz`);
    // Linux zip
    let linux_zip_dl = document.getElementById('linux-zip-dl');
    linux_zip_dl.setAttribute('href', `${base_url}-${version}.zip`);
}

assignOSActive();
assignNavListeners();
setDownloadLinks();
// assignSuggestedDL();