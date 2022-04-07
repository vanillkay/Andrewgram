export const a11yProps = (
  index: number
): { id: string; 'aria-controls': string } => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});
