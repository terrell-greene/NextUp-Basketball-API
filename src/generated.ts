/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "./context"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Date";
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "DateTime";
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Upload";
    password<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Password";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    password<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Password";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateSessionInput: { // input type
    courtId: string; // ID!
    end: any; // DateTime!
    start: any; // DateTime!
  }
  JoinUnjoinSessionInput: { // input type
    sessionId: string; // ID!
  }
  LoginInput: { // input type
    password: string; // String!
    username: string; // String!
  }
  SignUpInput: { // input type
    avatar?: any | null; // Upload
    confirmPassword: any; // Password!
    fullName: string; // String!
    password: any; // Password!
    username: string; // String!
  }
  UpdateSessionInput: { // input type
    end?: any | null; // DateTime
    sessionId: string; // ID!
    start?: any | null; // DateTime
  }
}

export interface NexusGenEnums {
  CourtType: "Indoor" | "Outdoor"
}

export interface NexusGenRootTypes {
  Address: { // root type
    city: string; // String!
    country: string; // String!
    state: string; // String!
    street: string; // String!
    streetNumber: string; // String!
    timeZone: string; // String!
    zipCode: string; // String!
  }
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Coords: { // root type
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Court: { // root type
    address: NexusGenRootTypes['Address']; // Address!
    coords: NexusGenRootTypes['Coords']; // Coords!
    id: string; // String!
    name: string; // String!
    numberOfCourts: string; // String!
    phone: string; // String!
    type: NexusGenEnums['CourtType'][]; // [CourtType!]!
  }
  Mutation: {};
  Query: {};
  Session: { // root type
    attending: NexusGenRootTypes['User'][]; // [User!]!
    coords: NexusGenRootTypes['Coords']; // Coords!
    court: NexusGenRootTypes['Court']; // Court!
    createdBy: NexusGenRootTypes['User']; // User!
    end: any; // DateTime!
    id: string; // String!
    start: any; // DateTime!
    timeZone: string; // String!
  }
  User: { // root type
    avatarUrl?: string | null; // String
    fullName: string; // String!
    id: string; // String!
    username: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Date: Date;
  DateTime: DateTime;
  Password: any;
  Upload: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CreateSessionInput: NexusGenInputs['CreateSessionInput'];
  JoinUnjoinSessionInput: NexusGenInputs['JoinUnjoinSessionInput'];
  LoginInput: NexusGenInputs['LoginInput'];
  SignUpInput: NexusGenInputs['SignUpInput'];
  UpdateSessionInput: NexusGenInputs['UpdateSessionInput'];
  CourtType: NexusGenEnums['CourtType'];
}

export interface NexusGenFieldTypes {
  Address: { // field return type
    city: string; // String!
    country: string; // String!
    formattedAddress: string; // String!
    state: string; // String!
    street: string; // String!
    streetNumber: string; // String!
    timeZone: string; // String!
    zipCode: string; // String!
  }
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Coords: { // field return type
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Court: { // field return type
    address: NexusGenRootTypes['Address']; // Address!
    coords: NexusGenRootTypes['Coords']; // Coords!
    id: string; // String!
    name: string; // String!
    numberOfCourts: string; // String!
    phone: string; // String!
    type: NexusGenEnums['CourtType'][]; // [CourtType!]!
  }
  Mutation: { // field return type
    createSession: NexusGenRootTypes['Session']; // Session!
    joinSession: NexusGenRootTypes['Session']; // Session!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    unjoinSession: NexusGenRootTypes['Session']; // Session!
    updateSession: NexusGenRootTypes['Session']; // Session!
  }
  Query: { // field return type
    courts: NexusGenRootTypes['Court'][]; // [Court!]!
    sessions: NexusGenRootTypes['Session'][]; // [Session!]!
  }
  Session: { // field return type
    attending: NexusGenRootTypes['User'][]; // [User!]!
    coords: NexusGenRootTypes['Coords']; // Coords!
    court: NexusGenRootTypes['Court']; // Court!
    createdBy: NexusGenRootTypes['User']; // User!
    date: string; // String!
    end: any; // DateTime!
    id: string; // String!
    numberAttending: number; // Int!
    start: any; // DateTime!
    times: string; // String!
    timeZone: string; // String!
  }
  User: { // field return type
    avatarUrl: string | null; // String
    fullName: string; // String!
    id: string; // String!
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createSession: { // args
      input: NexusGenInputs['CreateSessionInput']; // CreateSessionInput!
    }
    joinSession: { // args
      input: NexusGenInputs['JoinUnjoinSessionInput']; // JoinUnjoinSessionInput!
    }
    login: { // args
      input: NexusGenInputs['LoginInput']; // LoginInput!
    }
    signup: { // args
      input: NexusGenInputs['SignUpInput']; // SignUpInput!
    }
    unjoinSession: { // args
      input: NexusGenInputs['JoinUnjoinSessionInput']; // JoinUnjoinSessionInput!
    }
    updateSession: { // args
      input: NexusGenInputs['UpdateSessionInput']; // UpdateSessionInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Address" | "AuthPayload" | "Coords" | "Court" | "Mutation" | "Query" | "Session" | "User";

export type NexusGenInputNames = "CreateSessionInput" | "JoinUnjoinSessionInput" | "LoginInput" | "SignUpInput" | "UpdateSessionInput";

export type NexusGenEnumNames = "CourtType";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Date" | "DateTime" | "Float" | "ID" | "Int" | "Password" | "String" | "Upload";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}