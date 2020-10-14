import React, { Fragment, useState, useEffect } from 'react';
import client from '../../../client';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
// import Chip from '@material-ui/core/Chip';

// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';

// import { Button, ListTooltip } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

// import summaryData from './temp/summary.json';
// import interactionsData from './temp/LRRK2_interactions.json';

const INTERACTIONS_QUERY = loader('./sectionQuery.gql');

const fetchInteractions = (ensgId, sourceDatabase, index, size) => {
  return client.query({
    query: INTERACTIONS_QUERY,
    variables: {
      ensgId,
      sourceDatabase,
      index,
      size,
    },
  });
};

const styles = theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

const filterStringEvidence = (evidences, id) => {
  return evidences
    .filter(e => e.interactionDetectionMethodShortName === id)
    .map(e => e.evidenceScore / 1000);
};

const columns = {
  intact: {
    interactions: [
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">
              Alt ID
              <br />
              Species
            </Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB ? row.targetB.approvedSymbol : row.intB}
            {/* <br />
            <Typography variant="caption">
              {row.organismB.taxon_id}
              <br />
              Human
            </Typography> */}
          </>
        ),
      },
      {
        id: 'scoring',
        label: 'Score',
        renderCell: row => row.scoring,
      },
      {
        id: 'evidences',
        label: 'Interaction evidence',
        renderCell: row => row.count,
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
    ],
    evidence: [
      {
        id: 'interactionIdentifier',
        label: 'Identifier',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactionTypeShortName}
            <br />
            <Typography variant="caption">
              {row.hostOrganismScientificName}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
      },
      {
        id: 'pubmedId',
        label: 'Publication',
      },
    ],
  },

  signor: {
    // interactions table columns
    interactions: [
      {
        id: 'targetA',
        label: (
          <>
            Interactor A
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetA ? row.targetA.approvedSymbol : row.intA}
            {/* {row.organismA.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismA.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB ? row.targetB.approvedSymbol : row.intB}
            {/* {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      {
        id: 'role',
        label: (
          <>
            Biological
            <br />
            role
          </>
        ),
        renderCell: row => (
          <>
            <span title={row.intABiologicalRole}>
              <MethodIconText>A</MethodIconText>
            </span>
            <span title={row.intBBiologicalRole}>
              <MethodIconText>B</MethodIconText>
            </span>
          </>
        ),
      },
      {
        id: 'sizeEvidences',
        label: (
          <>
            Interaction
            <br />
            evidence
          </>
        ),
        renderCell: row => row.count,
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interactionIdentifier',
        label: 'ID',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactionTypeShortName}
            <br />
            <Typography variant="caption">
              Organism: {row.hostOrganismScientificName}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
      },
      {
        id: 'pubmedId',
        label: 'Publication',
      },
    ],
  },

  reactome: {
    // interactions table columns
    interactions: [
      {
        id: 'targetB',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB ? row.targetB.approvedSymbol : row.intB}
            {/* {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      {
        id: 'sizeEvidences',
        label: <>Interaction evidence</>,
        renderCell: row => row.count,
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interactionIdentifier',
        label: 'ID',
      },
      {
        id: 'interaction',
        label: (
          <>
            Interaction
            <br />
            <Typography variant="caption">Host organism</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactionTypeShortName}
            <br />
            <Typography variant="caption">
              Organism: {row.hostOrganismScientificName}
            </Typography>
          </>
        ),
      },
      {
        id: 'methods',
        label: 'Detection methods',
        renderCell: row => (
          <>
            <MethodIconText>A</MethodIconText>
            <MethodIconArrow />
            <MethodIconText>B</MethodIconText>
          </>
        ),
      },
      {
        id: 'pubmedId',
        label: 'Publication',
      },
    ],
  },

  string: {
    interactions: [
      {
        id: 'partner',
        label: (
          <>
            Interactor B
            {/* <br />
            <Typography variant="caption">Species (if not human)</Typography> */}
          </>
        ),
        renderCell: row => (
          <>
            {row.targetB ? row.targetB.approvedSymbol : row.intB}
            {/* {row.organism.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organism.mnemonic}
                </Typography>
              </>
            ) : null} */}
          </>
        ),
      },
      {
        id: 'overallScore',
        label: (
          <>
            Overall
            <br />
            interaction score
          </>
        ),
        renderCell: row => row.scoring / 1000,
      },
      {
        id: 'neighbourhood',
        label: 'Neighbourhood',
        renderCell: () => '',
      },
      {
        id: 'geneFusion',
        label: 'Gene fusion',
        renderCell: () => '',
      },
      {
        id: 'occurance',
        label: 'Co-occurrance',
        renderCell: () => '',
      },
      {
        id: 'expression',
        label: 'Co-expression',
        renderCell: row =>
          filterStringEvidence(row.evidences, 'coexpression_transferred'),
      },
      {
        id: 'experiments',
        label: 'Experiments',
        renderCell: row =>
          filterStringEvidence(row.evidences, 'experiment description'),
      },
      {
        id: 'databases',
        label: 'Databases',
        renderCell: row => filterStringEvidence(row.evidences, 'database'),
      },
      {
        id: 'textMining',
        label: 'Text mining',
        renderCell: row => filterStringEvidence(row.evidences, 'text mining'),
      },
      {
        id: 'homology',
        label: 'Homology',
        renderCell: row => filterStringEvidence(row.evidences, 'by homology'),
      },
    ],
  },
};

