(() => {
    let ILYADEVMAN = "ILYADEVMAN";
    let ILYADEVMAN_LENGTH = ILYADEVMAN.length;
    let ILYADEVMAN_ARRAY = ILYADEVMAN.split("");
    let LINES_COUNT = 9;
    let CIPHER_TIME = 500;

    let cursor = {
        x: 0,
        y: 0
    };

    function updateCursorPosition(p) {
        cursor.x = p.x;
        cursor.y = p.y;
    }
    addEventListener('mousemove', updateCursorPosition, false);

    function cipherText(username) {
        let time = CIPHER_TIME / Math.floor(ILYADEVMAN_LENGTH / 2);
        for (let letter_i in ILYADEVMAN) {
            setTimeout(function () {
                let cursor_seed = Number("1." + (cursor.x * cursor.y));
                let randomLetter = Math.floor(Math.random() * cursor_seed * 26) + 65;
                let start = Math.floor(ILYADEVMAN_LENGTH / 2);
                let prev_letter = start - letter_i;
                let next_letter = start + Number(letter_i);
                let text = username.innerText.split('');
                if (next_letter == prev_letter) {
                    if (text[next_letter]) text[next_letter] = String.fromCharCode(randomLetter);
                } else {
                    if (text[next_letter]) {
                        randomLetter = Math.floor(Math.random() * cursor_seed * 26) + 65;
                        text[next_letter] = String.fromCharCode(randomLetter);
                    }
                    if (text[prev_letter]) {
                        randomLetter = Math.floor(Math.random() * cursor_seed * 26) + 65;
                        text[prev_letter] = String.fromCharCode(randomLetter);
                    }
                }
                username.innerHTML = text.join('');
            }, time);
            time += CIPHER_TIME / username.innerHTML.length;
        }
    }

    function createHolder(line, width) {
        var holder = document.createElement('div');
        holder.className = 'holder';
        holder.style.transform = 'rotate(-15deg) translateY(' + (-55 + line * -5) + 'px) translateX(' + (((line + 1) % 2 * -230) - (line * 50)) + 'px)';
        holder.style.width = width + 'px';
        return holder;
    }

    function createUsername(holder, line_i, username_i) {
        var username = document.createElement('div');
        username.className = 'username';

        for (let i = 0; i < ILYADEVMAN_LENGTH; i++) {
            let current_timing = (line_i * 200) + (username_i * 100) + (i * 10);
            setTimeout(function () {
                let current_letter = ILYADEVMAN[i];
                username.innerHTML += current_letter;
            }, current_timing);
        }

        holder.appendChild(username);
        username.addEventListener('click', function () {
            if (!username.hasAttribute('interval')) {
                cipherText(username);
                username.setAttribute('interval', 'yep');
                setInterval(function () {
                    cipherText(username);
                }, CIPHER_TIME);
            }
        });
        return username;
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.fonts.ready.then(function () {
            setTimeout(function () {
                for (let i = 1; i <= LINES_COUNT; i++) {
                    var holder = createHolder(i, i * 450);
                    for (let j = 0; j < i; j++) {
                        createUsername(holder, i, j);
                    }
                    document.body.appendChild(holder);
                }
            }, 250);
        });
    });
})()