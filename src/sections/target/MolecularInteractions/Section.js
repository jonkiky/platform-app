import React, { Fragment } from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Button, ListTooltip } from 'ot-ui';

import DataTable from '../../../components/Table/DataTable';
import { MethodIconText, MethodIconArrow } from './custom/MethodIcons';

import tempData from './temp/data.json';

// import InteractionsPlot from './custom/InteractionsPlot';
// import InteractionsTable from './custom/InteractionsTable';
// import SourceChip from './custom/SourceChip';
// import SourceCheckbox from './custom/SourceCheckbox';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

// class Section extends React.Component {
//   state = {
//     interactionTypes: {
//       enzymeSubstrate: true,
//       pathways: true,
//       ppi: true,
//     },
//     selectedUniprotIds: [],
//     tooltip: {
//       open: false,
//       anchorData: null,
//       anchorEl: null,
//     },
//   };
//   handleInteractionTypeChange = interactionType => event => {
//     const { interactionTypes } = this.state;
//     this.setState({
//       interactionTypes: {
//         ...interactionTypes,
//         [interactionType]: event.target.checked,
//       },
//     });
//   };
//   handleProteinClick = uniprotId => {
//     const { selectedUniprotIds } = this.state;
//     if (selectedUniprotIds.indexOf(uniprotId) >= 0) {
//       this.setState({
//         selectedUniprotIds: selectedUniprotIds.filter(d => d !== uniprotId),
//       });
//     } else {
//       this.setState({ selectedUniprotIds: [...selectedUniprotIds, uniprotId] });
//     }
//   };
//   handleMouseOver = d => {
//     const { interactionTypes } = this.state;
//     const anchorEl = document.querySelector(`#node-${d.uniprotId}`);
//     const data = [
//       { label: 'Protein', value: d.symbol },
//       {
//         label: 'Interactors (within selection)',
//         value: d.interactorsCount,
//       },
//       {
//         label: 'Interactions by type (within selection)',
//         value: (
//           <React.Fragment>
//             {interactionTypes.enzymeSubstrate ? (
//               <SourceChip
//                 sourceType="enzymeSubstrate"
//                 label={`Enzyme-substrate (${d.interactionsEnzymeSubstrateCount})`}
//               />
//             ) : null}
//             {interactionTypes.pathways ? (
//               <SourceChip
//                 sourceType="pathways"
//                 label={`Pathways (${d.interactionsPathwaysCount})`}
//               />
//             ) : null}
//             {interactionTypes.ppi ? (
//               <SourceChip
//                 sourceType="ppi"
//                 label={`PPI (${d.interactionsPPICount})`}
//               />
//             ) : null}
//           </React.Fragment>
//         ),
//       },
//     ];
//     this.setState({
//       tooltip: {
//         open: true,
//         data,
//         anchorEl,
//       },
//     });
//   };
//   handleMouseLeave = () => {
//     this.setState({
//       tooltip: {
//         open: false,
//         data: null,
//         anchorEl: null,
//       },
//     });
//   };
//   componentDidMount() {
//     const { uniprotId } = this.props;
//     this.setState({ selectedUniprotIds: [uniprotId] });
//   }
//   render() {
//     const { classes, symbol, data } = this.props;
//     const { interactionTypes, selectedUniprotIds, tooltip } = this.state;

