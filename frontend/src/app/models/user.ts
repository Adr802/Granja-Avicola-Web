export class User {
    cedula:String;
    name: String;
    phone: String;
    role: String;
    email: String;
    pass: String
    constructor(cedula ='', name='',phone='',email='',pass='',rol=''){
        this.cedula = cedula;
        this.name = name;
        this.phone = phone;
        this.role = rol;
        this.email = email;
        this.pass = pass;
    }
}
