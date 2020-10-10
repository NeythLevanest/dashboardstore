const URL_ROOT = 'http://localhost:8000/api'
const URL_ROOT_AUTH = 'http://localhost:8000'
const URL_SERVICIOS = {
    usuarios: URL_ROOT+'/usuarios/',
    //login : URL_ROOT +'auth/',
    cargarTiendas:  URL_ROOT_AUTH+'/tiendas/',
    cargarVentasByStore:URL_ROOT_AUTH+'/total_ventas_tiendas/',
    obtenerPromedioVentasByTienda:  URL_ROOT_AUTH+'/promedio_ventas_tienda/',
    obtenerMarkdownComparation:  URL_ROOT_AUTH+'/obtener_markdowns/', 
   
}
export default URL_SERVICIOS