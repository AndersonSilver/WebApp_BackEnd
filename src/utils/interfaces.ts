export interface Skill {
  id: string;
  name: string;
  inactivity_time: number;
  weight_active: number;
  weight_inactive: number;
  waiting_time: number;
  balancer: boolean;
  sla: any;
}

export interface ArrayIdsAndNames {
  idFrom: string;
  name: string;
  idTo: string;
  content?: string;
}

export interface SkillsToAndFrom {
  skillIdFrom: string;
  skillIdTo: string;
}

export interface arrayCSVTabulation {
  conversation: string;
  protocol: string;
  text: string;
  privateNote: string;
}

export interface arrayCSVPendency {
  protocol: string;
  text: string;
}

export interface UserRequest {
  payload: any;
  name: string;
  skillId: string;
  tabId: string;
  id: string;
}

export interface Group {
  id: string;
  name: string;
  type: string;
  children: (Field | FieldFile | Group)[];
}

export interface Field {
  id: string;
  name: string;
  isKey: boolean;
  isRequired: boolean;
  type: string;
  fieldType: string;
  settings: { placeholder: string };
}

export interface FieldFile {
  id: string;
  name: string;
  isKey: boolean;
  isRequired: boolean;
  type: string;
  fieldType: string;
  settings: {
    sizeLimit: { max: number; enabled: boolean };
    allowedTypes: string[];
  };
}

export interface FieldProps {
  uuid?: string;
  id: string;
  name: string;
  width?: number;
  isKey?: boolean;
  show?: any[];
  isRequired?: boolean;
  type: any;
  fieldType: string;
  children?: FieldProps[];
  settings: {
    autofillParam?: string;
    detail?: string;
    placeholder?: string;
    sizeLimit?: { max: number; enabled: boolean };
    allowedTypes?: string[];
  };
}

type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | JSONValue[];

export interface Ticket {
  ticket: {
    [key: string]: JSONValue;
  };
  targetField: string;
  targetGroupField: string;
}

export interface LoginServiceBody {
  slug: string;
  email: string;
  password: string;
  recaptcha_token?: string;
}

export interface Skills {
  id?: string;
  name: string;
}
