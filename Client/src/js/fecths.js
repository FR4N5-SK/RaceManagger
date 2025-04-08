import { alertConfirm, alertError } from '../alerts/alerts';
import peticiones from '../validations/peticiones'

export function allAthletesInCompetitions(competition, token, setData, setLoading) {
    return new Promise((resolve, reject) => {
      fetch(peticiones.allAthletesInCompetitions + competition, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setLoading(false);
            alertConfirm(response.message);
            setData(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
        });
    });
}

export function addAthletesInCompetitions(competition, athlete, data, token, setData, setCompetitions, competitions) {
    return new Promise((resolve, reject) => {
      fetch(`${peticiones.addAthletesInCompetitions}${athlete}/${competition}`, {
        mode: "cors",
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            const newStorage = [];
            competitions.map((item) => {
              if (item.id_competition === competition) {
                item.enrolled_competition = Number(item.enrolled_competition) + 1
                newStorage.push(item);
              } else {
                newStorage.push(item);
              }
            });
            setCompetitions(newStorage);
            setData(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
}

// Falta
export function addTimeAthlete(competition, athlete, data, token, setData, oldData) {
  return new Promise((resolve, reject) => {
    fetch(`${peticiones.resultsInCompetitions}${athlete}/${competition}`, {
      mode: "cors",
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.status < 210 && response.status >= 200) {
          alertConfirm(response.message);
          const newStorage = [];
          oldData.map((item) => {
            if (item.id_athlete === athlete) {
              item.time_result = response.data.time
              newStorage.push(item);
            } else {
              newStorage.push(item);
            }
          });
          setData(newStorage);
          resolve(true);
        }
        if (response.status < 410 && response.status >= 400) {
          alertError(response.message);
          resolve(false);
        }
        if (response.status < 510 && response.status >= 500) {
          alertError(response.message);
          resolve(false);
        }
      });
  });
}

export function allResultInCompetitions(competition, token, allAthletes, setData, setLoading) {
    console.log("Hola cracks")
    return new Promise((resolve, reject) => {
      fetch(peticiones.allTimesInCompetitions + competition, {
        mode: "cors",
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            setLoading(false);
            alertConfirm(response.message);
            const newData = []
            let change = false;
            for (let i = 0; i < allAthletes.length; i++) {
                change = false
                for (let e = 0; e < response.data.length; e++) {
                    if (allAthletes[i].id_athlete === response.data[e].id_athlete) {
                        change = true
                        newData.push({
                            id_result: response.data[e].id_result,
                            id_athlete: response.data[e].id_athlete,
                            id_competition: competition,
                            name_athlete: response.data[e].name_athlete,
                            lastname_athlete: response.data[e].lastname_athlete,
                            nation_athlete: response.data[e].nation_athlete,
                            time_result: response.data[e].time_result,
                        })
                    }
                }
                if (!change) {
                    newData.push({
                      id_result: allAthletes[i].id_result,
                      id_athlete: allAthletes[i].id_athlete,
                      id_competition: competition,
                      name_athlete: allAthletes[i].name_athlete,
                      lastname_athlete: allAthletes[i].lastname_athlete,
                      nation_athlete: allAthletes[i].nation_athlete,
                      time_result: "Sin tiempo todavia",
                    });
                }
            }
            setData(newData);
            console.log(allAthletes)
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            setLoading(false);
            resolve(false);
          }
        });
    });
}

export function editStatusCompetition(competition, data, token, competitions, setCompetitions) {
    return new Promise((resolve, reject) => {
      fetch(`${peticiones.editStatusCompetitions}${competition}`, {
        mode: "cors",
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.status < 210 && response.status >= 200) {
            alertConfirm(response.message);
            const newStorage = [];
            competitions.map((item) => {
              if (item.id_competition === competition) {
                item.status_competition = data.status
                newStorage.push(item);
              } else {
                newStorage.push(item);
              }
            });
            setCompetitions(newStorage);
            setData(response.data);
            resolve(true);
          }
          if (response.status < 410 && response.status >= 400) {
            alertError(response.message);
            resolve(false);
          }
          if (response.status < 510 && response.status >= 500) {
            alertError(response.message);
            resolve(false);
          }
        });
    });
}