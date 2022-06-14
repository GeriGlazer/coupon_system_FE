import { customer_details } from '../modal/customer_details';

export class CustomerState{
    customer: customer_details[] = [];
}

export enum CustomerActionType{
    addCustomer = "addCustomer",
    deleteCustomer = "deleteCustomer",
    downloadCustomers = "downloadCustomers",
    updateCustomer = "updateCustomer",
    removeAll = "removeAll"
}

export interface customerAction{
    type: CustomerActionType,
    payload?: any,
}

export function addCustomer(customer:customer_details):customerAction{
    return {type: CustomerActionType.addCustomer, payload:customer}
}

export function deleteCustomer(coustomerId: number):customerAction{
return {type: CustomerActionType.deleteCustomer, payload:coustomerId} 
}

export function updateCustomer(cutomer: customer_details):customerAction{
    return {type: CustomerActionType.updateCustomer, payload:cutomer}
}

export function downloadCustomers(customers:customer_details[]):customerAction{
    return {type: CustomerActionType.downloadCustomers, payload:customers}
}

export function RemoveAll():customerAction{
    return { type: CustomerActionType.removeAll}
}

export function CustomerReducer (currentState: CustomerState = new CustomerState, action: customerAction): CustomerState{
    const newState = {...currentState}

    switch(action.type) {
        case CustomerActionType.addCustomer:
            newState.customer.push(action.payload);
        break;
        case CustomerActionType.updateCustomer:
            var updateCustomer = {...newState.customer}.filter(item=>item.id!==action.payload.id);
            updateCustomer.push(action.payload);
            newState.customer = updateCustomer;
        break;
        case CustomerActionType.downloadCustomers:
            newState.customer = action.payload;
        break;
        case CustomerActionType.deleteCustomer:
            newState.customer = newState.customer.filter(item=>item.id!==action.payload);
        break;
        case CustomerActionType.removeAll:
            newState.customer = [];
        break;
    }
    return newState;
}
