import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';

@customElement('login-page')
export class LoginPage extends LitElement {
  pageController = new PageController(this);

//   protected createRenderRoot(): HTMLElement | DocumentFragment {
//     return this;
//   }

  @state()
  private isLoggedIn = false;

  connectedCallback() {
    super.connectedCallback();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password')
    this.isLoggedIn = !!username && !!password;
  }

  login() {
    const usernameInput = this.shadowRoot?.getElementById('username') as HTMLInputElement | null; //¿Por qué ShadowRoot?
    const passwordInput = this.shadowRoot?.getElementById('password') as HTMLInputElement | null;

    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username.length > 3 && password.length > 8) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Registration successful! Please login.');
        window.location.href = '/login';
      } else {
        alert('Username must be longer than 3 characters and password must be longer than 8 characters.');
      }
    } else {
      alert('Please enter username and password.');
    }
  }


  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.isLoggedIn = false;
  }


  render() {
    return html`
        <div id="login-div">
            ${this.isLoggedIn ? html` 
                <p> Estás Loggeado </p> 
                <button @click=${this.logout}> Logout </button>
            ` : html` 
            <div class="form login">
                <label for="username"> NOMBRE DE USUARIO </label>
                <input type="text" id="username" placeholder="Ingrese su nombre de usuario">
            </div>
            <div class="form login">
                <label for="password"> CONTRASEÑA </label>
                <input type="password" id="password" placeholder="Ingrese su contraseña">      
            </div>
            <button @click=${this.login}> Login </button>
            
        `}
    </div>
    <button @click="${() => this.pageController.navigate('home')}">Go to home page</button>
`;
}
}
