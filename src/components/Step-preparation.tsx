import { FunctionComponent, MouseEventHandler } from "react";
import { RecettesIngredients } from "../models/RecetteIngredient";
import styles from '../css/ajout-recette-page.module.css';
import { Form } from "./forms/form-recette";
import { required } from "yargs";
import { FieldErrors } from "react-hook-form";

type Props = {
    register: any,
    name: string,
    form: Form,
    errors: FieldErrors
}

const StepPreparation: FunctionComponent<Props> = ({ form, errors, register, name, ...rest }) => {
    return (

        <div className="col-12 col-md-12 col-lg-12 ">
            <h3 className={` ms-4 custom-color-dore mt-2`}>Préparation</h3>
            <div className="form-floating mx-4" style={{ boxShadow: '1px 1px 1px rgba(131,197,190,0.9)' }}>
                <textarea {...register(name)} className={`form-control ${styles.textarea}`}
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    defaultValue={form.stepPreparation.value}
                >
                </textarea>
                <label htmlFor="floatingTextarea">Aller à la ligne pour chaque étape</label>
            </div>
            {<p className="text-danger ms-4">{errors.stepPreparation?.message?.toString()}</p>}
        </div>

    )
}

export default StepPreparation;
