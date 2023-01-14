const numbers_node = document.querySelector('.main__numbers');

fetch('http://10.66.66.33:2107/code')
.then(res => res.text())
.then(res => {

    const checkCode = code => {
        fetch(`http://10.66.66.33:2107/code_check?code=${code}`)
        .then(res => res.json())
        .then(res => {
            if (res.link !== 'fall') {
                clearInterval(chInt);
            };
        })
        .catch(err => console.log(err))
    };

    let code = res;

    numbers_node.innerHTML = '';

    for (char in code) {
        const number = document.createElement('div');
        number.classList.add('number');
        number.innerHTML = code[char];
        numbers_node.append(number);
    }

    let chInt = setInterval(checkCode(code), 5000);

})
.catch(err => console.log(err));