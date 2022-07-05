import {Notyf} from 'notyf';

export enum SccMsg{
    LOGIN_APPROVED = "Welcome!",
    COMPANY_ADD = "Company added successfully",
    CUSTOMER_ADD = "Customer added sucsefully",
    COMPANY_DELETE = "Company deleted sucsefully",
    CUSTOMER_DELETE = "Customer deleted sucsefully",
    COMPANY_UPDATE = "Company updated sucsefully",
    CUSTOMER_UPDATE = "Customer updated sucsefully",

}


export enum ErrMsg {
    LOGIN_ERR = "Wrong user name or password",
    COMPANY_EXISTS = "There is aldeady a company with same name or email",
    COMPANY_MAIL_EXIST = "There is aldeady a company with same email",
    CUSTOMER_EXISTS = "There is aldeady a customer with same email",
    ID_NOT_FOUND = "The ID you requested was not found",
    CATEGORY_NOT_FOUND = "The category you requested was not found",
    NO_LOGIN = "You must log in first",
    LOGIN_AS_ADMIN = "You must log in as administrator",
}

class Notify{
    private notification = new Notyf({duration:5000,position:{x:"center",y:"top"}});
    
    public success(message:string){
        this.notification.success(message);
    }

    public error(err:any){
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err:any):string{
        if (typeof err == 'string'){
            return err;
        };
        if (typeof err?.response?.data === 'string'){ //backend exact error
            return err.response.data;
        }
        if (Array.isArray(err?.response?.data)){ //backend exact error
            return err?.response?.data[0];
            //must return all errors
        }
        //must be last
        if (typeof err?.message == 'string'){
            return err?.message;
        }

        return "Huston we have a problem !!!";
    }
}

const msgNotify = new Notify();
export default msgNotify;