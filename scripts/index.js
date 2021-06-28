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