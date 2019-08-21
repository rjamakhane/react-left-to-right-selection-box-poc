const enableSaveButton = (addedFields, removedFields) => {
    let addedItems = _.filter(addedFields, function (item) {
        return _.isEmpty(item.demo_fieldsyncid);
    });
    if (addedItems.length || removedFields.length) {
        return true;
    }
    else {
        return false;
    }
}

const parseFetchedSelectedFields = (selectedFields) => {
    let parsedSelectedFields = _.map(selectedFields, (item) => {
        return {
            "demo_fieldmetadataid": item["fm.demo_fieldmetadataid"],
            "demo_displayname": item["fm.demo_displayname"],
            "demo_name": item["fm.demo_name"],
            "demo_fieldsyncid": item.demo_fieldsyncid
        }
    });

    return parsedSelectedFields;
}

export const UtilService = {
    enableSaveButton,
    parseFetchedSelectedFields
};