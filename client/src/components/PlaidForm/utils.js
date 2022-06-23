export function hasErrors(errors) {
    for (let field in errors) {
        if (errors[field] !== null) {
            return true;
        }
    }
    return false;
}