
const menu = {

    root: document.querySelector('#menu'),

    header: document.querySelector('#episodes > h1'),
    portrait: document.querySelector('#menu > img'),

    icon: document.querySelector('#episodes > .icon > img'),

    open(character) {

        this.header.textContent = character.name.toUpperCase();
        this.portrait.src = './images/' + character.name.toLowerCase() + '/' + character.menu.portrait;

        css.setProperty('--primary', character.colors[0]);
        css.setProperty('--secondary', character.colors[1]);

        this.icon.src = './images/icons/' + character.name.toLowerCase() + '.png';
        chat.character = character;
        fog.src = './images/' + character.name.toLowerCase() + '/fog.png';

        this.portrait.style.left = character.menu.offset[0] + '%';
        this.portrait.style.top = character.menu.offset[1] + '%';

        this.portrait.style.width = character.menu.size + '%';


        setTimeout(() => {
            background.src = './images/' + character.menu.background;
            icons.style.visibility = 'hidden';
            background.style.filter = 'blur(5px)'

            fog.style.visibility = 'visible';
            this.root.style.visibility = 'visible';
            resize();

        }, 150);

    },


    close() {
        fog.src = '';
        background.style.filter = '';

        icons.style.visibility = 'visible';
        this.root.style.visibility = 'hidden';

        fog.style.visibility = 'hidden';

        background.src = './images/bg-spirit-world-map.jpg';
    },
}