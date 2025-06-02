// Populates createdBy fields
function appendField(requestObject: any, fieldName: string, fieldValue: string): any {
  if (Object.keys(requestObject).includes(fieldName)) {
    requestObject[fieldName] = fieldValue;
  }
  for (let key of Object.keys(requestObject)) {
    if (requestObject[key] && typeof requestObject[key] == "object") {
      appendField(requestObject[key], fieldName, fieldValue);
    }
  }
  return requestObject;
}

// Populates createdBy fields
export function appendCreatedBy(requestObject: any, userId: string): any {
  return appendField(requestObject, "createdBy", userId);
}

// Populates tenantId fields
export function appendTenantId(requestObject: any, tenantId: string) {
  return appendField(requestObject, "tenantId", tenantId);
}

// Populates filledBy fields
export function appendFilledBy(requestObject: any, userId: string) {
  return appendField(requestObject, "filledBy", userId);
}