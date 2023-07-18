import { ILOANCardStorageState } from "./storage";
import { ILOANCardConfigState } from "./configs";
import { SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";


export interface ILOANCardState{
  configs: ILOANCardConfigState;
  storage: ILOANCardStorageState;
}

export interface ILOANCardCase
  extends ValidateSliceCaseReducers<ILOANCardState, SliceCaseReducers<ILOANCardState>>{}
