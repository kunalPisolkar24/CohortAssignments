interface User {
    firstname: string;
    lastname: string;
    email: string;
    age: number;
}

function isLegal(user: User) {
    if(user.age > 18) return true;
    return false;
}