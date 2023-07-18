import { ComponentType, ReactNode } from 'react';

export interface IBadge {
  color: string;
  value: string;
}

export interface IRoute {
  code?: string,
  path?: string;
  icon?: ReactNode;
  iconText?: string;
  name?: string;
  label?: string;
  component?: ComponentType<any> | null;
  badge?: IBadge;
  auth?: string[];
  children?: IRoute[];
  type?: string;
  exact?: boolean;
  isRoute?: boolean;
}
