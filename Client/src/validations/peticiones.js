const endpoints = {
    loginUser: "http://localhost:3062/api/users/login",
    recoveryPassword: "http://localhost:3062/api/users/repair-password",
    registerUser: "http://localhost:3062/api/users/register",
    allAthletes: "http://localhost:3062/api/athletes/all",
    allCompetitions: "http://localhost:3062/api/competitions/all",
    allUsers: "http://localhost:3062/api/users/all",
    allCategories: "http://localhost:3062/api/categories/all",
    AddAthletes: "http://localhost:3062/api/athletes/add",
    EditAthletes: "http://localhost:3062/api/athletes/edit/",
    DeleteAthletes: "http://localhost:3062/api/athletes/delete/",
    AddCompetition: "http://localhost:3062/api/competitions/add",
    AddCategorie: "http://localhost:3062/api/categories/add",
    EditCompetition: "http://localhost:3062/api/competitions/edit/",
    EditCategorie: "http://localhost:3062/api/categories/edit/",
    DeleteCompetition: "http://localhost:3062/api/competitions/delete/",
    DeleteCategorie: "http://localhost:3062/api/categories/delete/",
    DeleteUser: "http://localhost:3062/api/users/delete/",
}

export default endpoints