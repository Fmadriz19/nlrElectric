import { NgClass, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { NlrservicesService } from '../../../services/nlrservices.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Factura_Producto, productoFactura, tipoFactura, userFactura } from '../../interfaces/registros';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ScrapingService } from '../../../services/scraping.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ToastModule, FloatLabelModule, DialogModule, ButtonModule, InputTextareaModule, FileUploadModule, CommonModule, DropdownModule, AutoCompleteModule, FloatLabelModule, InputTextModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss',
  providers: [MessageService]
})
export class FacturaComponent implements OnInit{
  @Output() servicioRegistered = new EventEmitter<void>();

  inforService = {
    name: '',
    descripcion: '',
    ejecucion: '',
    img: '',
  }

  errores = {
    name: '',
    descripcion: '',
    ejecucion: '',
    img: '',
  }

  campos_factura: boolean = false;
  pricebcv: string = '';
  total_sin_iva_VES: string = '';
  total_iva_VES: string = '';
  precioTotalFactura: number = 0;
  total_sin_iva_dolares: number = 0;
  total_iva_dolares: number = 0;

  // Autocomplete Usuario
  inforUser: userFactura[] = [];
  autocomplate_user: any[] = [];

  facturas_tipo: tipoFactura[] = [];
  selectFactura: tipoFactura | undefined;
  opcion_factura: string = '';

  personal_juridico: tipoFactura[] = [];
  estado_factura: tipoFactura[] = [];
  select_personal_juridico: tipoFactura[] | undefined;
  selectFactura_estado: tipoFactura[] | undefined;
  
  select_user: any = {};

  
  // Autocomplete Producto
  infor_Product: productoFactura[] = [];
  autocomplate_product: any[] = [];
  
  select_product: any = {};
  rows: any[] = []; // Filas dinámicas
  
  factura_General = {
    verificar: '',
    id_user: '',
    name_user: '',
    empresa: '',
    email: '',
    name_compras: '',
    model: '',
    price: '',
    cantidad: '',
    img: '',
    marca: '',
    descripcion: '',
    tipo: '',
    amperaje: '',
    ejecucion: '',
    informe: '',
    code_sku: '',
    envio: '',
    direccion: '',
    estado: '',
    fecha_realizar: '',
    fecha_compra: '',
    iva: '',
    total: '',
  }

  productos_registrar: Factura_Producto = {
    verificar: '',
    name_user: '',
    email: '',
    id_user: 0,
    empresa: 'personal',
    productos: [] as any[],

    informacion_servicio: [] as any[], // puede ir incluido en un array fecha_servicio, informe y ejecucion
    
    estado: '',
    fecha_compra: '',
    iva: '',
    total: '',
  };


  // Autocomplete Servicio



  personal_perfil: string = '';
  statusBtn: string = 'Registrar';
  uploadedFiles: any[] = [];

  // variables booleanas
  loading: boolean = true;
  peer_valid: boolean = false;
  mostrarModal: boolean = false;
  confirPasswordSVG: boolean = true;
  passwordPassSVG: boolean = true;
  passwordPass: boolean = false;
  confirPassword: boolean = false;
  visible: boolean = false;
  visibleINPUT: boolean = true;

  // Validaciones de inputs
  inputName: boolean = false;
  inputEjecucion: boolean = false;
  inputDescripcion: boolean = false;
  validado: boolean = true;

  constructor(private cookie: CookieService, private servicenlr: NlrservicesService, private router: Router, private message: MessageService, private tasa: ScrapingService) {
    this.statusBtn = 'Registrar';
  }

  ngOnInit(): void {
    this.facturas_tipo = [
      { name: 'Servicio', code: 'SO' },
      { name: 'Producto', code: 'PO' },
      { name: 'Propia', code: 'NLR' }
    ];

    this.personal_juridico = [
      { name: 'Personal', code: 'PL' },
      { name: 'Juridico', code: 'JO' }
    ];

    this.estado_factura = [
      { name: 'Entregado', code: 'EO' },
      { name: 'No Entregado', code: 'NO' }
    ];

    this.gerUsers();
    this.getProducts();
  }

  // Extraer datos de las cookie
  getCookie(){
    this.cookie.get('id_personal');
  }

