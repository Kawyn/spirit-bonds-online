
var index = undefined;



class Statement {
    constructor (quote, { environment, author, avatars, responses, colors, i } = { undefined, undefined, undefined, undefined, undefined, undefined }) {
        this.author = author;
        this.quote = quote;

        this.environment = environment;
        this.avatars = avars;
        this.colors = colors;
        this.responses = responses;
        this.i = i;
    }
}

class Answer {
    constructor (quote, index) {
        this.quote = quote;
        this.index = index;
    }
}

const kindred = {

    name: 'Kindred',
    avatar: './images/kindred/kindred-mask-wolf-neutral.png',
    background: './images/bg-mountains.jpg',

    colors: {
        primary: '#f49293',
        secondary: '#ffa89e',
    },
    episodes: [

    ]
}


class Vector2 {

    constructor (x, y) {

        this.x = parseFloat(x) || 0;
        this.y = parseFloat(y) || 0;
    }
}

const vayne = {

    position: new Vector2(30, 65),

    name: 'Vayne',
    description: 'The hunt never ends.',
    avatar: "./images/vayne/vayne-neutral.png",
    background: "./images/bg-akana-forest.jpg",

    colors: {
        primary: '#8582ff',
        secondary: '#a09eff'
    },


    episodes: [
        {
            statements: [
                new Statement('[A figure is examining the ground a short distance ahead of you, mumbling to herself.]',
                    {
                        environment: './images/bg-graveyard-of-swords.jpg',
                        avatars: ['./images/vayne/vayne-masked-neutral.png'],

                        colors: ['#f2dabd', '#f2dabd'],

                    }),
                new Statement('You\'re not even trying to hide your trail...',
                    {
                        author: 'MASKED WOMAN',

                        responses: [
                            new Answer('Excuse me...', 2),
                            new Answer('What are you looking at?', 2),
                            new Answer('You lost, too?', 2),
                        ]
                    }),
                new Statement('...', { author: 'MASKED WOMAN' }),
                new Statement('[The woman turns away.]',
                    {
                        author: 'MASKED WOMAN',

                        responses: [
                            new Answer('H-hey! Don\'t just walk away!', 4),
                            new Answer('Wait! Can you tell me where we are?', 4),
                        ]
                    }),
                new Statement('Don\'t talk to me.',
                    {
                        author: 'MASKED WOMAN',

                        responses: [
                            new Answer('But I could realy use your help...', 5),
                            new Answer('Um, rude.', 6),
                            new Answer('Just hold on moment.', 6),
                        ]
                    }),
                new Statement('Help yourself.', { author: 'MASKED WOMAN', i: 7 }),
                new Statement('No.', { author: 'MASKED WOMAN' }),
                new Statement(`It's not safe around here. Leave before you lose all your... leaving parts.`, { author: 'MASKED WOMAN' }),
                new Statement(`And don't follow me.`, { author: 'MASKED WOMAN' }),
                new Statement('...', { author: 'MASKED WOMAN' }),
                new Statement('......', { author: 'MASKED WOMAN' }),
                // 11
                new Statement('I said don\'t follow me. Are you some sort of large, adult child?', {
                    author: 'MASKED WOMAN',
                    responses: [
                        new Answer('Can I touch your ribbon?', 12),
                    ]
                }),
                new Statement('What?', {
                    author: 'MASKED WOMAN',
                    avatars: ['./images/vayne/vayne-masked-irritated.png'],
                }),
                new Statement('NO.', {
                    author: 'MASKED WOMAN',
                    avatars: ['./images/vayne/vayne-masked-angry.png'],
                }),
                new Statement('Stop talking. You\'ll scare it away!.', { author: 'MASKED WOMAN' }),
                new Statement('I will kill you where you stand if you make me lose my quarry.', { author: 'MASKED WOMAN' }),
                new Statement('Now get away from me!', { author: 'MASKED WOMAN' }),
                new Statement('[The woman bolts into the nearby forest. She clearly does not want to be followed.]',
                    {
                        avatars: ['none']
                    }),
                new Statement('[You decide you should definetly follow her.]'),
            ],
        }
    ]
}



const interface = {
    responses: [...document.getElementsByClassName('response')]
};

interface.responses.reverse();




function ytrewq() {
    let statement = episode.statements[index];


    if (statement.environment)
        background.style.backgroundImage = `url(${statement.environment})`;

    if (statement.avatars) {
        avt.style.backgroundImage = `url(${statement.avatars[0]})`;
    }

    name1.textContent
        = statement.author;
    quote.textContent = statement.quote;

    statement.author ? setActive(line, false) : setActive(line, true);
    if (statement.colors) {
        root.setProperty('--primary', statement.colors[0])
        root.setProperty('--secondary', statement.colors[1])
    }

    interface.responses.forEach(e => {
        setActive(e, false);
    })

    document.getElementById('tk').style.bottom = '6%';
}







function qwerty() {


    if (!episode.statements[index].responses) {


        if (episode.statements[index].i) {
            index = episode.statements[index].i;
        }
        else index++;
        let statement = episode.statements[index];

        if (index >= episode.statements.length) {
            dialogue.style.display = "none";
            Open(character)
        }

        if (statement.environment)
            background.style.backgroundImage = `url(${statement.environment})`;

        if (statement.avatars)
            avt.style.backgroundImage = `url(${statement.avatars[0]})`;


        name1.textContent
            = statement.author;
        quote.textContent = statement.quote;

        statement.author ? setActive(line, false) : setActive(line, true);
        if (statement.colors) {
            root.setProperty('--primary', statement.colors[0])
            root.setProperty('--secondary', statement.colors[1])
        }
    }
    else {

        let statement = episode.statements[index];

        for (let i = 0; i < statement.responses.length; i++) {

            let text = interface.responses[i];

            text.innerHTML = `<h1>${statement.responses[i].quote}<h1 />`;
            setActive(interface.responses[i], true);
        }

        document.getElementById('tk').style.bottom = 6 + 9 * statement.responses.length + '%';


    }
}





const line = document.getElementById('line');
function Chat(e) {

    // Set Episode...
    episode = e;

    if (!e) {
        alert(`aktualnie nie dostępne`);
        return;
    }
    if (episode.statements[0].colors) {
        root.setProperty('--primary', episode.statements[0].colors[0])
        root.setProperty('--secondary', episode.statements[0].colors[1])
    }

    background.src = episode.statements[0].environment;
    dialogue.style.display = "block";
    icons.style.display = "none";
    menu.style.display = "none";

    name1.textContent
        = episode.statements[0].author;
    quote.textContent = episode.statements[0].quote;
    avt.style.backgroundImage = `url(${episode.statements[0].avatars[0]})`;


    if (!episode.statements[0].author)
        setActive(line, true);
    else
        setActive(line, false);

    index = 0;

}


const prologue = {

    quotes: [
        new Statement('[W niewielkiej odległości od ciebie jakaś żeńska postać przygląda się ziemi i coś do siebie mamrocze.]', { avatars: ['./images/vayne/vayne-masked-neutral.png'], environment: './images/bg-graveyard-of-swords.jpg' }),
        new Statement('Nawet nie próbujesz zacierać śladów...', {
            author: 'ZAMASKOWANA KOBIETA',
            responses: [
                new Answer('Też nie wiesz gdzie jesteś?', 1),
                new Answer('Na co się patrzymy?', 1),
                new Answer('Też nie wiesz, gdzie jesteś?', 1),
            ]
        }),
    ]
}


function setActive(object, value = true) {

    object.style.display = value ? 'block' : 'none';
}

