export class User {
    _id : String;
    cedula:String;
    name: String;
    phone: String;
    role: String;
    email: String;
    pass: String
    constructor(_id='',cedula ='', name='',phone='',email='',pass='',rol=''){
        this._id = _id;
        this.cedula = cedula;
        this.name = name;
        this.phone = phone;
        this.role = rol;
        this.email = email;
        this.pass = pass;
    }
}
