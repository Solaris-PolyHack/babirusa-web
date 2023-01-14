const numbers_node = document.querySelector('.main__numbers');
const copied_node = document.querySelector('.main__copied');

fetch('http://10.66.66.27:2107/code')
.then(res => res.text())
.then(res => {
    
    const checkCode = code => {
        fetch(`http://10.66.66.27:2107/code_check?code=${code}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                clearInterval(chInt);
                location.href = res.url;
            } else if (res.status === 'creating') {
                numbers_node.innerHTML = '<div class="dockerCreate">Создаём Docker-контейнер...</div>' + '<svg role="img" aria-label="Mouth and eyes come from 9:00 and rotate clockwise into position, right eye blinks, then all parts rotate and merge into 3:00" class="smiley" viewBox="0 0 128 128" width="128px" height="128px">                <defs>                  <clipPath id="smiley-eyes">                    <circle class="smiley__eye1" cx="64" cy="64" r="8" transform="rotate(-40,64,64) translate(0,-56)" />                    <circle class="smiley__eye2" cx="64" cy="64" r="8" transform="rotate(40,64,64) translate(0,-56)" />                  </clipPath>                  <linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">                    <stop offset="0%" stop-color="#000" />                    <stop offset="100%" stop-color="#000" />                  </linearGradient>                  <mask id="smiley-mask">                    <rect x="0" y="0" width="128" height="128" fill="#000000" />                  </mask>                </defs>                <g stroke-linecap="round" stroke-width="12" stroke-dasharray="175.93 351.86">                  <g>                    <rect fill="#000000" width="128" height="64" clip-path="url(#smiley-eyes)" />                    <g fill="none" stroke="#000000">                      <circle class="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />                      <circle class="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />                    </g>                  </g>                  <g mask="url(#smiley-mask)">                    <rect fill="#000000" width="128" height="64" clip-path="url(#smiley-eyes)" />                    <g fill="none" stroke="#000000">                      <circle class="smiley__mouth1" cx="64" cy="64" r="56" transform="rotate(180,64,64)" />                      <circle class="smiley__mouth2" cx="64" cy="64" r="56" transform="rotate(0,64,64)" />                    </g>                  </g>                </g>              </svg>';
                numbers_node.style.cursor = 'default';
                numbers_node.replaceWith(numbers_node.cloneNode(true));
            }
        })
        .catch(err => console.log(err))
    };

    numbers_node.addEventListener('click', () => {
        navigator.clipboard.writeText(code)
        .then(() => {
            copied_node.classList.toggle('hidden');
            setTimeout(() => {
                copied_node.style.color = 'rgb(56, 201, 107)';
                copied_node.innerHTML = 'Скопировано!';
                copied_node.classList.toggle('hidden');
            }, 200);
            setTimeout(() => {
                copied_node.classList.toggle('hidden');
                setTimeout(() => {
                    copied_node.style.color = 'rgb(0, 0, 0)';
                    copied_node.innerHTML = 'Нажмите на код, чтобы скопировать';
                    copied_node.classList.toggle('hidden');
                }, 500);
            }, 5000);
        });
    });

    let code = '';

    if (res.length === 6) {
        code = res;
    } else {
        code = 'ошибка';
    };

    numbers_node.innerHTML = '';

    for (char in code) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerHTML = code[char];
        numbers_node.append(number);
    }

    chInt = setInterval(checkCode, 5000, code);

})
.catch(err => console.log(err));