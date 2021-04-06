/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Page } from '../Page';
import { useParams } from 'react-router-dom';
import {
  FoodData,
  FoodDataFromServer,
  getFood,
  postFood,
} from './NutritionData';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from '../Styles';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  description: string;
};

interface Nutrientlist {
  nutrients: string[];
}

const NutrientList = ({ nutrients }: Nutrientlist) => {
  const listItems = nutrients.map((name: string) => (
    <li key={name.toString()}>{name}</li>
  ));
  return <ul>{listItems}</ul>;
};

export const FoodPage = () => {
  const { foodName } = useParams();

  const [successfullySubmitted, setSuccessfullySubmitted] = React.useState(
    false,
  );
  const [food, setFood] = React.useState<FoodDataFromServer | null>(null);
  const { register, errors, handleSubmit, formState } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postFood({
      name: data.name,
      description: data.description,
      createdDate: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  React.useEffect(() => {
    const doGetFood = async (foodName: string) => {
      const foundFood = await getFood(foodName);
      setFood(foundFood);
    };
    if (foodName) {
      doGetFood(foodName);
    }
  }, [foodName]);

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {food === null ? '' : food.name}
        </div>
        {food != null && (
          <React.Fragment>
            <div>{food.name}</div>
            <div>{food.description}</div>
          </React.Fragment>
        )}
      </div>
      {/*food nutriention list*/}
      <div>
        <NutrientList nutrients={food!.nutrients} />
      </div>
      {/*form - add food*/}
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <Fieldset disabled={formState.isSubmitting || successfullySubmitted}>
            <FieldContainer>
              <FieldLabel htmlFor="name">Food Name</FieldLabel>
              <FieldTextArea
                id="name"
                name="name"
                ref={register({
                  required: true,
                })}
              />
              {errors.name && errors.name.type === 'required' && (
                <FieldError>Your must enter the name of food</FieldError>
              )}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel htmlFor="description">
                Description of the food
              </FieldLabel>
              <FieldTextArea
                id="description"
                name="description"
                ref={register({
                  maxLength: 100,
                })}
              />
              {errors.description &&
                errors.description.type === 'maxLength' && (
                  <FieldError>Maximum 100 characters</FieldError>
                )}
            </FieldContainer>
            <FormButtonContainer>
              <PrimaryButton type="submit">Submit Your Answer</PrimaryButton>
            </FormButtonContainer>
          </Fieldset>
        </form>
      </div>
    </Page>
  );
};
