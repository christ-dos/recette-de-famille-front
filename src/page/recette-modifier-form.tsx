
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TitreH2, TitreH5 } from "../components/children";
import { Form, Formulaire } from "../components/forms/form-recette";
import { FormGroupInputLabel, FormGroupInputSpan, InputSelect } from "../components/forms/InputsForm";
import Schema from "../components/forms/Schema-yup";
import IngredientLine from "../components/IngredientLine";
import StepPreparation from "../components/Step-preparation";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { RecetteIngredientId, RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";
import { updateRecipe } from "../services/RecetteService";
import { difficultyOptions, categoriesOptions } from "../components/forms/InputsForm";


type Props = {
  recette: Recette
};

const RecetteEditForm: FunctionComponent<Props> = ({ recette }) => {

  const [recettesIngredients, setRecettesIngredients] = useState<RecettesIngredients[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState<string | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState<Form>(Formulaire(recette));


  const { register, handleSubmit, formState: { errors }, formState } = useForm<Recette>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const { isSubmitted, isSubmitSuccessful } = formState

  /*const difficultyOptions = [
    { label: "Difficultés", value: "none" },
    { label: "Facile", value: "facile" },
    { label: "Intermédaire", value: "intermediaire" },
    { label: "Difficile", value: "difficile" }]

  const categoriesOptions = [
    { label: "Catégories", value: "none" },
    { label: "Plats", value: "1" },
    { label: "Entrées", value: "2" },
    { label: "Desserts", value: "3" },
    { label: "Apéritfs", value: "4" }]*/

  useEffect(() => {
    getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
    setRecettesIngredients(recette.recettesIngredients)

    // console.log(recette.recettesIngredients);
    // console.table(form)

  }, [recettesIngredients]);

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


  function addNewLine() {
    const newLine = {
      id: { recetteId: 0, ingredientId: 0 },
      quantite: 0,
      uniteMesure: UniteMesureEnum.map,
      ingredient: { id: 0, name: '' },
    }
    recettesIngredients.push(newLine);
    setRecettesIngredients([...recettesIngredients])
    setCount(count + 1);
  }

  function deleteLine(recetteIngredientId: RecetteIngredientId | undefined) {
    if (recettesIngredients.length > 1) {
      console.log("taille:" + recettesIngredients.length)

      const test = recettesIngredients.filter(recetteIngredient => (recetteIngredient.id?.ingredientId !== recetteIngredientId?.ingredientId)
        || recetteIngredient.id?.recetteId !== recetteIngredientId?.recetteId);
      console.table(test.map(ingredient => ingredient.ingredient));
      recettesIngredients.pop()
      setRecettesIngredients([...recettesIngredients])

    }
    console.log("id a supprimer", recetteIngredientId);
    console.log("click sur delete")
  }


  /*function getIngedientByName(name: string): Ingredient | undefined {
    const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
    if (result) {
      return result[0];
    }
  }*/

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    setPreview(selectedFile)
    console.log(preview);
  }

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    console.log("value:" + value)
    // setSearchTerm(value)

    value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
    console.log("ds la methode:" + searchTerm)

  }


  async function onSubmit(data: any) {
    console.log("datas:", data)
    //console.log("***categorie before: " + data.categorie);

    if (selectedFile) {
      let blob = selectedFile.slice();

      let reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = function () {
        data.urlPicture = reader.result;
      }
    } else {
      data.urlPicture = form.urlPicture.value;
    }

    //const recettesIngredients = [];
    // console.log("cate: ", data.categorie);
    const resultCategorie = await getCategorieById(data.categorie);
    data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }
    // console.log("cate after: ", data.categorie);


    data.recettesIngredients.map((recIng: any) => {
      console.log(recIng.ingredient.name.toLowerCase())
      const ingredient = allIngredients.find(element => element.name === recIng.ingredient.name);
      if (ingredient) {
        const recetteIngredientId = { recetteId: data.id, ingredientId: ingredient?.id };
        recIng.ingredient = ingredient;
        recIng.id = recetteIngredientId;
      } else {
        const recetteIngredientId = { recetteId: data.id, ingredientId: 0 };
        recIng.id = recetteIngredientId;
      }
    });

    updateRecipe(data).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
      }
    })
  }

  return (
    <>
      <TitreH2 titre={"Editer une Recette"} />
      {isSubmitSuccessful && <div className="alert alert-success mt-4">Recette mise à jour avec succés</div>}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="border border-secundary shadow-lg">

        <main className="container" >
          <div className='row mx-4 my-2 pb-3 mt-3' style={{
            border: '1px 1px solidrgba(131,197,190,0.9)', backgroundColor: 'rgba(131,197,190,0.1)',
            boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', borderRadius: '20px'
          }}>
            {/*************************** Titre *********************************/}
            <div className="d-flex justify-content-center">
              <div className="input-group-text  mt-5 w-50 ">
                <input type="text" hidden value={form.id.value} {...register("id")} />
                <span className="input-group-text me-1" id="inputGroup-sizing-default">Titre</span>
                <input type="text"
                  {...register("title")}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  defaultValue={form.title.value}
                  id="title" />
              </div>
            </div>
            {<p className="text-danger d-flex justify-content-center">{errors.title?.message?.toString()}</p>}
            {/*************************** Choisir une image *********************************/}
            <div className="">
              <div className=" d-flex justify-content-center mt-3 mb-3" >
                <FormGroupInputLabel
                  register={register}
                  errors={errors}
                  type={"file"}
                  name={"urlPicture"}
                  id={"avatar"}
                  accept="image/png, image/jpeg"
                  onChange={onSelectFile}
                />
                {/*  <label htmlFor="avatar">Choisir une image: </label>
                <input
                  {...register("urlPicture")}
                  type="file"
                  id="avatar"
                  accept="image/png, image/jpeg"
                  onChange={onSelectFile}
                />
                */}
              </div>
              {<p className="text-danger d-flex justify-content-center">{errors.urlPicture?.message?.toString()}</p>}

              <div className=" d-flex justify-content-center mt-2">
                <figure >
                  <img className={styles.mystere}
                    src={selectedFile ? (preview) : (form.urlPicture.value)}
                    id="imgRecette" alt="image de la recette"
                    style={{ objectFit: 'cover' }} />
                </figure>
              </div>
            </div>
          </div>
        </main>
        <main className="container mt-4">
          <section className="row d-flex justify-content-center pt-3 px-2 mx-4 py-4 "
            style={{ backgroundColor: 'rgba(131,197,190,0.1)', boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', border: '1px 1px solid rgba(131,197,190,0.9)', borderRadius: ' 20px' }}>
            <div className="col-12 col-md-12 col-lg-4 form-group d-flex flex-column justify-content-center ">

              {/************************** Infos Clefs (Selecteurs) ********************************/}
              {/* <h4 className="custom-color-dore">Infos clés</h4>*/}
              <TitreH5
                titre={"Infos clés"}
                className={"custom-color-dore mb-3 ms-2"}
              />
              <InputSelect
                register={register}
                name={"difficultyLevel"}
                form={form}
                errors={errors?.difficultyLevel?.message?.toString}
                className={"form-select form-select-lg mb-3 w-50"}
                id={"difficultyLevel"}
                defaultValue={recette.difficultyLevel.toLowerCase()}
                array={difficultyOptions}
              />

              <InputSelect
                register={register}
                name={"categorie"}
                form={form}
                errors={errors?.categorie?.message?.toString}
                className={"form-select form-select-lg mb-3 w-50"}
                id={"categorie"}
                defaultValue={recette.categorie.id}
                array={categoriesOptions}
              />


              {/*  <select {...register('difficultyLevel')} className="form-select form-select-lg mb-3 w-50"
                aria-label=".form-select-lg example"
                id="difficultyLevel"
                defaultValue={recette.difficultyLevel.toLowerCase()}
              >
                {difficultyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {<p className="text-danger">{errors.difficultyLevel?.message?.toString()}</p>}

              <select {...register('categorie')}
                className="form-select form-select-lg mb-3 w-50 "
                aria-label=".form-select-lg example"
                id="categorie"
                defaultValue={recette.categorie.id}
              >
                {categoriesOptions.map(categorie => (
                  <option key={categorie.value} value={categorie.value}>{categorie.label}</option>
                ))}
              </select>
              {<p className="text-danger">{errors.categorie?.message?.toString()}</p>}
              */}
              {/*************************** Les Durées *********************************/}
              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps total"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"totalTimePreparation"}
                  valeur={"Minutes"}
                  defaultValue={form.totalTimePreparation.value}
                  type="text"
                />

                {/*} <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("totalTimePreparation")} type="text"
                      className="form-control"
                      defaultValue={form.totalTimePreparation.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                  {<p className="text-danger">{errors.totalTimePreparation?.message?.toString()}</p>}
                </div>
            */}
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de Préparation"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"timePreparation"}
                  valeur={"Minutes"}
                  defaultValue={form.timePreparation.value}
                  type="text"
                />

                {/* <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("timePreparation")} type="text"
                      className="form-control "
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={form.timePreparation.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.timePreparation?.message?.toString()}</p>}
             */}
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de cuisson"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"cookingTime"}
                  valeur={"Minutes"}
                  defaultValue={form.cookingTime.value}
                  type="text"
                />
                {/*   <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register("cookingTime")} type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={form.cookingTime.value}
                    />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.cookingTime?.message?.toString()}</p>}
            */}
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de repos"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"restTime"}
                  valeur={"Minutes"}
                  defaultValue={form.restTime.value}
                  type="text"
                />
                {/*  <div className=" d-flex flex-row justify-content-between">
                  <div className="input-group w-50">
                    <input {...register('restTime')} type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                      defaultValue={form.restTime.value} />
                    <span className="input-group-text">Minutes</span>
                  </div>
                </div>
                {<p className="text-danger">{errors.restTime?.message?.toString()}</p>}
          */}
              </div>

            </div>
            {/*************************** Le nombre de parts *********************************/}
            <div className="col-12 col-md-12 col-lg-7 ">
              <TitreH5
                titre={"Nombre de personnes"}
                className={"custom-color-dore mb-3 ms-1"}
              />
              <FormGroupInputSpan
                register={register}
                errors={errors}
                name={"numberOfPeople"}
                valeur={"Personne(s)"}
                defaultValue={form.numberOfPeople.value}
                type="text"
              />

              {/* <div className=" d-flex flex-row justify-content-between">
                <div className="input-group w-50 mb-3 ">
                  <input {...register("numberOfPeople")} type="text"
                    className="form-control "
                    aria-label="Dollar amount (with dot and two decimal places)"
                    defaultValue={form.numberOfPeople.value} />
                  <span className="input-group-text ">personnes</span>
                </div>
              </div>
              {<p className="text-danger">{errors.numberOfPeople?.message?.toString()}</p>}
            */}

              {/*************************** Les ingredients *********************************/}
              <TitreH5
                titre={"Ingrédients"}
                className={"custom-color-dore mt-4 ms-1"}
              />
              {recette.recettesIngredients.map((recettesIngredients, index) => (
                <IngredientLine
                  key={recettesIngredients.ingredient.id}
                  name={'recettesIngredients'}
                  recettesIngredients={recettesIngredients}
                  click={() => deleteLine(recettesIngredients?.id)}
                  register={register}
                  index={index}
                  errors={errors}
                  searchTerm={searchTerm}
                  allIngredients={allIngredients}
                  handleSearchTerm={(e) => handleSearchTerm(e)} />
              ))}


              {/*  {recette.recettesIngredients.map((ingredient, index) => (
                <>
                  <div className=" d-flex flex-row justify-content-between mb-1 mt-3">
                    <div className="me-2">
                      <input type="text"
                        {...register(`recettesIngredients.${index}.ingredient.name`)}
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"
                        onChange={(e) => handleSearchTerm(e)}
                        list="ingredients"
                        required
                        defaultValue={ingredient.ingredient.name} />
                      <datalist id="ingredients">
                        {allIngredients
                          .filter(ingredient => ingredient.name.includes(searchTerm))
                          .map(ingredientName =>
                            <option key={ingredientName.id} defaultValue={ingredientName.name} />
                          )}
                      </datalist>
                    </div>

                    <div>
                      <input type="number"
                        {...register(`recettesIngredients.${index}.quantite`)}
                        step={1}
                        min={0}
                        className="form-control"
                        aria-label="Dollar amount (with dot and two decimal places)"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue={ingredient.quantite}
                        required />
                    </div>

                    <select
                      className="form-select form-select mb-3 w-50 ms-2"
                      {...register(`recettesIngredients.${index}.uniteMesure`)}
                      required
                      aria-label=".form-select example"
                      id="uniteMesure"
                      defaultValue={ingredient.uniteMesure}
                    >
                      <option key={"none"}>Mesure</option>
                      {Object.keys(UniteMesureEnum)
                        .filter(key => isNaN(Number(key)))
                        .filter(key => key != "map")
                        .map(key => <option key={key} defaultValue={key.toLowerCase()}>{key}</option>)}
                    </select>

                  </div>
                  </>
              ))}
 */}

              <Button className="mt-3 me-1"
                variant="secondary"
                type={"button"}
                onClick={addNewLine}>
                +
              </Button>

            </div>

          </section>
        </main>
        <main className="container">
          {/*************************** Les étapes de préparations *********************************/}
          <section className="row">
            <StepPreparation register={register} name={"stepPreparation"} form={form} errors={errors} />

            {/* <div className="col-12 col-md-12 col-lg-12 ">
              <h3 className={` ms-4 custom-color-dore mt-2`}>Préparation</h3>
              <div className="form-floating mx-4" style={{ boxShadow: '1px 1px 1px rgba(131,197,190,0.9)' }}>
                <textarea {...register("stepPreparation")} className={`form-control ${styles.textarea}`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  defaultValue={form.stepPreparation.value}
                >
                </textarea>

                <label htmlFor="floatingTextarea">Aller à la ligne pour chaque étape</label>
              </div>
              {<p className="text-danger">{errors.stepPreparation?.message?.toString()}</p>}
            </div>  */}

          </section>
        </main>
        <div className="d-flex justify-content-center mb-3">
          <Button className="mt-3 " variant="secondary" type={"submit"}>Valider</Button>
        </div>

      </form>

    </>
  );
}

export default RecetteEditForm;