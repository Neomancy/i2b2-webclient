import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';

import { MaterialSymbol } from 'react-material-symbols';


const NAVIGATION = [
    {
        segment: 'general',
        title: 'General Info',
        icon: <MaterialSymbol icon="description" size={25} grade={-25}  />
    },
    {
        segment: 'features',
        title: 'Model Features',
        icon: <MaterialSymbol icon="view_list" size={25} grade={-25}  />
    },
    {
        segment: 'details',
        title: 'Model Details',
        icon: <MaterialSymbol icon="area_chart" size={25} grade={-25}  />
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true},
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});




function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}
        >
            <p>This term is a computational phenotype. Computational phenotypes use machine learning algorithms to assign a probability to patients that estimates the likelihood that they have a phenotype.</p>
            <Typography sx={{fontWeight:'bold'}}>This computational phenotype was validated with manual chart review and found to have a positive predictive value (PPV) of 0.937 and a recall of 0.724.</Typography>

            <Divider textAlign="left" sx={{width:'90%', margin:'2rem'}}></Divider>

            <Typography variant="h6" color='primary'>Introduction to Computational Phenotypes</Typography>

            <p>
                <Typography>Many patients with a diagnosis code in the electronic health record (EHR) do not actually have the disease. The raw diagnosis codes thus have low “precision” or low “positive predictive value” (PPV) for predicting the patient’s true condition or “phenotype”. Most diagnosis codes have this problem to varying degrees. One consequence of this is that clinical trials overestimate the number of eligible patients from the EHR. As a result, the trials have low yield in recruiting patients and are slow or unable to meet enrollment targets.</Typography>
            </p>
            <p>
                <Typography>Various phenotyping approaches (“algorithms”) are used to filter the patients to increase precision. However, these can introduce biases and unintentionally remove patients who truly have the phenotype, thereby lowering the “recall”. </Typography>
            </p>
            <p>
                <Typography>Rule-based algorithms leverage clinical knowledge to develop a set of inclusion and exclusion criteria for selecting the correct patients. However, these can be expensive and labor intensive to create and implement because of the amount of manual patient chart review involved. The rules-based approach also often overlooks the complexities, data quality problems, and biases of EHR data that are unique to each organization.</Typography>
            </p>
            <p>
                <Typography>Computational phenotypes use machine learning algorithms to assign a probability to patients that estimates the likelihood that they have a phenotype. This can be done in a scalable way, which minimizes the amount of manual work, enables fine-tuning at each site, and provides more control over the tradeoff between precision and recall.</Typography>
            </p>


            <Divider textAlign="left" sx={{width:'90%', margin:'2rem'}}></Divider>

            <Typography variant="h6" color='primary'>Computational Phenotypes in i2b2</Typography>

            <p>
                <Typography>A simple approach to addressing the low precision problem of diagnosis codes is to select for patients with more than one occurrence of the code. The idea is that if the patient truly has the diagnosis, it will be coded at multiple clinical encounters. In contrast, if the code was incorrectly entered for the patient, or the code was used for some reason other than to assign a diagnosis to the patient (e.g., to bill for a diagnostic test), then it might only appear once or very few times.</Typography>
            </p>
            <p>
                <Typography>The machine learning based approach to computational phenotypes in i2b2 is based on three innovations:</Typography>
                <Typography>
                    <ol>
                        <li><u>Normalizing for healthcare utilization.</u> The algorithm builds on the idea that patients who truly have a phenotype will have multiple occurrences of the diagnosis code. It extends it by incorporating healthcare utilization, measured by the number of distinct dates in which a patient was assigned a diagnosis code in the EHR. Patients with greater utilization would be expected to have more occurrences of the diagnosis code if they truly had the phenotype. Similarly, patients without the phenotype would also be more likely to have the code by random chance. The machine learning method, called PheNorm, is described in</li>
                        <li><u>Automating model cutoff (unsupervised clustering) to reduce the need for manual chart review.</u> PheNorm enables ranking patients based on the likelihood that they have the phenotype. This work was further developed with an unsupervised approach to determining a cutoff to assign the phenotype to patients. This greatly reduces the amount of manual chart review needed. Instead of using chart review to fine-tune the cutoff point, it is only needed at the end to determine the accuracy of the algorithm. This method, called multimodal automated phenotyping (MAP), is described in</li>
                        <li><u>Automating feature selection rather than relying on clinical experts.</u> PheNorm and MAP only combine healthcare utilization and the phenotypes’ diagnosis, either coded in the EHR or appearing by name in clinical notes. An additional algorithm, clinical knowledge extraction via sparse embedding regression (KESER), identifies related features that can also be incorporated into KOMAP to create more accurate and robust computational phenotypes. This is done automatically, by looking for features in the EHR that often co-occur with the diagnosis code, without the need for clinical experts to generate these feature lists manually.</li>
                    </ol>
                </Typography>
            </p>
            <p>
            </p>
            <p>
                <Typography></Typography>
            </p>
            <p>
                <Typography></Typography>
            </p>



            <Divider textAlign="left" sx={{width:'90%', margin:'2rem'}}></Divider>

            <Typography>Dashboard content for {pathname}</Typography>




        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function RootLayout(props) {
    const { window } = props;

    const [pathname, setPathname] = React.useState('/general');

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: '',
                title: 'Computed Phenotype Information',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout>
                <Paper  elevation={3} sx={{
                    width: '100%',
                    padding: '.8rem',
                    position:'sticky',
                    top:'65px'
                }}
                >
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant="h4" >Asthma</Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography variant="h6" align='right' sx={{marginTop: '.6rem'}}>PheCode:495</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

export default RootLayout;