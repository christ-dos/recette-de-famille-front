import { yupResolver } from "@hookform/resolvers/yup";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { BoutonClassique } from "./Bouton";
import { FormGroupInput } from "./forms/InputsForm";
import Schema from "../components/forms/Schema-yup";




type UserProps = {
    user: {
        id: number,
        nom: string
        prenom: string,
        email: string,
        password: string,
        confirmPassword: string
    }
};

const ProfileCard: FunctionComponent<UserProps> = ({ user }) => {

    const { register, handleSubmit, formState: { errors }, formState } = useForm<any>({
        mode: 'onChange',
        resolver: yupResolver(Schema)
    });

    return (

        <section className="container py-5">
            <div className="col-12 col-md-8 col-lg-8 offset-md-2 pt-4">
                {/* <!-- form user info --> */}
                <div className="card  border border-dark border-2 custom-bg-vert custom-shadow-card py-3" >
                    <div className="card-body">
                        <h3 className="mb-0 text-center"
                            style={{
                                fontFamily: 'Shintia Script',
                                fontSize: '250%'
                            }}>
                            Profile Utilisateur
                        </h3>
                        <form className="form p-2"
                            action="#"
                            role="form"
                            autoComplete="off"
                            method=""
                        >
                            <p className="alert alert-secondary bold my-2 fs-6">
                                message alert confirmation enregistrement
                            </p>
                            {/*<!--***************************** Nom **********************************->*/}
                            <FormGroupInput
                                type={"text"}
                                name={"nom"}
                                id={"nom"}
                                valeur={user.nom}
                                placeHolder={"Doe"}
                                label={"Nom"}
                                register={register}
                                defaultValue={undefined}
                                errors={errors.nom?.message?.toString} />

                            { /*<!--***************************** Prenom **********************************-->*/}
                            <FormGroupInput
                                type={"text"}
                                name={"prenom"}
                                id={"prenom"}
                                valeur={user.prenom}
                                placeHolder={"Jane"}
                                label={"Prénom"}
                                register={register}
                                defaultValue={undefined}
                                errors={undefined} />

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
                                name={"password"}
                                id={"password"}
                                valeur={user.password}
                                placeHolder={"123456"}
                                label={"Mot de Passe"}
                                register={register}
                                errors={undefined} />

                            { /* <!--***************************** ConfirmPassword **********************************-->*/}
                            <FormGroupInput
                                type={"password"}
                                name={"confirmPassword"}
                                id={"confirmPassword"}
                                valeur={user.confirmPassword}
                                placeHolder={"123456"}
                                label={"Confirme"}
                                register={register}
                                errors={undefined} />

                            { /*  <!--***************************** Button save Changes **********************************-->*/}
                            <div className="row col-12 col-md-6 col-lg-3 my-4 mx-auto">
                                <BoutonClassique value={"Enregistrer"} id={"btnEnreg"} type={"submit"} name="btnEnreg" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default ProfileCard;