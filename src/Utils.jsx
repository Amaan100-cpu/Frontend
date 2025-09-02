import {toast} from "react-toastify"

const toastError=(msg,option)=>{
   toast.error(msg,{position:"top-right",...option})
}

const toastSuccess=(msg,option)=>{
    toast.success(msg,{position:"top-right",...option})
}

export {toastError,toastSuccess}