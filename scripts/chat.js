


const chat = {

    root: document.querySelector('#chat'),

    portrait: document.querySelector('#chat > img'),

    bar: document.querySelector('#chat > div'),

    author: document.querySelector('#chat > div > div:nth-of-type(1) > h1'),
    sentence: document.querySelector('#chat > div > div:nth-of-type(1) > p'),

    responses: document.getElementsByClassName('response'),

    character: null,
    episode: null,

    index: -1,

    start(episode) {

        fetch('./data/' + this.character.name + '/' + episode + '.json').then(res => {

            if (res.status > 400 && res.status < 600)
                return alert('work in progress =|')

            res.json().then(episode => {

                const srcs = [];

                for (let i = 0; i < episode.length; i++) {

                    if (episode[i].portrait)
                        images.pre('./images/' + this.character.name + '/' + episode[i].portrait,);

                    else if (episode[i].bg)
                        images.pre('./images/' + episode[i].bg);
                }

                this.index = -1;

                this.episode = episode;

                this.root.style.visibility = 'visible';
                menu.root.style.visibility = 'hidden';

                this.continue();
            });
        });
    },

    continue(inc = true) {

        if (inc)
            this.index = this.episode[this.index]?.next || this.index + 1;

        if (this.index >= this.episode.length)
            return this.close();

        for (const response of this.responses)
            response.style.visibility = 'hidden';
        const part = this.episode[this.index];


        this.sentence.textContent = part.sentence;
        this.author.textContent = part.author || '';

        if (part.portrait) {
            this.portrait.src = './images/' + this.character.name.toLowerCase() + '/' + part.portrait;
            this.portrait.style.display = 'block';

        }
        else if (part.portrait === null)
            this.portrait.style.display = 'none';
        if (part.bg)
            background.src = './images/' + part.bg;

        if (part.color)
            css.setProperty('--primary', part.color);

        if (part.responses)
            this.bar.children[0].onclick = () => { chat.show() };

        this.bar.style.top = '71%';

    },

    show() {

        this.bar.children[0].onclick = null;
        this.bar.children[0].style.cursor = 'default';
        const count = this.episode[this.index].responses.length;

        this.bar.style.top = 71 - 10 * count + '%';

        for (let i = 0; i < count; i++) {

            this.responses[i].style.visibility = 'visible';
            this.responses[i].children[0].textContent = this.episode[this.index].responses[i][0];
        }
    },

    say(i) {

        this.index = this.episode[this.index].responses[i][1];
        this.bar.children[0].onclick = () => { chat.continue() };

        this.bar.children[0].style.cursor = 'pointer';

        this.continue(false);
    },

    close() {
        menu.open(this.character);
        this.root.style.visibility = 'hidden';
    }
}