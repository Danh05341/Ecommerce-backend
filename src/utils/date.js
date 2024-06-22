import moment from 'moment-timezone';
const timeZone = 'Europe/London';

export const dateConverterUTC = (date) => {
    let dateObject = new Date(date);
    // Lấy chênh lệch múi giờ hiện tại
    const timezoneOffset = dateObject.getTimezoneOffset();
    // Trừ đi 7 giờ (7 * 60 phút)
    const targetTimezoneOffset = timezoneOffset - (7 * 60);
    // Tạo lại đối tượng Date với chênh lệch múi giờ đã điều chỉnh
    return new Date(dateObject.getTime() + (targetTimezoneOffset * 60000));
}


export const dateConverterPlus7 = (date) => {
    let dateObject = new Date(date);
    // Lấy chênh lệch múi giờ hiện tại
    const timezoneOffset = dateObject.getTimezoneOffset();
    // Cộng thêm 7 giờ (7 * 60 phút)
    const targetTimezoneOffset = timezoneOffset + (7 * 60);
    // Tạo lại đối tượng Date với chênh lệch múi giờ đã điều chỉnh
    return new Date(dateObject.getTime() + (targetTimezoneOffset * 60000));
}