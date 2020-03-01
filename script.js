function checkCardNumber(cardNumber) {

    const cards = [
            {
                name: 'Mastercard',
                possibleLength: [16],
                keyValues: [51,52,53,54,55,22]
            },
            {
                name: 'Visa',
                possibleLength: [13,16],
                keyValues: [4]
            },
            {
                name: 'American Express',
                possibleLength: [15],
                keyValues: [34,37]
            },
            {
                name: 'JCB',
                possibleLength: [16],
                keyValues: [35]
            },
            {
                name: 'Discover',
                possibleLength: [16],
                keyValues: [60]
            },
            {
                name: 'Diners Club',
                possibleLength: [14],
                keyValues: [30]
            }
        ];

    const cardCompany = () => {
        const str = cardNumber.toString();
        const result = [];

        cards.map(obj => {
            if(obj.possibleLength.indexOf(str.length) >= 0) {
                obj.keyValues.map(value => {
                     if(str.startsWith(value.toString())) return result.push(obj.name);
                });
            }
        });
        return result.length !== 0 ? result : `Nieprawidłowy`;
    }

    const validateCardNum = () => {
        const reversedCardNumber = cardNumber.toString().split('').reverse().map(element => Number(element));
        const doubledOddElements = [];
        const showEvenElements = [];

        reversedCardNumber.filter(function(number, index) {
            if(index % 2 !== 0) {
                return doubledOddElements.push(number*2);
            } else {
                return showEvenElements.push(number);
            }});

        const separateDoubleNumbers = doubledOddElements.map(num => {
            return num > 9 ? num.toString().split('').map(doubleNum => Number(doubleNum)).reduce((a,b) => a+b) : num;
        });

        const totalSummary = separateDoubleNumbers.reduce((a,b) => a+b) + showEvenElements.reduce((a,b) => a+b);

        //Card verify
        return totalSummary % 10 === 0 ? true : false;
    }
    if(validateCardNum(cardNumber) === true) {
        console.log(`Numer karty prawidłowy. Wystawcą karty jest ${cardCompany(cardNumber)}.`);
      } else {
        console.log(`Numer karty nieprawidłowy.`);
      }
}

export { checkCardNumber };