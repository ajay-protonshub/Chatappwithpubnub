 const Auth = {
    isAuthenticated: false,
    authenticate() {
    this.isAuthenticated = true;
    },
    signout() {
    this.isAuthenticated = false;
    },
    getAuth() {
        if(localStorage.getItem('user')){
            this.isAuthenticated=true;
        }
    return this.isAuthenticated;
    }
    };
    export default Auth;