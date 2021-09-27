const getCurrentMonth = () => {
    const stringMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date();
    return stringMonths[currentDate.getMonth()];
}

export default getCurrentMonth;