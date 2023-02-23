import { ErrorMessage } from "@hookform/error-message";
import { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";
import styles from '../css/ajout-recette-page.module.css';
import { Form } from "./forms/form-recette";

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
            <div
                className="form-floating mx-4"
                style={{ boxShadow: '1px 1px 1px rgba(131,197,190,0.9)' }}
            >
                <textarea {...register(name)}
                    className={`form-control ${styles.textarea}`}
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    name={name}
                >
                </textarea>
                <label htmlFor={'floatingTextarea'}>Aller à la ligne pour chaque étape</label>
            </div>
            <ErrorMessage className={'text-danger ms-4 mt-1'} name={name} errors={errors} as="p" />

        </div>

    )
}

export default StepPreparation;
