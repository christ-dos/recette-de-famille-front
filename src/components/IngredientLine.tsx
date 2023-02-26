
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, FunctionComponent, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import { FieldErrors } from "react-hook-form";
import { Ingredient } from "../models/Ingredient";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";
import { Form } from "./forms/form-recette";

type Props = {
    click?: MouseEventHandler,
    register: any,
    index: number,
    errors: FieldErrors,
    setError: any,
    clearErrors: any,
    searchTerm: string,
    allIngredients: Ingredient[],
    defaultValues: RecettesIngredients[],
    form: Form,
    handleSearchTerm(e: ChangeEvent<HTMLInputElement>): any
}

const IngredientLine: FunctionComponent<Props> = ({
    errors, searchTerm, handleSearchTerm, click,
    register, defaultValues, index, allIngredients,
    setError, clearErrors, form, ...rest }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.getAttribute('name');
        for (const field of defaultValues) {
            if (e.target.value === field.ingredient.name) {
                setError(inputName, { type: "custom", message: "Cette ingrédient existe déjà" }, { shouldFocus: true })
            } else if (e.target.value === "") {
                clearErrors(inputName);
            }
        }
        return handleSearchTerm;
    }

    return (

        <>
            <div key={index} className=" d-flex flex-row justify-content-between mb-1 mt-3">
                <div className="me-2 w-25" hidden>
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.id` as const)}
                        className="form-control"
                        key={defaultValues[index].ingredient.id}
                    />
                </div>

                <div className="me-2">
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.name` as const)}
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                        key={defaultValues[index].ingredient.name}
                        onFocus={(e) => e.target.value = ""}
                        list="ingredientUpdate"
                    />
                    {/* liste qui propose des ingredients*/}
                    <datalist id="ingredientUpdate">
                        {allIngredients
                            .filter(ingredient => ingredient.name.includes(searchTerm))
                            .map(ingredient =>
                                <option
                                    value={ingredient.name}
                                    key={ingredient.id}
                                />
                            )}

                    </datalist>
                    <ErrorMessage className={'text-danger mt-1 ms-1'} name={`recettesIngredients.${index}.ingredient.name`} errors={errors} as="p" />

                </div>

                <div className="w-25">
                    <input type="number"
                        {...register(`recettesIngredients.${index}.quantite` as const)}
                        step={1}
                        min={0}
                        className="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        key={defaultValues[index].quantite}
                        onFocus={(e) => e.target.value = ""}
                    />
                    <ErrorMessage className={'text-danger mt-1 ms-2'} name={`recettesIngredients.${index}.quantite`} errors={errors} as="p" />
                </div>
                <div className="w-50 me-3">
                    <select
                        {...register(`recettesIngredients.${index}.uniteMesure` as const)}
                        className="form-select form-select ms-2"
                        aria-label=".form-select example"
                        id="uniteMesure"
                        key={defaultValues[index].uniteMesure}
                        defaultValue={""}
                        name={`recettesIngredients.${index}.uniteMesure`}
                    >
                        <option key={""} disabled>Mesure</option>
                        {Object.keys(UniteMesureEnum)
                            .filter(key => isNaN(Number(key)))
                            .filter(key => key !== "map")
                            .map(key => <option key={key} defaultValue={key.toLowerCase()}>{key}

                            </option>)}
                    </select>
                    <ErrorMessage className={'text-danger mt-1 ms-3'} name={`recettesIngredients.${index}.uniteMesure`} errors={errors} as="p" />
                </div>
                <div>
                    <Button className="mb-3 ms-1"
                        variant="danger"
                        type={"button"}
                        onClick={click}
                        id="deleteIngredient"
                    >
                        X
                    </Button>
                </div>
            </div>
        </>
    )

}

export default IngredientLine;



