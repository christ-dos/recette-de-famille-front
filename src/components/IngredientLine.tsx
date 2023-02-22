
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
    index: number,
    errors: FieldErrors,
    searchTerm: string,
    allIngredients: Ingredient[],
    isClicked: boolean,
    defaultValues: RecettesIngredients[],
    handleSearchTerm(e: ChangeEvent<HTMLInputElement>): any
}

const IngredientLine: FunctionComponent<Props> = ({
    allIngredients, errors, searchTerm, handleSearchTerm, click, isClicked,
    register, defaultValues, index, ...rest }) => {
    // console.log(recettesIngredients);
    //const [index, setIndex] = useState<number>(indice);
    const { resetField } = useForm<any>();
    // const [isClicked, setIsClicked] = useState<boolean>(false);

    /* useEffect(() => {
        setIndex(indice);
        console.log("indice:" + indice);
    }, [isClicked]); */


    return (

        <>

            <div key={index} className=" d-flex flex-row justify-content-between mb-1 mt-3">
                <div className="me-2 w-25" hidden>
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.id`)}
                        className="form-control"
                        key={defaultValues[index].ingredient.id}
                    />
                </div>

                <div className="me-2">
                    <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.name`)}
                        className="form-control"
                        required
                        onChange={handleSearchTerm}
                        key={defaultValues[index].ingredient.name}
                        onFocus={(e) => e.target.value = ""}
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
                        {...register(`recettesIngredients.${index}.quantite`)}
                        step={1}
                        min={0}
                        className="form-control"
                        onChange={(e) => console.log(e.target.value)}
                        required
                        key={defaultValues[index].quantite}
                        onFocus={(e) => e.target.value = ""}
                    />
                    {<p className="text-danger">{errors.quantity?.message?.toString()}</p>}

                </div>

                <select
                    {...register(`recettesIngredients.${index}.uniteMesure`)}
                    className="form-select form-select mb-3 w-50 ms-2"
                    required
                    aria-label=".form-select example"
                    id="uniteMesure"
                    key={defaultValues[index].uniteMesure}
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
                    onClick={click}
                    id="deleteIngredient"
                >
                    X
                </Button>

            </div>
        </>
    )


}

export default IngredientLine;



