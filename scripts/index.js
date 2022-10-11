(() => {
    let ILYADEVMAN = "ILYADEVMAN";
    let ILYADEVMAN_LENGTH = ILYADEVMAN.length;
    let ILYADEVMAN_ARRAY = ILYADEVMAN.split("");
    let LINES_COUNT = 9;
    let CIPHER_TIME = 500;
    let AS_SCREENSAVER = (new URL(document.location.href)).searchParams.has('screensaver');

    let cursor = {
        x: 0,
        y: 0
    };

    function updateCursorPosition(p) {
        cursor.x = Math.abs(p.x);
        cursor.y = Math.abs(p.y);
    }
    addEventListener('mousemove', updateCursorPosition, false);

    function cipherText(username, cursor_seed, from = undefined) {
        let time = CIPHER_TIME / Math.floor(ILYADEVMAN_LENGTH / 2);
        let start = Math.floor(ILYADEVMAN_LENGTH / 2);
        if (from !== undefined) start = Number(from);
        for (let letter_i in ILYADEVMAN) {
            setTimeout(function () {
                let randomLetter = Math.floor(Math.random() * cursor_seed * 26) + 65;
                let prev_letter = start - letter_i;
                let next_letter = start + Number(letter_i);
                let text = username.innerText.split('');
                if (next_letter == prev_letter) {
                    if (text[next_letter]) {
                        text[next_letter] = String.fromCharCode(randomLetter);
                    }
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
            time += CIPHER_TIME / ILYADEVMAN_LENGTH;
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
                username.innerHTML += "<span i='" + i + "'>" + current_letter + "</span>";
            }, current_timing);
            if (AS_SCREENSAVER) {
                setTimeout(function () {
                    cipherText(username, 1, 0);
                    username.click()
                }, current_timing + 1000);
            }
        }

        holder.appendChild(username);
        username.addEventListener('click', function (e) {
            if (!username.hasAttribute('interval')) {
                let from = e ? e.target.getAttribute('i') : undefined;
                let cursor_seed = Number("1." + (cursor.x * cursor.y));
                cipherText(username, cursor_seed, from);
                username.setAttribute('interval', 'yep');
                setInterval(function () {
                    cipherText(username, cursor_seed, from);
                }, CIPHER_TIME);
            }
        });
        return username;
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Run page animation
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
        if (AS_SCREENSAVER) {
            document.body.classList.add("screensaver")
        }

        // Update resume language
        let resume = {
            text: document.querySelector(".resume .text"),
            link: document.querySelector(".resume a"),
        }
        if (navigator.language.indexOf("ru") > -1) {
            resume.text.innerHTML = "Я в поиске работы!";
            resume.link.innerHTML = "Открыть резюме"
            resume.link.setAttribute("href", "https://storage.yandexcloud.net/ilyich/%D0%A0%D0%B5%D0%B7%D1%8E%D0%BC%D0%B5.pdf")
        } else {
            resume.text.innerHTML = "I'm looking for a job!";
            resume.link.innerHTML = "Open resume"
            resume.link.setAttribute("href", "https://storage.yandexcloud.net/ilyich/Resume.pdf")
        }
    });
})()