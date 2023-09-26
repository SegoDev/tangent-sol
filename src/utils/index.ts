export const constructEmployeeId = () => {
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // pad with 0s if less than 4 digits
    const randomLetters = Math.random().toString(36).substring(2,4).toUpperCase();
    return `${randomLetters}${randomNumber}`;
}