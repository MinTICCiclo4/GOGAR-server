import {Schema,model} from 'mongoose'
import { Enum_Rol, Enum_estadoUsuario } from './enums';

interface User{
    correo:string;
    identificacion:string;
    nombre:string;
    apellido:string;
    rol:Enum_Rol;
    estado:Enum_estadoUsuario
}

//De esta forma garantizamos que todos los tipos que esten dentro del schema de usuarios cumplan con los tipos de datos requeridos

const userSchema = new Schema<User>({
    correo:{ 
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: (email)=>{
                if(email.includes("@") && email.includes(".")) return true
                else return false
            },
            message:"El correo ingresado es invalido"
        },
    },
    identificacion:{
        type:String,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        enum:Enum_Rol
    },
    estado:{
        type:String,
        enum:Enum_estadoUsuario,
        default:Enum_estadoUsuario.pendiente
    }
})

//Como tercer parametro podemos agregarle el nombre de la colección donde queremos que se creen o se editen nuestros usuarios
export const UserModel = model("User",userSchema)

