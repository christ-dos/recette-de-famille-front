import { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";
import { Recette } from "../../models/recette";
import { Form } from "./form-recette";

type Props = {
    register: any,
    name?: string,
    form?: Form,
    errors: any,
    className?: string,
    id: string,
    valeur?: string,
    type: string,
    placeHolder?: string,
    label?: string,
    defaultValue?: any,
    array?: { label: string, value: string }[]
}

/********************** Les constante pour remplir les Selects *****************************/
export const difficultyOptions = [
    { label: "Difficultés", value: "none" },
    { label: "Facile", value: "facile" },
    { label: "Intermédaire", value: "intermediaire" },
    { label: "Difficile", value: "difficile" }
]


export const categoriesOptions = [
    { label: "Catégories", value: "none" },
    { label: "Plats", value: "1" },
    { label: "Entrées", value: "2" },
    { label: "Desserts", value: "3" },
    { label: "Apéritfs", value: "4" }
]

/********************** Composant Input Select *****************************/
export const InputSelect: FunctionComponent<Props> = ({ array, form,
    errors, register, name, className, id, defaultValue, ...rest }) => {

    return (
        <>
            <select {...register(name)} className={className}
                id={id}
                defaultValue={defaultValue}
            >
                {array?.map(element => (
                    <option key={element.value} value={element.value}>{element.label}</option>
                ))}
            </select>
            {<p className="text-danger">{errors}</p>}

        </>

    )
}


/****************** Composant Form Group Input************************/
type AttributsInputProps = {
    id?: string,
    nom?: string,
    valeur?: string,
    type: string,
    placeHolder?: string,
    label?: string,
    errors?: string
}
export const FormGroupInput: FunctionComponent<Props> = ({ id, name, valeur, type, placeHolder, label, errors }) => {

    return (
        <div className="form-group row ">
            <label htmlFor={id} className="col-md-2 col-lg-3 col-form-label form-control-label">{label}</label>
            <div className="col-lg-9 py-1">
                <input id={id} name={name} className="form-control " style={{ width: '100%' }} type={type} value={valeur} placeholder={placeHolder} />
                <p className="m-1 text-danger">{errors}</p>
            </div>
        </div>
    );
}

/****************** Composant Form Group Input************************/



