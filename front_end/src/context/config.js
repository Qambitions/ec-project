class UserConfig{
    constructor(username,roles){
        this.username = username;
        this.roles = roles;
    }
    getUsername(){
        return this.username;
    }

    getRoles(){
        return this.roles;
    }
}

export {UserConfig}