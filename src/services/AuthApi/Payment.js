import toast from "react-hot-toast";
import ApiConnector from "../ApiConnector";
import { studentEndpoints } from "../Api";
import rzpLogo from "../../assets/Images/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastID=toast.loading('Loading....');
    try {
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay script failed to load");
            return;
        }

        const orderResponse=await ApiConnector("POST",studentEndpoints.COURSE_PAYMENT_API,
                            {courses},
                            {
                                Authorization:`Bearer ${token}`
                            });
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        const options={
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"EDUArea",
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastID);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
        await ApiConnector("POST",studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderID:response.razorpay_order_id,
            paymentID:response.razorpay_payment_id,
            amount
        },{Authorization:`Bearer ${token}`})
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastID=toast.loading("Loading...");
    try {
        const response=await ApiConnector("POST",studentEndpoints.COURSE_VERIFY_API,bodyData,
        {Authorization:`Bearer ${token}`});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("payment successful, you are enrolled into the course");
        navigate('/dashboard/enrolled-course');
        dispatch(resetCart());

    }catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastID);
    dispatch(setPaymentLoading(false));
}