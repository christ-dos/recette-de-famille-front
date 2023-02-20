
import { useEffect } from "react";
import { ChangeEvent, FunctionComponent, MouseEventHandler, useState } from "react";
import { Button } from "react-bootstrap";
import { FieldErrors, useForm } from "react-hook-form";
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";

type Props = {
    click?: MouseEventHandler,
    register: any,
    setValue: any,
    index: number,
    errors: FieldErrors,
    searchTerm: string,
    allIngredients: Ingredient[],
    isClicked: boolean,
    defaultValues: Recette,
    handleSearchTerm(e: ChangeEvent<HTMLInputElement>): any
}

const IngredientLine: FunctionComponent<Props> = ({
    allIngredients, errors, searchTerm, handleSearchTerm, click, isClicked, register, setValue, defaultValues, index, ...rest }) => {
    // console.log(recettesIngredients);
    //const [index, setIndex] = useState<number>(indice);
    //const { resetField } = useForm<any>();
    //const [isClicked, setIsClicked] = useState<boolean>(false);

    /* useEffect(() => {
        setIndex(indice);
        console.log("indice:" + indice);
    }, [isClicked]); */

    const clickDelete = () => {
        //click;

        //resetField(`${name}.${index}.ingredient.name`)
        return click


    }

    const handleClear = () => {
        //recettesIngredients.ingredient.name = 'PIECE';
    }


    return (

        <>

            <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                <div className="me-2 w-25" hidden>
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.id`, {
                            shouldUnregister: true,
                        })}
                        className="form-control"

                    />
                </div>

                <div className="me-2">
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.name`, {
                            shouldUnregister: true,
                        })}
                        className="form-control"
                        required
                        onChange={handleSearchTerm}
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
                    {<p className="text-danger">{errors.ingredient?.message?.toString()}</p>}

                </div>

                <div className="w-25">
                    <input type="number"
                        {...register(`recettesIngredients.${index}.quantite`, {
                            shouldUnregister: true,
                        })}
                        step={1}
                        min={0}
                        className="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        required
                    />
                    {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}

                </div>

                <select
                    {...register(`recettesIngredients.${index}.uniteMesure`, {
                        shouldUnregister: true,
                    })}
                    className="form-select form-select mb-3 w-50 ms-2"
                    required
                    aria-label=".form-select example"
                    id="uniteMesure"
                    onFocus={handleClear()}


                >
                    <option key={"none"}>Mesure</option>
                    {Object.keys(UniteMesureEnum)
                        .filter(key => isNaN(Number(key)))
                        .filter(key => key != "map")
                        .map(key => <option key={key} defaultValue={key.toLowerCase()}>{key}

                        </option>)}
                </select>
                {<p className="text-danger">{errors.uniteMesure?.message?.toString()}</p>}

                <Button className="mb-3 ms-1"
                    variant="danger"
                    type={"button"}
                    onClick={clickDelete()}
                    id="deleteIngredient"
                >
                    X
                </Button>

            </div>
        </>
    )


}

export default IngredientLine;



