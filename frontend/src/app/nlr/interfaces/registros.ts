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

export interface Marcas{
    name: String;
    cantidad: number;
}

export interface ApiResponse {
    change: number;
    color: string;
    image: string;
    last_update: string;
    percent: number;
    price: number; 
    price_old: number;
    symbol: string;
    title: string;
}

export interface searchProduct{
    message:string;
}

export interface explorarProducts{
    title: string;
    price: string;
    type: string;
    image: string;
    url: string;
}

export interface ServiciosGeneral{
    id: number;
    name: string;
    descripcion: string;
    ejecucion: string;
    img: string;
    showFullDescription: boolean;
}

export interface searchService{
    id: number
}

export interface Servicios {
    name: string;
    descripcion: string;
    ejecucion: string;
    img: string;
}

export interface addToProduct {
    id: string,
    name: string,
    img: string,
    price: string
}

export interface tipoFactura {
    name: string;
    code: string;
}

export interface userFactura{
    id: number;
    name: string;
    user: string;
    email: string;
}

export interface productoFactura{
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
    code_sku: boolean;
}

export interface Producto {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
  
export interface Factura_Producto {
    name_user: string;
    email: string;
    empresa: string;
    verificar: string;
    id_user: number;
    productos: Producto[];
    informacion_servicio: Servicio_Producto[];
    estado: string;
    fecha_compra: string;
    iva: string;
    total: string;
}

export interface Servicio_Producto {
    informe: string;
    fecha_servicio: string;
    horas_servicio: string;
}

export interface colaboradores {
    url: string;
    name: string;
    rol: string;
    ig: string;
    gm: string;
}

export interface Servicios_view {
    id: number;
    name: string;
    descripcion: string;
    ejecucion: string;
    img: string;
}
