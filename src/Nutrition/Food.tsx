/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FoodData } from './NutritionData';

import { gray2 } from '../Styles';

interface Props {
  data: FoodData;
}

export const Food = ({ data }: Props) => {
  const a = 1;
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 19px;
        `}
      >
        {data.name}
      </div>
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {data.description}
      </div>
    </div>
  );
};
