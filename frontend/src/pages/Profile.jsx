import { useAuth } from "../context/AuthContext";


function Profile() {


    const { user } = useAuth();



    return (

        <div className="container py-5">


            <div className="card p-5 shadow">


                <h2>
                    My Profile
                </h2>


                <img

                    src={user.image || "/default.png"}

                    width="100"

                />


                <h4>
                    {user.name}
                </h4>


                <p>
                    {user.email}
                </p>


            </div>


        </div>


    )


}


export default Profile;