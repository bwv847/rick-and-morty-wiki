import React from 'react';
import BaseCard from '@/common/BaseCard';
import BaseImage, { imageProps } from '@/common/BaseImage';
import {
  CharacterCard_CharacterFragment,
  CharacterCard_CharacterWithSpecsFragment,
} from '@/gql/graphql';
import { CardContent, CardHeader } from '@mui/material';
import { gql } from '@apollo/client';
import { isOfType, UNKNOWN } from '@/common/CommonUtils';
import LabeledTextList from '@/common/LabeledTextList';

function hasSpecs(
  character:
    | CharacterCard_CharacterFragment
    | CharacterCard_CharacterWithSpecsFragment,
): character is CharacterCard_CharacterWithSpecsFragment {
  return isOfType<CharacterCard_CharacterWithSpecsFragment>(character, [
    'status',
    'species',
    'origin',
    'gender',
    'location',
  ]);
}

type CharacterCardProps = {
  titleAs?: React.ElementType;
  character:
    | CharacterCard_CharacterFragment
    | CharacterCard_CharacterWithSpecsFragment;
  href?: string;
  imgPriority?: boolean;
};

function CharacterCard({
  titleAs,
  character,
  href,
  imgPriority,
}: CharacterCardProps) {
  return (
    <BaseCard href={href}>
      {character.image && character.name && (
        <BaseImage
          src={character.image}
          alt={character.name}
          priority={imgPriority}
          {...imageProps.responsive('1')}
        />
      )}
      <CardHeader
        title={character.name}
        titleTypographyProps={{ component: titleAs }}
      />
      {hasSpecs(character) ? (
        <CardContent>
          <LabeledTextList
            data={[
              { label: 'Status', text: character.status },
              { label: 'Species', text: character.species },
              { label: 'Gender', text: character.gender },
              { label: 'Origin', text: character.origin?.name ?? UNKNOWN },
              {
                label: 'Location',
                text: character.location?.name ?? UNKNOWN,
              },
            ]}
          />
        </CardContent>
      ) : null}
    </BaseCard>
  );
}

const characterFragment = gql`
  fragment CharacterCard_character on Character {
    id
    name
    image
  }
`;

CharacterCard.fragments = {
  character: characterFragment,
  characterWithSpecs: gql`
    fragment CharacterCard_characterWithSpecs on Character {
      ...CharacterCard_character
      status
      species
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
    }
    ${characterFragment}
  `,
};

export default CharacterCard;
