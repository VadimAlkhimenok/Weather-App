export const getCurrentDate = () => {
    let today = new Date();
    let date = `${ today.getDate() }-${ today.getMonth() }-${ today.getFullYear() }`;
    return `${ date }`;
};
