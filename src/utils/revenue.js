// Hàm tính toán doanh thu hàng ngày
export const calculateDailyRevenue = (revenueData) => {
    const dailyRevenue = {};
  
    revenueData.forEach((data) => {
      const date = formatDate(data.date);
      if (!dailyRevenue[date]) {
        dailyRevenue[date] = 0;
      }
      dailyRevenue[date] += data.revenue;
    });
  
    return dailyRevenue;
  };
// Hàm tính toán doanh thu hàng tuần
export const calculateWeeklyRevenue = (revenueData) => {
    const weeklyRevenue = {};

    revenueData.forEach((data) => {
        const weekOfYear = getWeekOfYear(data.date);
        if (!weeklyRevenue[weekOfYear]) {
            weeklyRevenue[weekOfYear] = 0;
        }
        weeklyRevenue[weekOfYear] += data.revenue;
    });

    return weeklyRevenue;
};

// Hàm tính toán doanh thu hàng tháng
export const calculateMonthlyRevenue = (revenueData) => {
    const monthlyRevenue = {};

    revenueData.forEach((data) => {
        const monthOfYear = getMonthOfYear(data.date);
        if (!monthlyRevenue[monthOfYear]) {
            monthlyRevenue[monthOfYear] = 0;
        }
        monthlyRevenue[monthOfYear] += data.revenue;
    });

    return monthlyRevenue;
};

// Hàm tính toán doanh thu hàng năm
export const calculateYearlyRevenue = (revenueData) => {
    const yearlyRevenue = {};

    revenueData.forEach((data) => {
        const year = getYear(data.date);
        if (!yearlyRevenue[year]) {
            yearlyRevenue[year] = 0;
        }
        yearlyRevenue[year] += data.revenue;
    });

    return yearlyRevenue;
};

// Hàm lấy tuần trong năm từ ngày
export const getWeekOfYear = (dateString) => {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Hàm lấy tháng trong năm từ ngày
export const getMonthOfYear = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // JavaScript months are 0 indexed
};

// Hàm lấy năm từ ngày
export const getYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
};

// Hàm định dạng ngày theo YYYY-MM-DD
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };