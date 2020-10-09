const URL_ROOT = 'http://localhost:8000/api'
const URL_ROOT_AUTH = 'http://localhost:8000'
const URL_SERVICIOS = {
    usuarios: URL_ROOT+'/usuarios/',
    //login : URL_ROOT +'auth/',
    cargarTiendas:  URL_ROOT_AUTH+'/tiendas/',
    obtenerPromedioVentasByTienda:  URL_ROOT_AUTH+'/promedio_ventas_tienda/',
    

    consultarUserById:URL_ROOT+'/registrarUsuario/?id=',
    login: URL_ROOT_AUTH + '/api-token-auth/',
    refreshlogin: URL_ROOT_AUTH +'/api-token-refresh/',
    categoriasServicios: URL_ROOT + '/categoriaGeneral/',
    servicio: URL_ROOT + '/servicio/',
    loadImgFile: URL_ROOT + 'loadImgService',
    servicioByPrecio: URL_ROOT + '/servicio?ordering=precio',
    servicioByCategoria: URL_ROOT + '/servicio?idSubCategoria__idCategoriaGeneral__nombreCategoria=',
    servicioByCiudad: URL_ROOT + '/servicio?idEmprendimiento__ciudad=',
    emprendimiento: URL_ROOT + '/emprendimiento/',
    validarEmprendimiento: URL_ROOT + '/emprendimiento?idEmprendedor__id=',
    fechas: URL_ROOT + '/fechaAtencion',
    horario: URL_ROOT + '/horarioAtencion',
    servicioBysubcategorias: URL_ROOT +'/servicio?idSubCategoria__nombreSubCat=',
    subcategorias: URL_ROOT +'/subcategoria',
    detalleServicio: URL_ROOT + '/detalleServicio/',
    certificaciones: URL_ROOT + '/certificaciones'
}
export default URL_SERVICIOS