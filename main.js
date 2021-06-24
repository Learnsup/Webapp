var accountApi = 'http://localhost:3000/account';
var accounts = [];

// Phuong thuc

function getAccounts() {
    fetch(accountApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            account = response;
        })
}

function createAccount(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(accountApi, options)
        .then(function(response) {
            return response.json();
        })
}

// Dang nhap

getAccounts();

function Showsignup() {
    const main = document.getElementById("silo");
    if (main) {
        const toast = document.createElement("div");

        toast.onclick = function (e) {
            if (e.target.closest(".btn-back") || e.target.closest(".modal_overlay") || e.target.closest(".auth-form_switch-btn")) {
              main.removeChild(toast);
            }
        };
  
        toast.innerHTML = `
                <div class="modal">
                    <div class="modal_overlay"></div>
                
                    <div class="modal_body">
                            
                        <div class="auth-form">
                            <div class="auth-form_container">
                                <div class="auth-form_header">
                                    <h3 class="auth-form_heading">Sign up</h3>
                                    <span onclick="Showlogin()" class="auth-form_switch-btn">Log in</span>
                                </div>
                                <form action="">
                                    <div class="auth-form_form">
                                        <div class="auth-form_group">
                                            <input type="text" required id="email" class="auth-form_input" placeholder="Email">
                                        </div>
                                        <div class="auth-form_group">
                                            <input type="password" required id="pass1" class="auth-form_input" placeholder="Enter your password">
                                        </div>  
                                        <div class="auth-form_group">
                                            <input type="password" required id="pass2" class="auth-form_input" placeholder="Enter your password again">
                                        </div> 
                                    </div>
                                    
                                    <div class="auth-form_aside">
                                        <p class="auth-form_policy-text">
                                            By registering, you agree to Shopee about
                                            <a href="" class="auth-form_link">Terms of Service</a> &
                                            <a href="" class="auth-form_link">Privacy Policy</a>
                                        </p>
                                    </div>
                    
                                    <div class="auth-form_controls">
                                        <button class="btn btn-normal btn-back">BACK</button>
                                        <input class="btn btn-primary" type="submit" value="SIGN UP">
                                    </div>
                                </form>
                            </div>
                
                            <div class="auth-form_socials">
                                <a href="" class="auth-form_socials-face btn btn-size-s btn-with-icon">
                                    <i class="auth-form_socials-icon fab fa-facebook-square"></i>
                                    <span class="auth-form_socials-title">
                                        Connect with Facebook
                                    </span>
                                </a>
                                <a href="" class="auth-form_socials-google btn btn-size-s btn-with-icon">
                                    <i class="auth-form_socials-icon fab fa-google"></i>
                                    <span class="auth-form_socials-title">
                                        Connect with Gmail
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div> 
                  `;
        main.appendChild(toast);
        var siupBtn = document.querySelector('input[type="submit"]');
        siupBtn.onclick = function () {
            let pass1 = document.getElementById("pass1").value;
            let pass2 = document.getElementById("pass2").value;
            let email = document.getElementById("email").value;
            if (pass1 == pass2 && pass1 != '' && email != '') {
                var dataForm = {
                    email: email,
                    pass: pass1,
                }
                createAccount(dataForm);
                console.log(123);
                window.location.href = "facebook.com";
            }else {
                alert("Wrong password");
            }
        }
    }
}

function Showlogin() {
    const main = document.getElementById("silo");
    if (main) {
        const toast = document.createElement("div");

        toast.onclick = function (e) {
            if (e.target.closest(".btn-back") || e.target.closest(".modal_overlay") || e.target.closest(".auth-form_switch-btn")) {
              main.removeChild(toast);
            }
        };
  
        toast.innerHTML = `
                <div class="modal">
                    <div class="modal_overlay"></div>
                
                    <div class="modal_body">
                            
                        <div class="auth-form">
                            <div class="auth-form_container">
                                <div class="auth-form_header">
                                    <h3 class="auth-form_heading">Log in</h3>
                                    <span onclick="Showsignup()" class="auth-form_switch-btn">Sign up</span>
                                </div>
                                
                                <form action="">
                                    <div class="auth-form_form">
                                        <div class="auth-form_group">
                                            <input type="text" required id="email" class="auth-form_input" placeholder="Email">
                                        </div>
                                        <div class="auth-form_group">
                                            <input type="password" required id="pass" class="auth-form_input" placeholder="Enter your password">
                                        </div>  
                                    </div>
                                    
                                    <div class="auth-form_aside">
                                        <div class="auth-form_help">
                                            <a href="" class="auth-form_help-link auth-form_help-forgot">Forgot password?</a>
                                            <span class="auth-form_help-separate"></span>
                                            <a href="" class="auth-form_help-link">Help?</a>
                                        </div>
                                    </div>
                    
                                    <div class="auth-form_controls">
                                        <button class="btn btn-normal btn-back">BACK</button>
                                        <input class="btn btn-primary" type="submit" value="LOG IN">
                                    </div>
                                </form>    
                            </div>
                
                            <div class="auth-form_socials">
                                <a href="" class="auth-form_socials-face btn btn-size-s btn-with-icon">
                                    <i class="auth-form_socials-icon fab fa-facebook-square"></i>
                                    <span class="auth-form_socials-title">
                                        Connect with Facebook
                                    </span>
                                </a>
                                <a href="" class="auth-form_socials-google btn btn-size-s btn-with-icon">
                                    <i class="auth-form_socials-icon fab fa-google"></i>
                                    <span class="auth-form_socials-title">
                                        Connect with Gmail
                                    </span>
                                </a>
                            </div>
                        </div> 
                    </div>
                </div> 
                  `;
        main.appendChild(toast);
        var loinBtn = document.querySelector('input[type="submit"]');
        loinBtn.onclick = function() {
            let email = document.getElementById('eamil').value;
            let pass = document.getElementById('pass').value;
            let testEmail = accounts.find(function(account) {
                return account.name === email;
            })
            if (testEmail.pass != pass) alert('Sai mk'); 
        }
    }
}



  