const Section = ({ ensgId, symbol, data }) => {
  const [source, setSource] = useState('intact');
  const [evidenceId, setEvidenceId] = useState(0);

  const [intactData, setIntactData] = useState([]);
  const [intactCount, setIntactCount] = useState(0);
  const [intactEvidence, setIntactEvidence] = useState([]);

  const [signorData, setSignorData] = useState([]);
  const [signorCount, setSignorCount] = useState(0);
  const [signorEvidence, setSignorEvidence] = useState([]);

  const [reactomeData, setReactomeData] = useState([]);
  const [reactomeCount, setReactomeCount] = useState(0);
  const [reactomeEvidence, setReactomeEvidence] = useState([]);

  const [stringData, setStringData] = useState([]);
  const [stringCount, setStringCount] = useState(0);

  const index = 0;
  const size = 10;
  const sources = [
    { label: 'IntAct', id: 'intact', countType: 'molecular interactions' },
    {
      label: 'Signor',
      id: 'signor',
      countType: 'directional, causal interactions',
    },
    {
      label: 'Reactome',
      id: 'reactome',
      countType: 'pathway-based interactions',
    },
    { label: 'String', id: 'string', countType: 'functional interactions' },
  ];

  const handleChange = (event, tabId) => {
    setSource(tabId);
  };

  useEffect(
    () => {
      fetchInteractions(ensgId, source, index, size).then(res => {
        if (res.data.target.interactions) {
          setIntactData(res.data.target.interactions.rows);
          setIntactCount(res.data.target.interactions.count);
          setIntactEvidence(res.data.target.interactions.rows[0].evidences);
        }
      });

      fetchInteractions(ensgId, 'signor', index, size).then(res => {
        if (res.data.target.interactions) {
          setSignorData(res.data.target.interactions.rows);
          setSignorCount(res.data.target.interactions.count);
          setSignorEvidence(res.data.target.interactions.rows[0].evidences);
        }
      });

      fetchInteractions(ensgId, 'reactome', index, size).then(res => {
        if (res.data.target.interactions) {
          setReactomeData(res.data.target.interactions.rows);
          setReactomeCount(res.data.target.interactions.count);
          setReactomeEvidence(res.data.target.interactions.rows[0].evidences);
        }
      });

      fetchInteractions(ensgId, 'string', index, size).then(res => {
        if (res.data.target.interactions) {
          setStringData(res.data.target.interactions.rows);
          setStringCount(res.data.target.interactions.count);
        }
      });
    },
    [ensgId]
  );
  return (
    <>
      {/* Interaction Resource */}
      <Tabs
        value={source}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {sources.map((s, i) => {
          const count =
            s.id === 'intact'
              ? intactCount
              : s.id === 'signor'
              ? signorCount
              : s.id === 'reactome'
              ? reactomeCount
              : s.id === 'string'
              ? stringCount
              : 0;
          return (
            <Tab
              label={
                <>
                  <Typography variant="h6">{s.label}</Typography>
                  {/* <Typography variant="caption" display="block" gutterBottom>
                    {s.version}
                  </Typography> */}
                  <Typography variant="body2" gutterBottom>
                    {count} {s.countType}
                  </Typography>
                </>
              }
              value={s.id}
              key={i}
            />
          );
        })}
      </Tabs>

      <div style={{ marginTop: '30px' }}>
        {/* intact stuff */}
        {source === 'intact' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.intact.interactions}
                rows={intactData}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
                hover
                selected
                onRowClick={(r, i) => {
                  {
                    /* setEvidenceId(i); */
                  }
                  setIntactEvidence(r.evidences);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            <Grid item xs={12} md={7}>
              <DataTable
                showGlobalFilter
                columns={columns.intact.evidence}
                rows={intactEvidence}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
              />
            </Grid>
          </Grid>
        )}

        {/* signor stuff */}
        {source === 'signor' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.signor.interactions}
                rows={signorData}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
                hover
                selected
                onRowClick={(r, i) => {
                  console.log(i, r);
                  setSignorEvidence(r.evidences);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            <Grid item xs={12} md={7}>
              <DataTable
                showGlobalFilter
                columns={columns.signor.evidence}
                rows={signorEvidence}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
              />
            </Grid>
          </Grid>
        )}

        {/* reactome stuff */}
        {source === 'reactome' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              {/* table 1: interactions */}
              <DataTable
                showGlobalFilter
                columns={columns.reactome.interactions}
                rows={reactomeData}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
                hover
                selected
                onRowClick={(r, i) => {
                  setReactomeEvidence(r.evidences);
                }}
                rowIsSelectable
              />
            </Grid>

            {/* table 2: evidence */}
            <Grid item xs={12} md={7}>
              <DataTable
                showGlobalFilter
                columns={columns.reactome.evidence}
                rows={reactomeEvidence}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
              />
            </Grid>
          </Grid>
        )}

        {/* string stuff */}
        {source === 'string' && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* table 1: this is the only table and will need to be a HEATMAP */}
              <DataTable
                showGlobalFilter
                columns={columns.string.interactions}
                rows={stringData}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-string`}
                hover
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(Section);