
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { TitreH2, TitreH5 } from "../components/children";
import { Form, Formulaire } from "../components/forms/form-recette";
import { categoriesOptions, difficultyOptions, FormGroupInputLabel, FormGroupInputSpan, InputSelect } from "../components/forms/InputsForm";
import Schema from "../components/forms/Schema-yup";
import IngredientLine from "../components/IngredientLine";
import StepPreparation from "../components/Step-preparation";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";
import { updateRecipe } from "../services/RecetteService";

type Props = {
  recipe: Recette
};

const RecetteEditForm: FunctionComponent<Props> = ({ recipe }) => {

  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [count, setCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<Form>(Formulaire(recipe));

  const { register, handleSubmit, formState,
    formState: { errors }, control } = useForm<Recette>({
      mode: 'onChange',

      defaultValues: {
        id: form.id.value,
        title: form.title.value,
        urlPicture: form.urlPicture.value,
        difficultyLevel: form.difficultyLevel.value,
        categorie: form.categorie.value,
        totalTimePreparation: form.totalTimePreparation.value,
        timePreparation: form.timePreparation.value,
        cookingTime: form.timePreparation.value,
        restTime: form.restTime.value,
        numberOfPeople: form.numberOfPeople.value,
        stepPreparation: form.stepPreparation.value,
        recettesIngredients: form.recettesIngredients.value
      },
      resolver: yupResolver(Schema)
    });

  const { isSubmitted, isSubmitSuccessful } = formState

  const { fields, append, remove } = useFieldArray({
    name: 'recettesIngredients',
    control,
  })


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

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    setPreview(selectedFile)
  }

  const handleRemove = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  }

  const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>, setSearchTerm: any) => {
    let value = e.target.value;
    value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
  }

  async function onSubmit(data: any) {
    console.log("datas:", data)

    data.id = +data.id;
    /*gestion de l'image: Cnversion du blob en url pour sauvegarde en BDD*/
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

    /*récupération de la catégorie en base*/
    const resultCategorie = await getCategorieById(data.categorie);
    data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

    /*On recherche les ingredients par leur nom et on remplit le recetteIngredient id avec les respectifs ids*/
    data.recettesIngredients.map((recetteIngredient: RecettesIngredients) => {

      const ingredient = allIngredients.find(ingredient => ingredient.name === recetteIngredient.ingredient.name);
      if (ingredient) {
        const recetteIngredientId = { recetteId: +data.id, ingredientId: ingredient.id };
        recetteIngredient.ingredient = ingredient;
        recetteIngredient.id = recetteIngredientId;
      } else {
        const recetteIngredientId = { recetteId: +data.id, ingredientId: 0 };
        recetteIngredient.ingredient.id = 0;
        recetteIngredient.ingredient.urlPicture = 'https://previews.123rf.com/images/kerdkanno/kerdkanno1701/kerdkanno170100010/68705276-divers-de-la-cuisine-tha%C3%AFlandaise-ingr%C3%A9dients-de-cuisine-pour-%C3%A9pices-curry-rouge-p%C3%A2te-ingr%C3%A9dient-de-.jpg'
        recetteIngredient.id = recetteIngredientId;
      }
    });

    updateRecipe(data).then((response) => {
      console.log("je suis dans update recipe");

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

      <form id="recette-modifier-form" action="" onSubmit={handleSubmit(onSubmit)} className="border border-secundary shadow-lg">
        <main className="container " >
          <div className={`${styles.my_style_row} row mx-4 my-2 pb-3 mt-3`}
          >
            {/*************************** Titre *********************************/}
            <div className="d-flex justify-content-center">
              <div className="input-group-text  mt-5 w-50 ">
                <input type="text"
                  hidden
                  {...register("id")} />
                <span className="input-group-text me-1" id="inputGroup-sizing-default">Titre</span>
                <input type="text"
                  {...register("title")}
                  onChange={(e) => console.log(e.target.value)
                  }
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  id="title"
                />
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
          <section className={`${styles.my_style_row} row d-flex justify-content-center pt-3 px-2 mx-4 py-4 `}
            style={{ backgroundColor: 'rgba(131,197,190,0.1)', boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', border: '1px 1px solid rgba(131,197,190,0.9)', borderRadius: ' 20px' }}>
            <div className="col-12 col-md-12 col-lg-4 form-group d-flex flex-column justify-content-center ">

              {/************************** Infos Clefs (Selecteurs) ********************************/}
              <TitreH5
                titre={"Infos clés"}
                className={"custom-color-dore mb-3 ms-2"}
              />
              <InputSelect
                register={register}
                name={"difficultyLevel"}
                form={form}
                errors={errors}
                className={"form-select form-select-lg w-50"}
                id={"difficultyLevel"}
                array={difficultyOptions}
              />

              <InputSelect
                register={register}
                name={"categorie"}
                form={form}
                errors={errors}
                className={"form-select form-select-lg mt-3 w-50"}
                id={"categorieId"}
                array={categoriesOptions}
              />
              {/*************************** Les Durées *********************************/}
              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps total"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  name={"totalTimePreparation"}
                  valeur={"Minutes"}
                  type="text"
                  errors={errors}
                />
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
                  type="text"
                />
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
                  type="text"
                />
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
                  type="text"
                />
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
                type="text"
              />
              {/*************************** Les ingredients *********************************/}
              <TitreH5
                titre={"Ingrédients"}
                className={"custom-color-dore mt-4 ms-1"}
              />
              {fields.map((field: RecettesIngredients, index: number) => (

                <IngredientLine
                  key={index}
                  defaultValues={fields}
                  click={() => {
                    handleRemove(index)
                  }}
                  register={register}
                  errors={errors}
                  searchTerm={searchTerm}
                  allIngredients={allIngredients}
                  handleSearchTerm={(e) => handleSearchTerm(e, setSearchTerm)}
                  index={index} />
              ))}

              <Button className="mt-3 me-1"
                variant="secondary"
                type={"button"}
                onClick={() => {
                  append({
                    id: { recetteId: 0, ingredientId: 0 },
                    quantite: 0,
                    uniteMesure: UniteMesureEnum.map,
                    ingredient: { id: 0, name: `ingredient ${count}` }
                  }); setCount(count + 1)
                }}
              >
                +
              </Button>

            </div>

          </section>
        </main>
        <main className="container">
          {/*************************** Les étapes de préparations *********************************/}
          <section className="row">
            <StepPreparation
              register={register}
              name={"stepPreparation"}
              form={form}
              errors={errors} />
          </section>
        </main>
        <div className="d-flex justify-content-center mb-3">
          <Button
            className="mt-3 "
            variant="secondary"
            type={"submit"}
            name={"updateSubmit"}
          >Valider
          </Button>
        </div>
      </form>

    </>
  );
}

export default RecetteEditForm;