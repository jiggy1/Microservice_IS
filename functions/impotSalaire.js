
function impotSalaire(montantBrut) {
    let montantIS = 0;

    if (montantBrut <= 300000) {
        montantIS = 0;

    } else {
        let montantBrutImposable = Math.round(montantBrut - 300000);

        let baseImpot =  Math.round(montantBrutImposable);

        montantIS = Math.round(baseImpot * 0.012);
    }
    return montantIS;
}

module.exports = impotSalaire;