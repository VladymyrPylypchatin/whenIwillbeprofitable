const getUsersUpToMonth = (data, month) => {
    const sum = data.reduce((acc, elem) => {
        if (elem.month < month) return acc + elem.newUsers - elem.lostUsers;
        else return acc;
    }, 0);

    return sum;
};

export const getProjectionData = (options) => {

    const { timeFrame, marketingSpend, cac, churnRate, marketingGrowthAfterProfit, developmentSpend, price } = options;
    const dataEnteries = [];

    for (let i = 0; i < timeFrame; i++) {
        let expenses = 0;
        let userGrowth = 0;

        if (i <= 3) {
            expenses = developmentSpend;
        }
        if (i > 3) {
            userGrowth = marketingSpend / cac;
            expenses = developmentSpend + marketingSpend;
        }

        const totalUsers = getUsersUpToMonth(dataEnteries, i + 1);
        const userChurn = totalUsers * churnRate;

        dataEnteries.push({
            expenses,
            month: i + 1,
            newUsers: Math.round(userGrowth),
            lostUsers: Math.round(userChurn),
            totalUsers: Math.round(totalUsers + userGrowth - userChurn)
        });
    }


    let monthsToProfit = 0;
    let monthToReturnMoney = 0;
    let moneyTillProfit = 0;
    let totalMade = 0;
    let totalExpenses = 0;
    let usersToProfit = 0;
    let earnedYearAfterProfit = 0;

    dataEnteries.forEach((elem, i) => {
        const revenue = elem.totalUsers * price;
        totalMade += revenue;
        totalExpenses += elem.expenses;
        if (totalMade >= totalExpenses && !monthToReturnMoney) monthToReturnMoney = i + 1;
        if (revenue >= elem.expenses && !monthsToProfit) {
            monthsToProfit = i + 1;
            usersToProfit = elem.totalUsers
        }

        if (revenue < elem.expenses) {
            moneyTillProfit += elem.expenses
        }

        if (revenue >= elem.expenses && i < monthsToProfit - 1 + 12) earnedYearAfterProfit += revenue - elem.expenses;
    });

    return {
        projection: dataEnteries,
        monthToReturnMoney,
        monthsToProfit,
        usersToProfit,
        moneyTillProfit
    }
}