(function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarEmail(email) {
        return emailRegex.test(email);
    }

    function mostrarError(id, text) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = text;
        el.classList.add('show');
    }


    
    function limpiarError(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('show');
    }

    function iniciarSaludo() {
        const greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;
        const name = localStorage.getItem('username');
        if (name && name.trim()) {
            greetingEl.textContent = 'Hola, ' + name;
        }
    }

    function iniciarFormulariosLogin() {
        const form = document.getElementById('loginForm');
        if (!form) return;

        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm') || document.getElementById('confirmPassword');

        if (!usernameInput || !emailInput || !passwordInput || !passwordConfirmInput) return;

        function validarConfirmacionContrasena() {
            const pwd = passwordInput.value.trim();
            const confirmPwd = passwordConfirmInput.value.trim();
            const errorId = passwordConfirmInput.id + '-error';
            const successId = passwordConfirmInput.id === 'confirmPassword' ? 'confirmPassword-success' : 'password-confirm-success';
            const errorEl = document.getElementById(errorId);
            const successEl = document.getElementById(successId);

            if (!confirmPwd) {
                if (errorEl) {
                    mostrarError(errorId, 'Debes repetir la contraseña');
                }
                passwordConfirmInput.classList.add('error');
                if (successEl) successEl.classList.remove('show');
                return false;
            }

            if (pwd !== confirmPwd) {
                if (errorEl) {
                    mostrarError(errorId, 'Las contraseñas no coinciden');
                }
                passwordConfirmInput.classList.remove('valid');
                passwordConfirmInput.classList.add('error');
                if (successEl) successEl.classList.remove('show');
                return false;
            }

            if (errorEl) errorEl.classList.remove('show');
            if (successEl) {
                successEl.textContent = '✓ Las contraseñas coinciden';
                successEl.classList.add('show');
            }
            passwordConfirmInput.classList.remove('error');
            passwordConfirmInput.classList.add('valid');
            return true;
        }

        emailInput.addEventListener('blur', function () {
            const email = this.value.trim();
            const errorEl = document.getElementById('email-error');
            const successEl = document.getElementById('email-success');

            if (!email) {
                mostrarError('email-error', 'El correo es requerido');
                if (successEl) successEl.classList.remove('show');
                this.classList.add('error');
                this.classList.remove('valid');
                return;
            }

            if (!validarEmail(email)) {
                mostrarError('email-error', 'Correo inválido. Usa formato: ejemplo@dominio.com');
                if (successEl) successEl.classList.remove('show');
                this.classList.add('error');
                this.classList.remove('valid');
                return;
            }

            limpiarError('email-error');
            if (successEl) {
                successEl.textContent = '✓ Correo válido';
                successEl.classList.add('show');
            }
            this.classList.remove('error');
            this.classList.add('valid');
        });

        emailInput.addEventListener('input', function () {
            if (this.value.trim() && validarEmail(this.value.trim())) {
                limpiarError('email-error');
                this.classList.remove('error');
            }
        });

        passwordConfirmInput.addEventListener('blur', validarConfirmacionContrasena);
        passwordConfirmInput.addEventListener('input', function () {
            if (this.value.trim() === passwordInput.value.trim() && this.value.trim()) {
                limpiarError(this.id + '-error');
                this.classList.remove('error');
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = passwordConfirmInput.value.trim();

            let isValid = true;

            if (!username) {
                mostrarError('username-error', 'El nombre es requerido');
                usernameInput.classList.add('error');
                isValid = false;
            } else {
                limpiarError('username-error');
                usernameInput.classList.remove('error');
            }

            if (!email) {
                mostrarError('email-error', 'El correo es requerido');
                emailInput.classList.add('error');
                isValid = false;
            } else if (!validarEmail(email)) {
                mostrarError('email-error', 'Correo inválido. Usa formato: ejemplo@dominio.com');
                emailInput.classList.add('error');
                isValid = false;
            } else {
                limpiarError('email-error');
                emailInput.classList.remove('error');
            }

            if (!password) {
                mostrarError('password-error', 'La contraseña es requerida');
                passwordInput.classList.add('error');
                isValid = false;
            } else {
                limpiarError('password-error');
                passwordInput.classList.remove('error');
            }

            if (!confirmPassword || !validarConfirmacionContrasena()) {
                isValid = false;
            }

            if (!isValid) return;

            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            window.location.href = 'espartano.html';
        });

        const savedUsername = localStorage.getItem('username');
        const savedEmail = localStorage.getItem('email');
        if (savedUsername) usernameInput.value = savedUsername;
        if (savedEmail) emailInput.value = savedEmail;
    }

    function iniciarFormularioContacto() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        function mostrarErrorContacto(id, text) {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = text;
            el.classList.add('show');
        }

        function limpiarErrorContacto(id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove('show');
        }

        emailInput.addEventListener('blur', function () {
            const email = this.value.trim();
            const errorEl = document.getElementById('email-error');
            const successEl = document.getElementById('email-success');

            if (!email) {
                mostrarErrorContacto('email-error', 'El correo es requerido');
                if (successEl) successEl.classList.remove('show');
                this.classList.remove('valid');
                this.classList.add('error');
                return;
            }

            if (!validarEmail(email)) {
                mostrarErrorContacto('email-error', 'Correo inválido. Usa formato: ejemplo@dominio.com');
                if (successEl) successEl.classList.remove('show');
                this.classList.remove('error');
                this.classList.remove('valid');
                return;
            }

            limpiarErrorContacto('email-error');
            if (successEl) {
                successEl.textContent = '✓ Correo válido';
                successEl.classList.add('show');
            }
            this.classList.remove('error');
            this.classList.add('valid');
        });

        emailInput.addEventListener('input', function () {
            if (this.value.trim() && validarEmail(this.value.trim())) {
                limpiarErrorContacto('email-error');
                this.classList.remove('error');
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let isValid = true;

            if (!username) {
                mostrarErrorContacto('username-error', 'El nombre es requerido');
                usernameInput.classList.add('error');
                isValid = false;
            } else {
                limpiarErrorContacto('username-error');
                usernameInput.classList.remove('error');
            }

            if (!email) {
                mostrarErrorContacto('email-error', 'El correo es requerido');
                emailInput.classList.add('error');
                isValid = false;
            } else if (!validarEmail(email)) {
                mostrarErrorContacto('email-error', 'Correo inválido. Usa formato: ejemplo@dominio.com');
                emailInput.classList.add('error');
                isValid = false;
            } else {
                limpiarErrorContacto('email-error');
                emailInput.classList.remove('error');
            }

            if (!message) {
                mostrarErrorContacto('message-error', 'El mensaje es requerido');
                messageInput.classList.add('error');
                isValid = false;
            } else {
                limpiarErrorContacto('message-error');
                messageInput.classList.remove('error');
            }

            if (!isValid) return;

            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            window.location.href = 'espartano.html';
        });
    }

    function iniciarCarrusel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const wrapper = carousel.querySelector('.carousel-slides');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        const indicators = Array.from(carousel.querySelectorAll('.carousel-indicators button'));
        let currentIndex = 0;
        let intervalId = null;

        function actualizarCarrusel(index) {
            wrapper.style.transform = `translateX(-${index * 100}%)`;
            indicators.forEach((button, i) => button.classList.toggle('active', i === index));
            currentIndex = index;
        }

        function irSiguiente() {
            actualizarCarrusel((currentIndex + 1) % slides.length);
        }

        function irAnterior() {
            actualizarCarrusel((currentIndex - 1 + slides.length) % slides.length);
        }

        function reiniciarTemporizador() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(irSiguiente, 2000);
        }

        if (prevButton) {
            prevButton.addEventListener('click', function () {
                irAnterior();
                reiniciarTemporizador();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function () {
                irSiguiente();
                reiniciarTemporizador();
            });
        }

        indicators.forEach((button, index) => {
            button.addEventListener('click', function () {
                actualizarCarrusel(index);
                reiniciarTemporizador();
            });
        });

        actualizarCarrusel(0);
        reiniciarTemporizador();
    }

    function iniciarNavegacionSuave() {
        const navLinks = document.querySelectorAll('nav a');
        if (!navLinks.length) return;

        navLinks.forEach(a => {
            a.addEventListener('click', function (e) {
                const id = this.getAttribute('href').slice(1);
                const el = document.getElementById(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', '#' + id);
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        iniciarSaludo();
        iniciarFormulariosLogin();
        iniciarFormularioContacto();
        iniciarCarrusel();
        iniciarNavegacionSuave();
    });
})();
