/**
 * Change size of font, icons, borders, blur to fit inside the scene.
 */
function resize() {

    css.fontSize = scene.clientHeight / 50 + 'px';


    const size = scene.clientWidth / 10;

    // Here is menu. 
    menu.icon.width = size;

    const border = menu.icon.parentElement;

    border.style.width = size + 'px';
    border.style.height = size + 'px';

    if (background.style.filter)
        background.style.filter = 'blur(' + size / 50 + 'px)';

    fog.style.filter = 'blur(' + size / 100 + 'px)';

    // Icons are below.
    for (const icon of icons.children) {

        icon.style.width = size / 2 + 'px';
        icon.children[1].width = size / 2;

        icon.style.height = size / 2 + 'px';
        icon.children[1].height = size / 2;
    }

    css.setProperty('--border', size / 100 + 'px solid #f2dabd');
}

window.addEventListener('resize', () => resize());