export interface LinkTabProps {
  id: string;
  label: string;
  'aria-controls': string;
}

export interface TabPanelProps {
  children: JSX.Element;
  [x: string]: any;
  value: number;
  index: number;
}
