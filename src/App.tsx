import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { Layout } from './components/Layout';
import { theme } from './theme';
import { PersonalData } from './components/PersonalData';
import { Stepper } from './components/Stepper';
import { BankInfo } from './components/BankInfo';
import { Description } from './components/Description';

const steps = [
  {
    id: 1,
    title: 'Personal Data',
    content: PersonalData,
  },
  {
    id: 2,
    title: 'Bank Accounts',
    content: BankInfo,
    optional: true,
  },
  {
    id: 3,
    title: 'More Info',
    content: Description,
  }
];

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>
      <Stepper formId="react-stepper" steps={steps} />
    </Layout>
  </ThemeProvider>
);
