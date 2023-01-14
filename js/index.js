const numbers_node = document.querySelector('.main__numbers');
const copied_node = document.querySelector('.main__copied');

fetch('http://10.66.66.33:2107/code')
.then(res => res.text())
.then(res => {

    const checkCode = code => {
        fetch(`http://10.66.66.33:2107/code_check?code=${code}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === 'ok') {
                clearInterval(chInt);
                location.href = res.url;
            } else if (res.status === 'creating') {
                numbers_node.innerHTML = 'Создаём Docker-контейнер...';
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