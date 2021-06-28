import Vue from 'vue'
import axios from 'axios'

/*  Helper functions   */
const options = apiName => {
    return {
        timeout: 30000,
        withCredentials: true,
        baseURL: process.env.BASE_API + process.env[`${apiName.toUpperCase()}_API_PATH`]
    }
}
const server = server => {
    return {
        timeout: 30000,
        baseURL: process.env[server.toUpperCase()],
        withCredentials: false,
        params: {
            validateStatus: true
        }
    }
}

/*  Config Options   */
const authOptions = options("auth")

const fileserverOptions = server("file")

/*  Interceptors && Handlers   */
const authInterceptor = config => {
    config.headers["x-api-key"] = `${process.env.AUTH_API_SERVICE}-${process.env.API_KEY}`
    return config
}

const errorInterceptor = error => Promise.reject( error )
const bypass = response => response

const errorHandler = error => {
    if(error.response.status == 403){

        Vue.prototype.$sentry.captureException( new Error(error.response.data) )
        Vue.prototype.$swal("Error al procesar solicitud", "API Key inválida o sesión inválida", "error")

        return Promise.reject(false)

    }else if(error.response.status == 400){

        Vue.prototype.$sentry.captureException( new Error(error.response.data) )
        Vue.prototype.$swal("Error al procesar solicitud", "Solicitud inválida", "error")

        return Promise.reject(error)
        
    }else if(error.response.status == 500){

        Vue.prototype.$sentry.captureException( new Error(error.response.data) )
        Vue.prototype.$swal("Error inesperado", "Por favor vuelve a intentarlo, si el problema persiste, por favor envíanos un correo a soporte@", "error")
        
        return Promise.reject(error)
        
    }else
        return Promise.reject(error)
}

const fileserverErrorHandler = error => {
    if(error.response.status == 403){

        Vue.prototype.$sentry.captureException( new Error(error.response.data) )
        Vue.prototype.$swal("Acceso denegado", "No estás autorizado para realizar esta acción.", "error")

        return Promise.reject(false)
    }else
        return Promise.reject(error)
}

/*  APIs Creation   */
const auth          = axios.create( authOptions )
const fileserver    = axios.create( fileserverOptions )

auth.interceptors.request.use(authInterceptor, errorInterceptor)
auth.interceptors.response.use(bypass, errorHandler)

Vue.prototype.$auth         = auth
Vue.prototype.fileserver    = fileserver

export default {}