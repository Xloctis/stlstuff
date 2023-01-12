
//jsongen
export const jsonGenData = [
    { username: "Leigh", email: "leighhines@geekfarm.com", age: 48, country: "Georgia" },
    { username: "Lottie", email: "lottiehines@geekfarm.com", age: 45, country: "Luxembourg" },
    { username: "Stein", email: "steinhines@geekfarm.com", age: 40, country: "Dominica" },
    { username: "Maddox", email: "maddoxhines@geekfarm.com", age: 29, country: "Colombia" },
    { username: "Weiss", email: "weisshines@geekfarm.com", age: 50, country: "Micronesia" },
    { username: "Felecia", email: "feleciaclay@poshome.com", age: 49, country: "Somalia" },
    { username: "Becky", email: "beckyclay@poshome.com", age: 37, country: "Guadeloupe" },
    { username: "Owen", email: "owenclay@poshome.com", age: 38, country: "Egypt" },
    { username: "Genevieve", email: "genevieveclay@poshome.com", age: 24, country: "Armenia" },
    { username: "Kinney", email: "kinneyclay@poshome.com", age: 26, country: "Mozambique" },
    { username: "Patti", email: "patticlay@poshome.com", age: 48, country: "Bahrain" },
    { username: "Rosanne", email: "rosanneclay@poshome.com", age: 38, country: "Micronesia" },
    { username: "Linda", email: "lindaclay@poshome.com", age: 39, country: "Latvia" },
    { username: "Rosemary", email: "rosemaryclay@poshome.com", age: 52, country: "Kiribati" },
    { username: "Lesa", email: "lesaclay@poshome.com", age: 38, country: "Bangladesh" },
    { username: "Warren", email: "warrenclay@poshome.com", age: 53, country: "Oman" }
]
export const jsonGenDataKeys = [
    'username', 'email', 'age', 'country', 'action'
]
export default jsonGenData;

/*
[
    '{{repeat(13, 16)}}',
    {
        //(username, email, age, country)
        username: '{{firstName()}}',
        email: '{{email()}}',
        age: '{{integer(20, 60)}}',
        country: '{{country()}}',

    }
]

https://json-generator.com/

*/