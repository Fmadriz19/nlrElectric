export interface Users{
    id: number;
    name: string;
    last_name: string | null;
    email: string;
    password: string;
    user: string;
    phone: number | null;
    address: string | null;
    image: string | null;
    rol: string;
    segurity_code: string | null;
}

export interface Userregistro{
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    user: string,
    rol: string,
}

export interface loginRequest{
    email: string,
    password: string
}

export interface resetPassword{
    email: string;
}

export interface searchUser{
    id: string;
}

export interface passwordReset{
    email: string;
    password: string;
    password_confirmation: string;
}

export interface cookielogin {
    token: string;
    id: string;
    rol: string;
}
export interface Products{
    name: string;
    estado: string;
    price: number;
    stock: number;
    img: string;
    descripcion: string;
    marca: string;
    proveedor: string;
    tipo: string;
    model: string;
    amperaje: string;
    voltaje: string;
}
export interface ProductsGeneral{
    id: number;
    name: string;
    estado: string;
    price: number;
    stock: number;
    img: string;
    descripcion: string;
    marca: string;
    proveedor: string;
    tipo: string;
    model: string;
    amperaje: string;
    voltaje: string;
    showFullDescription: boolean;
}