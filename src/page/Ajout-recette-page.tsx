import { log } from "console";
import { FunctionComponent, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TitreH2 } from "../components/children";
import styles  from '../css/ajout-recette-page.module.css';

const AjoutRecettePage: FunctionComponent = () => {

  const [ingredients, setIngredients] = useState([{name: '', quantity: ''}]);
    const [count, setCount] = useState(0);

    const {register, handleSubmit} = useForm();

    function addNewLine() {
        const newLine = {name: '', quantity: ''}
        setIngredients([...ingredients, newLine])
        setCount(count + 1);
    }

    const createRecipe = (data: any) => {
        return fetch('http://localhost:8082/recette/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .catch((error) => console.log(error));
    };

    function onSubmit(data:any) {
        console.log(data);
        console.log(count)
        const ingredients = [];
        const RecettesIngredients = [];
        for (let i = 0; i <= count; i++) {

            ingredients.push({name: data[`ingredient-${i}`], quantity: data[`quantity-${i}`]})
            delete data[`ingredient-${i}`];
            delete data[`quantity-${i}`];

            RecettesIngredients.push({
                quantite: data[`quantity-${i}`],
                uniteMesure: data[`uniteMesure-${i}`],
                ingredient: data[`name-${i}`]
        });


        }

        

        data.ingredients = ingredients;
        createRecipe(data,).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log("recette créée");
            }
        })
    }
  

    return (
      <>
      <TitreH2 titre={"Ajouter une Recette"}/>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
                <main className="container">
                    <section className="row d-flex justify-content-around">
                        <div className="col-12 col-md-6 col-lg-6  ">

                            <label htmlFor="avatar">Choisir une image:</label>
                            <input {...register("file")} type="file" id="avatar" name="avatar"
                                   accept="image/png, image/jpeg"/>

                            <figure className={styles.figure}>
                                <img className={styles.mystere} src="./images/mystere.jpg" alt="point d'interrogation"/>
                            </figure>
                        </div>

                        <div className="col-12 col-md-6 col-lg-6">

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
                                <input {...register("title")} type="text" className="form-control"
                                       aria-label="Sizing example input"
                                       aria-describedby="inputGroup-sizing-default"/>
                            </div>

                            <div className="form-floating ">
                            <textarea {...register("comment")} className={`form-control ${styles.textarea}`}
                                      placeholder="Leave a comment here"
                                      id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Présentation</label>

                            </div>
                        </div>
                    </section>
                </main>
                <main className="container mt-4">
                    <section className="row">
                        <div className="col-12 col-md-6 col-lg-6 ">
                            <h3 className={styles.h3}>Infos clés</h3>
                            <select {...register('difficulty')} className="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example">
                                <option selected>Difficultés</option>
                                <option value="1">Facile</option>
                                <option value="2">Intermédiaire</option>
                                <option value="3">Difficile</option>
                            </select>
                            <div className={styles.duree}>
                                <h4>Temps de préparation</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50 ">
                                        <input {...register("hourPrep")} type="text" className="form-control"
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text">Heures</span>
                                    </div>
                                    <div className="input-group w-50">
                                        <input {...register("minPrep")} type="text" className="form-control"
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.duree}>
                                <h4>Temps de cuisson</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50 ">
                                        <input {...register("hourCuisson")} type="text" className="form-control "
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text ">Heures</span>
                                    </div>
                                    <div className="input-group w-50">
                                        <input {...register("minCuisson")} type="text" className="form-control"
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.duree}>
                                <h4>Temps de repos</h4>
                                <div className=" d-flex flex-row justify-content-between">
                                    <div className="input-group w-50 ">
                                        <input {...register('hourRepos')} type="text" className="form-control "
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text ">Heures</span>
                                    </div>
                                    <div className="input-group w-50">
                                        <input {...register('minRepos')} type="text" className="form-control"
                                               aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text">Minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 ">
                            <h3 className={styles.h3}>Ingrédients</h3>
                            <h4>Nombre de personnes</h4>
                            <div className=" d-flex flex-row justify-content-between">
                                <div className="input-group w-50 ">
                                    <input {...register("numOfPeople")} type="text" className="form-control "
                                           aria-label="Dollar amount (with dot and two decimal places)"/>
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
                                        <div className="input-group w-50">
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
                            <textarea {...register("steps")} className={`form-control ${styles.textarea}`}
                                      placeholder="Leave a comment here"
                                      id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Aller à la ligne pour chaque étape</label>
                            </div>
                        </div>
                    </section>
                </main>

                <Button className="mt-3" variant="secondary" type={"submit"}>Valider</Button>
            </form>
        
      </>
    );
  }
  
  export default AjoutRecettePage;
  
  