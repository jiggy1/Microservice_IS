
function impotSalaire(montantBrut) {
    

    if (montantBrut <= 300000) {
        let montantImpot = 0;
    } else {
        let montantBrutImposable = Math.round(montantBrut - 300000);

        let baseImpot =  Math.round(montantBrutImposable);

        montantImpot = Math.round(baseImpot * 0.012);
    }
    return montantImpot;
}

module.exports = impotSalaire;