//     const { nodes: nodesRaw, edges } = data;
//     const edgesWithFilterProperties = edges
//       .map(e => ({
//         ...e,
//         isFilteredSourceType:
//           (interactionTypes.ppi && e.ppiSources.length > 0) ||
//           (interactionTypes.pathways && e.pathwaysSources.length > 0) ||
//           (interactionTypes.enzymeSubstrate &&
//             e.enzymeSubstrateSources.length > 0),
//       }))
//       .map(e => ({
//         ...e,
//         isFilteredWithinSelectedUniprotIds:
//           selectedUniprotIds.length > 1
//             ? selectedUniprotIds.indexOf(e.source) >= 0 &&
//               selectedUniprotIds.indexOf(e.target) >= 0
//             : false,
//         isFilteredWithoutSelectedUniprotIds:
//           selectedUniprotIds.length > 0
//             ? (selectedUniprotIds.indexOf(e.source) >= 0 &&
//                 selectedUniprotIds.indexOf(e.target) < 0) ||
//               (selectedUniprotIds.indexOf(e.target) >= 0 &&
//                 selectedUniprotIds.indexOf(e.source) < 0)
//             : false,
//       }));
//     const edgesFiltered = edgesWithFilterProperties.filter(
//       e => e.isFilteredSourceType
//     );
//     const edgesFilteredWithinSelectedUniprotIds = edgesFiltered.filter(
//       e => e.isFilteredWithinSelectedUniprotIds
//     );
//     const edgesFilteredWithoutSelectedUniprotIds = edgesFiltered.filter(
//       e => e.isFilteredWithoutSelectedUniprotIds
//     );

//     // edgesSelected ignores interactionType filter (for counts on interactionType filters)
//     const edgesSelected =
//       selectedUniprotIds.length > 0
//         ? selectedUniprotIds.length > 1
//           ? edgesWithFilterProperties.filter(
//               e => e.isFilteredWithinSelectedUniprotIds
//             )
//           : edgesWithFilterProperties.filter(
//               e =>
//                 e.isFilteredWithinSelectedUniprotIds ||
//                 e.isFilteredWithoutSelectedUniprotIds
//             )
//         : edgesWithFilterProperties;

//     // edgesDisplayed takes all filters into account (interactionType and selection)
//     const edgesDisplayed = edgesSelected.filter(e => e.isFilteredSourceType);

//     const nodes = nodesRaw.map(n => {
//       const edgesForNode = edgesDisplayed.filter(
//         e => e.source === n.uniprotId || e.target === n.uniprotId
//       );
//       return {
//         ...n,
//         neighbourCount: edgesFiltered.filter(
//           e => e.source === n.uniprotId || e.target === n.uniprotId
//         ).length,
//         neighbourCountWithin: edgesForNode.length,
//         interactorsCount: _.uniq(
//           edgesForNode.map(e =>
//             e.source === n.uniprotId ? e.target : e.source
//           )
//         ).length,
//         interactionsPPICount: edgesForNode.filter(e => e.ppiSources.length > 0)
//           .length,
//         interactionsPathwaysCount: edgesForNode.filter(
//           e => e.pathwaysSources.length > 0
//         ).length,
//         interactionsEnzymeSubstrateCount: edgesForNode.filter(
//           e => e.enzymeSubstrateSources.length > 0
//         ).length,
//         isSelected: selectedUniprotIds.indexOf(n.uniprotId) >= 0,
//         isNeighbourOfSelected:
//           selectedUniprotIds.indexOf(n.uniprotId) < 0 &&
//           edgesFilteredWithoutSelectedUniprotIds.filter(
//             e => e.source === n.uniprotId || e.target === n.uniprotId
//           ).length,
//       };
//     });

