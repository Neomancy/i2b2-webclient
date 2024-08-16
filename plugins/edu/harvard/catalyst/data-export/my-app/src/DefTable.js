import './css/tableDef.css';
import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridCellModes
} from '@mui/x-data-grid';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';

import ModalLoad from "./modalLoad";
import ModalSave from "./modalSave";

const columns = [
    {
        field: 'order',
        headerName: 'order',
        width: 1,
        sortable: true,
        sortingOrder: "ASC",
        hideSortIcons: true,
        disableReorder: true

    },
    {
        field: 'reorder',
        headerName: "Ordering",
        width: "80",
        resizable: false,
        type: 'actions',
        getActions: ({ row }) => {
            let actions = [];
            if (row.demographic) return actions;
            if (row.order > 1) {
                actions.push(
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Move row up">
                                <ArrowUpIcon />
                            </Tooltip>
                        }
                        label="Move row up"
                        onClick={() => alert("up")}
                    />
                );
            }
            actions.push(
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Move row down">
                            <ArrowDownIcon />
                        </Tooltip>
                    }
                    label="Move row down"
                    onClick={() => alert("down") }
                />
            );
            return actions;
        }
    },
    {
        field: "included",
        headerName: "Include",
        width: 70,
        editable: true,
        sortable: false,
        type: "boolean",
        resizable: false,
        disableColumnMenu: true,
        disableReorder: true,
        hideSortIcons: true,
        disableColumnSorting: true,
        headerAlign: "center"
    },
    {
        field: 'name',
        headerName: 'Concept',
        minWidth: 450,
        flex:1,
        sortable: false,
        disableColumnSorting: true,
        disableColumnMenu: false,
    },
    {
        field: 'constraint',
        headerName: 'Constraints',
        width: 130,
        resizable: false,
        disableColumnMenu: true,
        disableReorder: true,
        disableColumnSorting: true,
        display: "flex",
        hideSortIcons: true,
        sortable: false,
//        headerAlign: "center"
    }, {
        field: 'aggregation',
        headerName: 'Aggregation',
        width: 300,
        resizable: false,
        disableColumnMenu: true,
        disableReorder: true,
        display: "flex",
        hideSortIcons: true,
        disableColumnSorting: true,
        sortable: false,
//        headerAlign: "center",
        editable: true,
        type: "singleSelect",
        valueOptions: ({ row }) => {
            if (row.demographic) {
                return ["Value"];
            } else {
                return [
                    "Existence (Yes/No)",
                    "Date (First)",
                    "Date (Most Recent)",
                    "Count",
                    "All Concepts (Names/Text)",
                    "Most Frequent Concept (Names/Text)",
                    "All Concepts (Codes)",
                    "Most Frequent Concept (Codes)",
                    "Minimum Value",
                    "Maximum Value",
                    "Median Value",
                    "Average Value",
                    "Mode (Most Frequent Value)",
                    "List of All Values"
                ];
            }
        }
    }
];

const rows = [
    { order: 1, id:123, name: "Patient Number", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 2, id:122, name: "Gender", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 3, id:121, name: "Age", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 4, id:111, name: "Race", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 5, id:58, name: "Ethnicity", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 6, id:35, name: "Vital Status", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 7, id:36, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Maximum Value"},
    { order: 8, id:25, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Mode (Most Frequent Value)"},
    { order: 9, id:136, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Date (Most Recent)"},
    { order: 10, id:125, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Average Value"}
];

export default function DataTable(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showLoad, setLoadViz] = React.useState(false);
    const handleLoadOpen = () => setLoadViz(true);
    const handleLoadClose = () => setLoadViz(false);
    const [showSave, setSaveViz] = React.useState(false);
    const handleSaveOpen = () => setSaveViz(true);
    const handleSaveClose = () => setSaveViz(false);




    const [cellModesModel, setCellModesModel] = React.useState({});
    const handleCellClick = React.useCallback(
        (params, event) => {
            if (!params.isEditable) return;
            // Ignore portal
            if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) return;

            if (params !== undefined) {
                if (params.field === "aggregation" && params.row.demographic === true) {
                    event.preventDefault();
                    return;

                }
            }
            setCellModesModel((prevModel) => {
                let ret = {
                    ...Object.keys(prevModel).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: Object.keys(prevModel[id]).reduce(
                                (acc2, field) => ({
                                    ...acc2,
                                    [field]: {mode: GridCellModes.View},
                                }),
                                {},
                            ),
                        }),
                        {},
                    ),
                    // Revert the mode of the other cells from other rows
                    ...Object.keys(prevModel).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: Object.keys(prevModel[id]).reduce(
                                (acc2, field) => ({
                                    ...acc2,
                                    [field]: {mode: GridCellModes.View},
                                }),
                                {},
                            ),
                        }),
                        {},
                    )
                };

                return {
                    ...ret,
                    [params.id]: {
                        // Revert the mode of other cells in the same row
                        ...Object.keys(prevModel[params.id] || {}).reduce(
                            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
                            {},
                        ),
                        [params.field]: { mode: GridCellModes.Edit },
                    },
                };
            });
        },
        [],
    );

    const handleCellModesModelChange = React.useCallback(
        (newModel) => {
            setCellModesModel(newModel);
        },
        [],
    );




    return (
        <div>
            <ModalLoad handleClose={handleLoadClose} open={showLoad}/>
            <ModalSave handleClose={handleSaveClose} open={showSave}/>

            <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                style={{width:"76%", margin:"auto", marginBottom: "16px"}}
            >
                <Button variant="contained" onClick={handleLoadOpen}>Load Previous Definition</Button>
                <Button variant="contained" onClick={handleSaveOpen}>Save Current Definition</Button>
                <Button variant="contained" onClick={()=>props.props.tabChanger({},1)}>Request Export With This Definition</Button>
            </Stack>
            <div style={{ height:"60%", width: '76%', margin:"auto", background:"#077cf982", padding:"5px", borderRadius:"5px"}}>
                <p style={{fontStyle:"italic", fontWeight:"bold"}}>Drag a concept onto the grid to add it to the list</p>
                <DataGrid
                    style={{background:"white"}}
                    rows={rows}
                    columns={columns}
                    showCellVerticalBorder={true}
                    hideFooterSelectedRowCount={true}
                    columnVisibilityModel={{order: false}}
                    disableColumnSelector={true}
                    cellModesModel={cellModesModel}
                    onCellModesModelChange={handleCellModesModelChange}
                    onCellClick={handleCellClick}
                    onCellDoubleClick={handleCellClick}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 4 },
                        },
                        sorting: {
                            sortModel: [{field:'order',sort:'asc'}]
                        }
                    }}
                    pageSizeOptions={[4, 8, 16]}
                />
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="flex-begin"
                    alignItems="center"
                    style={{width:"100%", margin:"auto", marginBottom: "4px"}}
                >
                    <Button
                        sx={{
                            position:"absolute",
                            transform: "translate(10px, -75%)"
                        }}
                        variant="outlined"
                        onClick={handleLoadOpen}
                    >Preview Example Data</Button>
                </Stack>
            </div>

        </div>
    );
}