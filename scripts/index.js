const css = document.documentElement.style;

const characters = {};
const fog = document.querySelector('#fog');

const scene = document.querySelector('#scene');
const background = document.querySelector('#scene > img');

// create icons
const icons = document.querySelector('#icons');

for (const name of ['ahri', 'cassiopeia', 'kindred', 'lillia', 'riven', 'teemo', 'thresh', 'vayne', 'yasuo', 'yone']) {

    fetch('./data/' + name + '/index.json').then(response => {

        response.json().then(character => {

            characters[character.name] = character;

            const icon = document.createElement('div');

            icon.setAttribute('class', 'icon');

            icon.style.cursor = 'pointer';

            icon.style.left = character.position[0] + '%';
            icon.style.top = character.position[1] + '%';

            icon.innerHTML =
                '<div' + (character.right ? ' right>' : '>') +
                '<h1 style="color: ' + character.colors[0] + '">' + name.toUpperCase() + '</h1>' +
                '<hr />' +
                '<p>' + character.statement + '</p>' +
                '</div>' +
                '<img src="./images/icons/' + name + '.png"  style="border-color:' + character.colors[0] + '" />';

            icon.onclick = () => { menu.open(character); };

            icons.appendChild(icon);

            // Preload images.
            images.pre(
                './images/' + character.name.toLowerCase() + '/' + character.menu.portrait,
                './images/' + character.name.toLowerCase() + '/fog.png',
                './images/' + character.menu.background);


            resize();
        });
    });
}

const images = {

    srcs: [],
    objects: [],


    pre() {

        for (let src of arguments) {

            if (this.srcs.includes(src) || !src)
                continue;

            const img = new Image();
            img.src = src;

            this.objects.push(img);
        }
    }
}

function resize() {

    css.fontSize = scene.clientHeight / 50 + 'px';


    const size = scene.clientWidth / 10;

    menu.icon.width = size;

    const border = menu.icon.parentElement;

    border.style.width = size + 'px';
    border.style.height = size + 'px';

    if (background.style.filter)
        background.style.filter = 'blur(' + size / 50 + 'px)';

    fog.style.filter = 'blur(' + size / 100 + 'px)';

    for (const icon of icons.children) {

        icon.style.width = size / 2 + 'px';
        icon.children[1].width = size / 2;

        icon.style.height = size / 2 + 'px';
        icon.children[1].height = size / 2;
    }

    css.setProperty('--border', size / 100 + 'px solid #f2dabd');
}

window.addEventListener('resize', resize);


window.addEventListener('keydown', event => {
    if (event.key === 'Escape')
        chat.close();
})




const footers = [
    'Rito pls don\'t sue me =|',
    'Do you know what is even better than this? <a href="https://kawyn.github.io/ponyvile/">Ponyvile</a>!<span style="font-size: 0.8em"> It is not.</span>',
    'Press ESC while talking with your waifu to quit.',
    'Here is <a href="https://github.com/Kawyn/spirit-bonds-online">GitHub Page</a> where you can leave star, watch repository or steal code.',
    '... but Mr Cop, Kindred said she was over a thousand years old. =(',
    'There are at least two different footers... and this is one of them.',
    'New chapter every friday. =L',
    'You can play newer version <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" onclick="document.querySelector(\'#footer\').innerHTML = \'GOT RICK ROLLED, HAHA!\'">here</a>.',
    'Also try Terraria - stolen from Minecraft.',
    'Better love story than Twilight.'
]

document.querySelector('#footer').innerHTML = footers[Math.floor(Math.random() * footers.length)];