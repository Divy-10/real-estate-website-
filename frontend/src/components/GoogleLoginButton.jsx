import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { googleLoginUser } from "../services/authService";


function GoogleLoginButton() {

    const { login } = useAuth();



    const handleSuccess = async (response) => {


        try {


            const googleUser = jwtDecode(response.credential);



            const result = await googleLoginUser({

                name: googleUser.name,

                email: googleUser.email,

                googleId: googleUser.sub,

                image: googleUser.picture

            });



            login(
                result.user,
                result.token
            );



            window.location.href = "/";


        }
        catch (error) {

            console.log(error);

        }



    };



    return (

        <GoogleLogin

            onSuccess={handleSuccess}

            onError={() => console.log("Google Login Failed")}

        />

    )


}


export default GoogleLoginButton;