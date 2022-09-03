const joc = document.getElementById('joc');
const btnReset = document.getElementById('Reset');
let jucator="X", mutari=0;
let tabla = [[null, null, null],
             [null, null, null],
             [null, null, null]];
genereazaTabla();
Reset.addEventListener('click', resetGame);
joc.addEventListener('click', e=>{
    const tg = e.target;
    let l = parseInt(tg.getAttribute('l'));
    let c = parseInt(tg.getAttribute('c'));
    if (tabla[l][c])
        return;
    tabla[l][c] = jucator;
    tg.innerHTML = jucator;
    mutari++;
    if(gameOver(l, c, jucator)){
        alert(`Felicitari ${jucator}! Ai castigat!`);
        Reset.disabled = false;
    }else if(mutari==9){
        alert('Jocul este remiza!');
        Reset.disabled=false;
    }else{
        schimbaJucator();
    }
});
function gameOver(l, c, jucator){
    let cnt = 0;
    for (let i=0; i<3; i++) { // verificare linie
        if (tabla[l][i] == jucator)
        cnt++;
    }
    if (cnt == 3) return true;
    cnt = 0;
    for (let i=0; i<3; i++){ // verificare coloana
        if (tabla[i][c] == jucator)
        cnt++;
    }
    if (cnt == 3) return true;
    cnt = 0;
    if (l == c) { // verificare diagonala principala
        for (let i=0; i<3; i++){
            if (tabla[i][i] == jucator)
            cnt++;
        }
    } else if (l + c == 2) { // verificare diagonala secundara
        cnt = 0;
        for (let i=0; i<3; i++){
            if (tabla[i][3-i-1] == jucator)
                cnt++;
        }
    }
    if (cnt == 3) return true;
    return false;
}
function schimbaJucator(){
    if(jucator == "X")
        jucator="0";
    else
        jucator="X";
    document.getElementById('jucator').textContent = jucator;
}
function resetGame(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            tabla[i][j]=null;
        }
    }
    Array.from(document.querySelectorAll('div[l')).forEach(e=>{
        e.textContent = null;
    });
    document.getElementById('jucator').textContent = jucator;
    mutari=0;
    Reset.disabled=true;
}
function genereazaTabla(){
    let l, c;
    for(let i=0; i<9; i++){
        let e = document.createElement('div');
        l = Math.round((i+2)/3)-1;
        c = Math.round((i)%3);
        e.setAttribute('l', l);
        e.setAttribute('c', c);
        joc.appendChild(e);
    }
}
