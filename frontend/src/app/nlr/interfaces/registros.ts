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
    id: string | null;
}

export interface Products{
    id: number;
    name: string;
    category: string;
    price: Float32Array;
    stock: number;
    state: string;
}