//     return (
//       <Grid container>
//         <Grid id="interaction-plot-container" item sm={12} lg={6}>
//           <ListTooltip
//             open={tooltip.open}
//             anchorEl={tooltip.anchorEl}
//             dataList={tooltip.data ? tooltip.data : []}
//             container={document.getElementById('interaction-plot-container')}
//           />
//           <InteractionsPlot
//             {...{
//               nodes,
//               selectedUniprotIds,
//               edgesFiltered,
//               edgesFilteredWithinSelectedUniprotIds,
//               edgesFilteredWithoutSelectedUniprotIds,
//               handleProteinClick: this.handleProteinClick,
//               handleMouseOver: this.handleMouseOver,
//               handleMouseLeave: this.handleMouseLeave,
//               filenameStem: `${symbol}-protein-interactions`,
//             }}
//           />
//         </Grid>
//         <Grid item sm={12} lg={6}>
//           <div>
//             <Typography>Filter by interaction type</Typography>
//             <FormControl component="fieldset" className={classes.formControl}>
//               <FormGroup row>
//                 <FormControlLabel
//                   control={
//                     <SourceCheckbox
//                       sourceType="enzymeSubstrate"
//                       checked={interactionTypes.enzymeSubstrate}
//                       onChange={this.handleInteractionTypeChange(
//                         'enzymeSubstrate'
//                       )}
//                       value="enzymeSubstrate"
//                     />
//                   }
//                   label={`Enzyme-substrate (${
//                     edgesSelected.filter(
//                       e => e.enzymeSubstrateSources.length > 0
//                     ).length
//                   })`}
//                 />
//                 <FormControlLabel
//                   control={
//                     <SourceCheckbox
//                       sourceType="pathways"
//                       checked={interactionTypes.pathways}
//                       onChange={this.handleInteractionTypeChange('pathways')}
//                       value="pathways"
//                     />
//                   }
//                   label={`Pathways (${
//                     edgesSelected.filter(e => e.pathwaysSources.length > 0)
//                       .length
//                   })`}
//                 />
//                 <FormControlLabel
//                   control={
//                     <SourceCheckbox
//                       sourceType="ppi"
//                       checked={interactionTypes.ppi}
//                       onChange={this.handleInteractionTypeChange('ppi')}
//                       value="ppi"
//                     />
//                   }
//                   label={`PPI (${
//                     edgesSelected.filter(e => e.ppiSources.length > 0).length
//                   })`}
//                 />
//               </FormGroup>
//             </FormControl>
//           </div>
//           <br />
//           <Typography>Selection</Typography>

//           {selectedUniprotIds.length > 0 ? (
//             <React.Fragment>
//               {selectedUniprotIds.map(uniprotId => (
//                 <Chip
//                   key={uniprotId}
//                   className={classes.chip}
//                   color="primary"
//                   label={nodes.find(n => n.uniprotId === uniprotId).symbol}
//                   onDelete={() => this.handleProteinClick(uniprotId)}
//                 />
//               ))}
//               {selectedUniprotIds.length > 1 ? (
//                 <Button color="primary" size="small" disableRipple>
//                   Analyse with batch search
//                 </Button>
//               ) : null}
//             </React.Fragment>
//           ) : (
//             <Typography align="center" style={{ padding: '4px' }}>
//               <i>
//                 No selection. Click on proteins on the chart to make a
//                 selection.
//               </i>
//             </Typography>
//           )}

//           <br />
//           <br />
//           <Typography>Interaction details</Typography>
//           <InteractionsTable
//             interactionTypes={interactionTypes}
//             data={edgesDisplayed.map(e => ({
//               ...e,
//               sourceNode: nodes.find(n => n.uniprotId === e.source),
//               targetNode: nodes.find(n => n.uniprotId === e.target),
//             }))}
//           />
//         </Grid>
//       </Grid>
//     );
//   }
// }

