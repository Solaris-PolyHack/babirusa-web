const numbers_node = document.querySelector('.main__numbers');

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
            };
        })
        .catch(err => console.log(err))
    };

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