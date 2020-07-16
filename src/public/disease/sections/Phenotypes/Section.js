import React from 'react';

import { Link } from 'ot-ui';

import DataTable from '../../../common/Table/DataTable';
import { PaginationActionsComplete } from '../../../common/Table/TablePaginationActions';

const columns = [
  {
    id: 'phenotype',
    propertyPath: 'name',
  },
  {
    id: 'identifier',
    propertyPath: 'disease',
    exportValue: d => d.url,
    renderCell: d => (
      <Link external to={d.url}>
        {d.disease}
      </Link>
    ),
  },
];

const Section = ({ data }) => (
  <DataTable
    columns={columns}
    dataDownloader
    dataDownloaderFileStem="phenotypes"
    rows={data}
    showGlobalFilter
  />
);

export default Section;