  // modal
  viewModal(){
    console.log('se presiono');
    
    this.mostrarModal = !this.mostrarModal;
  }

  validarCampos(){

    if((this.productos_registrar.verificar !== "") && (this.productos_registrar.name_user !== "") && (this.productos_registrar.email !== "") && (this.productos_registrar.id_user !== 0) && (this.productos_registrar.empresa !== "") && (this.productos_registrar.estado !== "") && (this.productos_registrar.fecha_compra !== "") && (this.productos_registrar.iva !== "") && (this.productos_registrar.total !== "")){
      this.validado = false;
      console.log('valido');
      
    } else {
      
      this.validado = true;
      console.log('no valido');
    }
  }

  validationEjecucion($event: KeyboardEvent){
    const valor = this.inforService.ejecucion.trim();
    const char = String.fromCharCode($event.charCode); // Obtener el carácter ingresado
    const regex = /^\d{0,2}(,\d{0,1})?$/;
    const newValue = valor + char;

    
    if (valor === '' && char === ',') {
      $event.preventDefault();
      return;
    }
    
    if (!regex.test(newValue)) {
      $event.preventDefault(); // Evitar que se ingrese el carácter
    }
  }
  
  focusEjecucion(){
    const valor = this.inforService.ejecucion.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.ejecucion = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputEjecucion = false;
      this.validarCampos();
      return;
    }
    else{
      this.errores.ejecucion = ''    
      this.inputEjecucion = true;      
      this.validarCampos();
    }
  }
  
  focusName(){
    const valor = this.inforService.name.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.name = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputName = false;
      this.validarCampos();       
      return;
    }
    else{
      this.errores.name = ''    
      this.inputName = true;
      this.validarCampos();     
    }
  }

  verificarLongitud(){
    const valor = this.inforService.descripcion.trim();
    if (valor === '') {
      console.log('vacio');
      this.errores.descripcion = 'El campo no puede quedar vacio, Ingrese un valor valido.' 
      this.inputDescripcion = false;
      this.validarCampos();             
      return;
    }
    else{
      this.errores.descripcion = ''    
      this.inputDescripcion = true;
      this.validarCampos();        
    }
  }

  onChangeFactura(event: any){
    const evento = event.value.code;
    const fecha = new Date();
    const año = fecha.getFullYear().toString();
    const mes = fecha.getMonth().toString();
    const dia = fecha.getDate().toString();
    const fecha_completa = año + '-' + mes + '-' + dia;

    this.productos_registrar.fecha_compra = fecha_completa;

    if (evento === 'SO') {
      this.campos_factura = false;
      this.opcion_factura = event.value.code;
      this.productos_registrar.verificar = event.value.name;
      return ;
    }
    this.campos_factura = true;
    this.opcion_factura = event.value.code;
    this.productos_registrar.verificar = event.value.name;

  }

  // Extraer todos los usuarios para el autocomplete
  gerUsers(){
    this.servicenlr.indexUsers().subscribe({
      next: (data: any) => {
        this.inforUser = data;
      },
      error: (err: any) => {
        console.error(err.error.message);
      }
    })
  }

  searchUser(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query.toLowerCase();
    
    if (Array.isArray(this.inforUser)) {
      filtered = this.inforUser
        .filter(user => user.user && user.user.toLowerCase().startsWith(query))
        .map(user => user.user); // Solo devuelves nombres
    }
    
    this.autocomplate_user = filtered; // Asegúrate de que el tipo coincide
  }

  onUserSelected($event: any){
    const evento = $event.value;
    this.select_user = this.inforUser.find(user => user.user === evento);

    this.productos_registrar.name_user = this.select_user.name;
    this.productos_registrar.id_user = this.select_user.id;
    this.productos_registrar.email = this.select_user.email;

  }

  onChangeEmpresa(event: any){
    this.productos_registrar.empresa = event.value.name;    
  }

  onChangeFacturaEstado(event: any){
    this.productos_registrar.estado = event.value.name;
    this.validarCampos();
  }

  // extraer todos los productos
  getProducts(){
    this.servicenlr.indexProducts().subscribe({
      next: (data: any) => {
        this.infor_Product = data;
      },
      error: (err: any) => {
        console.error(err.error.message);
      }
    })
  }

  // Autocompletar productos
  searchProduct(event: any, rowIndex: number) {
    const query = event.query.toLowerCase();
    this.autocomplate_product = this.infor_Product.filter(product => {
      const isNotSelected = !this.rows.some(row => row.product?.id === product.id);
      return isNotSelected && product.name.toLowerCase().includes(query);
    });
  }

  // Al seleccionar un producto
  onProductSelected(product: any, rowIndex: number) {
    const row = this.rows[rowIndex];
    row.id = product.value.id;
    row.product = product.value.name;
    row.price = product.value.price;
    row.maxQuantity = product.value.stock; 
  }

  // Añadir fila nueva
  addRow() {
    this.rows.push({ id: 0, product: null, price: 0, quantity: '', total: 0, maxQuantity: 0 });
  }

  // Eliminar fila
  removeRow(index: number) {
    this.rows.splice(index, 1);
  }

  calculateTotal(precio: number, cantidad: number, rowIndex: number) {
    const row = this.rows[rowIndex];

    // Verificar si la cantidad supera el stock
    if (cantidad > row.maxQuantity) {
      row.quantity = row.maxQuantity; // Ajustar al máximo permitido
      alert(`La cantidad ingresada excede el stock disponible (${row.maxQuantity}). Se ajustará automáticamente.`);
      cantidad = row.maxQuantity; // Usar el stock como cantidad válida
    }
    const total = precio * cantidad;
    row.total = new Intl.NumberFormat('es-UD', { style: 'currency', currency: 'USD' }).format(total);
    this.totalFactura();
  }

  totalFactura() {
    const total = this.rows.reduce((acc, row) => acc + (row.price * row.quantity), 0);
    this.total_sin_iva_dolares = total;
    this.total_iva_dolares = total * 0.16;
    this.precioTotalFactura = total * 1.16;

    this.total_sin_iva_VES = this.total_sin_iva_dolares.toString();
    this.total_iva_VES = this.total_iva_dolares.toString();

    this.productos_registrar.iva = this.total_iva_dolares.toString();
    this.productos_registrar.total = this.precioTotalFactura.toString();
    this.conversionTasa();
  }

  async conversionTasa(){
    this.pricebcv = await this.tasa.conversion(this.precioTotalFactura); 
  }

  getTasa(){
    this.tasa.getTasa().subscribe({
      next: (res: any) => {
        this.conversionTasa();

      },
      error: (err: any) =>{
        console.error(err.error.message);
        
      }
    });
  }

  formatPriceVES(price: string): string{
    return new Intl.NumberFormat('es-VE', {style: 'currency', currency: 'VES'}).format(Number(price));
  }

  formatPriceUS(price: number): string{
    return new Intl.NumberFormat('es-UD', {style: 'currency', currency: 'USD'}).format(Number(price));
  }


  // Subir archivo

  // redireccionar
  redireccionar(){
    this.visible = !this.visible;
    this.router.navigateByUrl('home');
  }

  eliminarCampo(){
    this.visibleINPUT = true;
  }

  // registrar factura
  registre(){

      this.productos_registrar.productos = this.rows; 
      
      this.servicenlr.registreFactura(this.productos_registrar as unknown as Factura_Producto).subscribe({
        next: (data: any) => {
          this.servicioRegistered.emit();
          this.message.add({ severity: 'success', summary: 'Registro Exitoso', detail: 'El registro se ha realizado con éxito' });
          this.productos_registrar = {
            verificar: '',
            name_user: '',
            email: '',
            id_user: 0,
            empresa: 'personal',
            productos: [] as any[],
        
            informacion_servicio: [] as any[], // puede ir incluido en un array fecha_servicio, informe y ejecucion
            
            estado: '',
            fecha_compra: '',
            iva: '',
            total: '',
          };
          this.rows = [];
          this.total_sin_iva_dolares = 0;
          this.total_iva_dolares = 0;
          this.precioTotalFactura = 0;
          this.total_sin_iva_VES = '';
          this.total_iva_VES = '';
          this.pricebcv = '';
          this.validado = true;
          this.getProducts();

        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      })

  }

  error(){
    this.message.add({ severity: 'warn', summary: 'Error de Solicitud', detail: 'Verificar que todos los campos cumpla lo requerido' });
  }
}
