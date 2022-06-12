import globals from '../util/globals';
import jwtAxios from '../util/jwtAxios';
import msgNotify from '../util/notify';
import { company_details } from './../modal/company_details';


export class CompanyState{
    company: company_details[] = [];
}

export enum compActionType{
    downloadCompanies = "downloadCompanies",
    deleteCompany = "deleteCompany",
    updateCompany = "updateCompany",
    addCompany = "addCompany",
}

export interface compAction{
    type: compActionType,
    payload?: any,
}


export function downloadCompanies(companies: company_details[]):compAction{
    return {type: compActionType.downloadCompanies, payload:companies}
}

export function deleteCompanies(companyId:number):compAction{
    return {type: compActionType.deleteCompany, payload:companyId}
}

export function updateCompanies(company:company_details):compAction{
    return {type: compActionType.updateCompany, payload:company}
}

export function addCompany(company:company_details):compAction{
    return {type: compActionType.addCompany, payload:company}
}

export function CompanyReducer (currentState: CompanyState = new CompanyState, action: compAction):CompanyState{
    const newState = {...currentState};

    switch(action.type){
        case compActionType.downloadCompanies:
            newState.company = action.payload;
        break;

        case compActionType.deleteCompany:
            var companyId = action.payload;
            jwtAxios.delete(globals.urls.deleteCompany + companyId)
            .then (response=>{
                if(response.status==200){
                    msgNotify.success("Company deleted sucsefully")
                    newState.company.splice(action.payload, 1)
                }
            }).catch(err=>{
                msgNotify.error(err)
            })
        break;

        case compActionType.updateCompany:
            newState.company.push(action.payload) 
        break;

        case compActionType.addCompany:
            jwtAxios.post(globals.urls.addCompany)
            .then (response=>{
                if(response.status==200){
                    msgNotify.success("Company added sucsefully")
                    newState.company.push(action.payload)
                }
            }).catch(err=>{
                msgNotify.error(err)
            })
        break;
    }
    return newState;
}