const columns = {
  intact: {
    interactions: [
      {
        id: 'interactorBId',
        label: (
          <>
            Interactor B<br />
            <Typography variant="caption">
              Alt ID
              <br />
              Species
            </Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactorBId}
            <br />
            <Typography variant="caption">
              {row.organismB.taxon_id}
              <br />
              {row.organismB.mnemonic}
            </Typography>
          </>
        ),
      },
      {
        id: 'interactionScore',
        label: 'Score',
      },
      {
        id: 'evidences',
        label: 'Interaction evidence',
        renderCell: row => row.evidences.length,
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
    ],
    evidence: [
      {
        id: 'interaction_identifier',
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
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              {row.host_organism_scientific_name}
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
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
      {
        id: 'pubmed_id',
        label: 'Publication',
      },
    ],
  },

  signor: {
    // interactions table columns
    interactions: [
      {
        id: 'interactorAId',
        label: (
          <>
            Interactor A<br />
            <Typography variant="caption">Species (if not human)</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactorAId}
            {row.organismA.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismA.mnemonic}
                </Typography>
              </>
            ) : null}
          </>
        ),
      },
      {
        id: 'interactorBId',
        label: (
          <>
            Interactor B<br />
            <Typography variant="caption">Species (if not human)</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactorBId}
            {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null}
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
            <MethodIconText>A</MethodIconText>
            <MethodIconText>B</MethodIconText>
          </>
        ),
      },
      {
        id: 'evidences',
        label: (
          <>
            Interaction
            <br />
            evidence
          </>
        ),
        renderCell: row => row.evidences.length,
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interaction_identifier',
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
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              Organism: {row.host_organism_scientific_name}
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
        //   exportValue: row => (row.disease ? label(row.disease.name) : naLabel),
      },
      {
        id: 'pubmed_id',
        label: 'Publication',
      },
    ],
  },

  reactome: {
    // interactions table columns
    interactions: [
      {
        id: 'interactorBId',
        label: (
          <>
            Interactor B<br />
            <Typography variant="caption">Species (if not human)</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.interactorBId}
            {row.organismB.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organismB.mnemonic}
                </Typography>
              </>
            ) : null}
          </>
        ),
      },
      {
        id: 'evidences',
        label: <>Interaction evidence</>,
        renderCell: row => row.evidences.length,
      },
    ],

    // evidence table
    evidence: [
      {
        id: 'interaction_identifier',
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
            {row.interaction_type_short_name}
            <br />
            <Typography variant="caption">
              Organism: {row.host_organism_scientific_name}
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
        id: 'pubmed_id',
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
            Interactor B<br />
            <Typography variant="caption">Species (if not human)</Typography>
          </>
        ),
        renderCell: row => (
          <>
            {row.partner}
            {row.organism.mnemonic.toLowerCase() !== 'human' ? (
              <>
                <br />
                <Typography variant="caption">
                  Species: {row.organism.mnemonic}
                </Typography>
              </>
            ) : null}
          </>
        ),
      },
      {
        id: 'overallScore',
        label: 'Overall interaction score',
      },
      {
        id: 'neighbourhood',
        label: 'Neighbourhood',
      },
      {
        id: 'geneFusion',
        label: 'Gene fusion',
      },
      {
        id: 'occurance',
        label: 'Co-occurrance',
      },
      {
        id: 'expression',
        label: 'Co-expression',
      },
      {
        id: 'experiments',
        label: 'Experiments',
      },
      {
        id: 'databases',
        label: 'Databases',
      },
      {
        id: 'textMining',
        label: 'Text mining',
      },
      {
        id: 'homology',
        label: 'Homology',
      },
    ],
  },
};

const Section = ({ ensgId, symbol, data }) => {
  const [source, setSource] = React.useState('intact');
  const [evidenceId, setEvidenceId] = React.useState(0);

  const handleChange = (event, tabId) => {
    setSource(tabId);
  };

  return (
    <>
      {/* Interaction Resource */}
      <Tabs
        value={source}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {tempData.sources.map((s, i) => (
          <Tab
            label={
              <>
                <Typography variant="h6">{s.label}</Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {s.version}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {s.interactions.count} {s.interactions.label}
                </Typography>
              </>
            }
            value={s.id}
            key={i}
          />
        ))}
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
                rows={tempData.data.intact.rows}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-intact`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            <Grid item xs={12} md={7}>
              {/* table 2: evidence */}
              <DataTable
                showGlobalFilter
                columns={columns.intact.evidence}
                rows={tempData.data.intact.rows[evidenceId].evidences}
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
                rows={tempData.data.signor.rows}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-signor`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            <Grid item xs={12} md={7}>
              {/* table 2: evidence */}
              <DataTable
                showGlobalFilter
                columns={columns.signor.evidence}
                rows={tempData.data.signor.rows[evidenceId].evidences}
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
                rows={tempData.data.reactome.rows}
                dataDownloader
                dataDownloaderFileStem={`${symbol}-molecular-interactions-reactome`}
                hover
                selected
                onRowClick={(r, i) => {
                  setEvidenceId(i);
                }}
                rowIsSelectable
              />
            </Grid>

            <Grid item xs={12} md={7}>
              {/* table 2: evidence */}
              <DataTable
                showGlobalFilter
                columns={columns.reactome.evidence}
                rows={tempData.data.reactome.rows[evidenceId].evidences}
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
                rows={tempData.data.string.rows}
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
