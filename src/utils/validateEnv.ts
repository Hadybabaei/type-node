import { cleanEnv,str,port } from "envalid";

function validateEnv():void{
    cleanEnv(process.env,{
        PORT:port({default:5001}),
        MONGODB_URL:str()
    })
}

export default validateEnv;