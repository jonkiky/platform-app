import React from 'react';

const Description = ({ symbol, name }) => (
  <>
    Germline variation associated with <strong>{symbol}</strong> on patients
    affected by <strong>{name}</strong>. Source:{' '}
    <Link to="https://www.ebi.ac.uk/eva/" external>
      EVA
    </Link>
  </>
);

export default Description;
