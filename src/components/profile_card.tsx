import { FunctionComponent } from "react";
import { BoutonClassique } from "./Bouton";
import { FormGroupInput } from "./children";




type UserProps = {
    user: {
        id: 1,
        nom: 'Machin',
        prenom: 'Bidule',
        email: 'b.machin@email.fr',
        password: '123456',
        confirmPassword: '123456'
    }
};

const ProfileCard: FunctionComponent<UserProps> = ({ user }) => {

    return (

        <section className="container py-5">
            <div className="col-12 col-md-8 col-lg-8 offset-md-2 pt-4">
                {/* <!-- form user info --> */}
                <div className="card  border border-dark border-2 custom-bg-vert custom-shadow-card py-3" >
                    <div className="card-body">
                        <h3 className="mb-0 text-center">Profile Utilisateur</h3>
                        <form className="form p-2" 
                            action="#" 
                            role="form"
                            autoComplete="off" 
                            method="post"
                        >
                            <p className="alert alert-secondary bold my-2 fs-6">
                                message alert confirmation enregistrement
                            </p>
                            {/*<!--***************************** Nom **********************************->*/}
                            <FormGroupInput
                                type={"text"}
                                nom={"nom"}
                                id={"nom"}
                                valeur={user.nom}
                                placeHolder={"Doe"}
                                label={"Nom"}
                            />

                            { /*<!--***************************** Prenom **********************************-->*/}
                            <FormGroupInput
                                type={"text"}
                                nom={"prenom"}
                                id={"prenom"}
                                valeur={user.prenom}
                                placeHolder={"Jane"}
                                label={"Prénom"}
                            />

                            { /* <!--***************************** Email **********************************-->*/}
                            <div className="form-group row">
                                <label htmlFor={"email"} className="col-lg-3 col-form-label form-control-label">Identifiant</label>
                                <div className="col-lg-9 py-1">
                                    <p id={'email'}>{user.email}</p>
                                </div>
                            </div>

                            { /* <!--***************************** Password *********************************-->*/}
                            <FormGroupInput
                                type={"password"}
                                nom={"password"}
                                id={"password"}
                                valeur={user.password}
                                placeHolder={"123456"}
                                label={"Mot de Passe"}
                            />

                            { /* <!--***************************** ConfirmPassword **********************************-->*/}
                            <FormGroupInput
                                type={"password"}
                                nom={"confirmPassword"}
                                id={"confirmPassword"}
                                valeur={user.confirmPassword}
                                placeHolder={"123456"}
                                label={"Confirme"}
                            />

                            { /*  <!--***************************** Button save Changes **********************************-->*/}
                            <div className="row col-12 col-md-6 col-lg-3 my-4 mx-auto">
                                <BoutonClassique value={"Enregistrer"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default ProfileCard;