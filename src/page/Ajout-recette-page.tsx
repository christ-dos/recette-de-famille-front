import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TitreH2 } from "../components/children";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";

const AjoutRecettePage: FunctionComponent = () => {

    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', uniteMesure: 'PIECE' }]);
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
    const [count, setCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState<any>()
    const [preview, setPreview] = useState<string | undefined>()

    useEffect(() => {
        getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
    }, []);


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const { register, handleSubmit } = useForm();


    function addNewLine() {
        const newLine = { name: '', uniteMesure: 'PIECE', quantity: '' }
        setIngredients([...ingredients, newLine])
        setCount(count + 1);
    }


    const createRecipe = (data: any) => {
        return fetch('http://localhost:8082/recette/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .catch((error) => console.log(error));
    };

    function getIngedientByName(name: string): Ingredient | undefined {
        const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
        if (result) {
            return result[0];
        }
    }

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setPreview(selectedFile)
        console.log(preview);
    }



    async function onSubmit(data: any) {

        let blob = data.urlPicture[0].slice();

        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
            data.urlPicture = reader.result;
        }

        const recettesIngredients = [];
        for (let i = 0; i <= count; i++) {
            const ingredient = getIngedientByName(data[`ingredient-${i}`]);

            recettesIngredients.push({
                quantite: data[`quantity-${i}`],
                uniteMesure: data[`uniteMesure-${i}`],
                ingredient: { id: ingredient?.id, name: data[`ingredient-${i}`], urlPicture: null }
            });
            delete data[`ingredient-${i}`];
            delete data[`quantity-${i}`];
            delete data[`uniteMesure-${i}`];
        }
        const resultCategorie = await getCategorieById(data.categorie);
        data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

        data.recettesIngredients = recettesIngredients

        createRecipe(data).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log("recette créée");
            }
        })
    }

    return (
        <>
            <TitreH2 titre={"Ajouter une Recette"} />
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                <main className="container ">
                    <div className="d-flex justify-content-center">
                        <div className="input-group-text  mt-5 w-50 ">
                            <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
                            <input {...register("title")} type="text" className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <div className="d-flex flex-column mt-5 ">
                        <div className=" d-flex justify-content-center mt-5" >
                            <label htmlFor="avatar">Choisir une image:</label>
                            <input  {...register("urlPicture")} type="file" id="avatar"
                                accept="image/png, image/jpeg"
                                onChange={onSelectFile}
                            />
                        </div>
                        <div className=" d-flex justify-content-center mt-5">
                            <figure >
                                <img className={styles.mystere} src={selectedFile ? (preview) : ('/images/mystere.jpg')} id="imgRecette" alt="point d'interrogation" />
                            </figure>
                        </div>
                    </div>
                </main>
                <main className="container mt-4">
                    <section className="row">
                        <div className="col-12 col-md-6 col-lg-6 ">
                            <h3 className={styles.h3}>Infos clés</h3>
                            <select {...register('difficultyLevel')} className="form-select form-select-lg mb-3 w-50"
                                aria-label=".form-select-lg example">
                                <option selected defaultValue={'Facile'}>Difficultés</option>
                                <option value="Facile">Facile</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Difficile">Difficile</option>
                            </select>
                            <div className={styles.duree}>
                                <h4>Temps de préparation</h4>
                                <div className=" d-flex flex-row justify-content-between">

                                    <div className="input-group w-50">
                                        <input {...register("timePreparation")} type="text" className="form-control "
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.duree}>
                                <h4>Temps de cuisson</h4>
                                <div className=" d-flex flex-row justify-content-between">

                                    <div className="input-group w-50">
                                        <input {...register("cookingTime")} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.duree}>
                                <h4>Temps de repos</h4>
                                <div className=" d-flex flex-row justify-content-between">

                                    <div className="input-group w-50">
                                        <input {...register('restTime')} type="text" className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)" />
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-6 ">
                            <select {...register('categorie')} className="form-select form-select-lg mb-3 w-50"
                                aria-label=".form-select-lg example">
                                <option selected>Catégories</option>
                                <option value="1">Plat</option>
                                <option value="2">Entrees</option>
                                <option value="3">Desserts</option>
                                <option value="4">Apéritifs</option>
                            </select>
                            <h3 className={styles.h3}>Ingrédients</h3>
                            <h4 className="mb-3">Nombre de personnes</h4>
                            <div className=" d-flex flex-row justify-content-between">
                                <div className="input-group w-50 mb-3 ">
                                    <input {...register("numberOfPeople")} type="text" className="form-control "
                                        aria-label="Dollar amount (with dot and two decimal places)" />
                                    <span className="input-group-text ">personnes</span>
                                </div>

                            </div>

                            <h4>Ingrédients</h4>
                            {ingredients.map((ingredient, index) =>
                            (
                                <div className=" d-flex flex-row justify-content-between mb-1">
                                    <div className="input-group w-50 ">
                                        <input type="number"
                                            className="form-control" {...register(`quantity-${index}`)}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                        <span className="input-group-text">Quantité</span>
                                    </div>
                                    <select {...register(`uniteMesure-${index}`)} className="form-select form-select-lg mb-3 w-50"
                                        aria-label=".form-select-lg example">
                                        <option selected>Unités de mesure</option>
                                        <option value="PIECE">Piéce</option>
                                        <option value="GRAMME">gramme</option>
                                        <option value="KILOS">kilos</option>
                                        <option value="LITRE">litre</option>
                                    </select>
                                    <div className="input-group w-50 ms-2">
                                        <input type="text"
                                            className="form-control" {...register(`ingredient-${index}`)}
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                        <span className="input-group-text">Ingrédient</span>
                                    </div>
                                </div>
                            ))}

                            <Button className="mt-3" variant="secondary" type={"button"}
                                onClick={addNewLine}>+</Button>
                        </div>
                    </section>
                </main>
                <main className="container">
                    <section className="row">
                        <div className="col-12 col-md-12 col-lg-12 ">
                            <h3 className={styles.h3}>Préparation</h3>
                            <div className="form-floating">
                                <textarea {...register("stepPreparation")} className={`form-control ${styles.textarea}`}
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Aller à la ligne pour chaque étape</label>
                            </div>
                        </div>
                    </section>
                </main>
                <div className="d-flex justify-content-center">
                    <Button className="mt-3 " variant="secondary" type={"submit"}>Valider</Button>
                </div>
            </form>

        </>
    );
}

export default AjoutRecettePage;


