const {remote} = require('electron');
const Store = require('./store.js');

document.getElementById('btnClose').addEventListener('click', closeWindow);

function closeWindow(){
    var window = remote.getCurrentWindow()
    window.close()
}

$('#form-login').on('submit',function(e){
    
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    if(email !== '' && password !== ''){
        var data = {email: email, password: password};

        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: "http://localhost:3333/sessions",
            data: JSON.stringify(data),
            beforeSend: function(){
                
            },
            success: function(retorno){
                var token_user = retorno.token;
                if(token_user != ''){
                    console.log(token_user);
                    const store = new Store({
                        configName: 'user-preferences',
                        defaults: {
                          token: token_user
                        }
                    });

                    store.set('token', token_user);
                    

                    window.location.href = "./app.html";
                }
                else{
                    alert('Invalid email or password!');
                }
            },
            error: function(){
                alert('Login error!');
            }   
        });
    }
    else{
        alert('Enter your email and password!');
    }
});