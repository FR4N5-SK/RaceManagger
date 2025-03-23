const endpoints = {
    loginUser: "http://localhost:3062/api/users/login",
    recoveryPassword: "http://localhost:3062/api/users/repair-password",
    registerUser: "http://localhost:3062/api/users/register",
    allAthletes: "http://localhost:3062/api/athletes/all",
    allCompetitions: "http://localhost:3062/api/competitions/all",
    allUsers: "http://localhost:3062/api/users/all",
    AddAthletes: "http://localhost:3062/api/athletes/add",
    EditAthletes: "http://localhost:3062/api/athletes/edit/",
    DeleteAthletes: "http://localhost:3062/api/athletes/delete/",
    AddCompetition: "http://localhost:3062/api/competitions/add",
    EditCompetition: "http://localhost:3062/api/competitions/edit/",
    DeleteCompetition: "http://localhost:3062/api/competitions/delete/",
    DeleteUser: "http://localhost:3062/api/users/delete/",
}

export default endpoints