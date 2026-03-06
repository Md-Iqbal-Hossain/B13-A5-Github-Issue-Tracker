document.getElementById('login-btn').addEventListener('click', function () {
    //1.get the user name
    const numberInput = document.getElementById("input-user");
    const userName = numberInput.value;
    console.log(userName);

    //2.get the password
    const passInput = document.getElementById('input-pass');
    const password = passInput.value;
    console.log(password);

    //3.match username and password
    if (userName === 'admin' && password === 'admin123') {
        // 3-1. true:::>> alert>homepage
        alert('login success');
        window.location.assign('home.html');
    }
    else {
        // 3-2. false:::>> alert>return
        alert('login failed');
        return;
    }
});
