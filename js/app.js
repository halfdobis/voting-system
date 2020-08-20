const contestantsEl = document.querySelector('.contestant');

let contestants = [
    {
        name: 'Dorathy',
        img: 'img/Dorathy.png',
        vote: 0
    },
    {
        name: 'Ozo',
        img: 'img/Ozo.jpg',
        vote: 0
    },
    {
        name: 'Nengi',
        img: 'img/nengi.jpg',
        vote: 0
    },
    {
        name: 'Erica',
        img: 'img/erica.jpg',
        vote: 0
    },
    {
        name: 'Kiddwaya',
        img: 'img/kidd.jpg',
        vote: 0
    },
    {
        name: 'Prince',
        img: 'img/Prince.png',
        vote: 0
    }
]

const list = (contestant) => {
    const data = `
        <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 main-col ">
            <div class="main-col-content">
            <img src="${contestant.img}" alt="" width="67px">
            <div class="left">
                <h5 id="contestant-name">${contestant.name}</h5>
                <div class="input-group">
                    <div class="input-group-prepend" id="button-addon3">
                    <button class="btn btn-outline-secondary" id="votebuttonminus" type="button">-</button>
                    <span class="input-group-text input-outline-secondary" id="votecount">${contestant.vote}</span>
                    <button class="btn btn-outline-secondary" id="votebuttonadd" type="button">+</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    `;
    return contestantsEl.innerHTML += data;
}
contestants.forEach((contestant) => list(contestant));

let voteLimit = 100;
const voteCount = Array.prototype.slice.call(document.querySelectorAll('#votecount'));
const btnAdd = Array.prototype.slice.call(document.querySelectorAll('#votebuttonadd'));
const btnSub = Array.prototype.slice.call(document.querySelectorAll('#votebuttonminus'));
const progressbar = document.querySelector('#progressbar div');
const totalVote = document.querySelector('#totalvote');
const leaderBtn = document.querySelector('#leaderBtn');
const voteMessage = document.querySelector('#voteMessage')
const contestantName = Array.prototype.slice.call(document.querySelectorAll('#contestant-name'))

totalVote.textContent = voteLimit;
progressbar.style.width = `${voteLimit}%`

btnAdd.forEach((el, i) =>{
    el.addEventListener('click', () => {
        if (voteLimit > 0 && voteLimit <= 100){
            voteCount[i].textContent = parseInt(voteCount[i].textContent) + 1;
            voteLimit -= 1;
            
            totalVote.textContent = voteLimit;
            progressbar.style.width = `${voteLimit}%`

            const contes = contestants.filter(con => con.name == contestantName[i].textContent);
            contes[0].vote = parseInt(voteCount[i].textContent);
            
        }
    });    
});

btnSub.forEach((el, i) =>{
    el.addEventListener('click', () =>{
        if(parseInt(voteCount[i].textContent) > 0 && voteLimit<= 100){
            voteCount[i].textContent = parseInt(voteCount[i].textContent) - 1;
            voteLimit += 1;

            
            totalVote.textContent = voteLimit;
            progressbar.style.width = `${voteLimit}%`

            const contes = contestants.filter(con => con.name == contestantName[i].textContent);            
            contes[0].vote = parseInt(voteCount[i].textContent);
        }
    })
})


const leaderBoard = document.querySelector('.leaderBoard');
const leaderScore = document.querySelector('.main-span')

const leaderBoardDisplay = (leaderDisplay)=> {
    const view = `
         <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 main-col ">
               <div class="main-col-content">
                    <img src="${leaderDisplay.img}" alt="" width="67px">
                    <div class="left">
                        <h5>${leaderDisplay.name}</h5>
                    </div>
                    <span class="main-span">${leaderDisplay.score}</span>
               </div>
            </div>
    `
    
    return leaderBoard.innerHTML += view;
    
}

let leaderBoardView = false;


leaderBtn.addEventListener('click', ()=>{
    if (voteLimit == 100){
        voteMessage.textContent = '*please vote at least one housemate';
        return
    }
    if(leaderBoardView ){ 
        contestantsEl.style.display ='flex';
        leaderBoard.style.display= 'none'
        leaderBoard.innerHTML = '';         
        leaderBoardView = false;
        leaderBtn.textContent = 'View Leaderboard' ;
        voteMessage.textContent = '*Finish the vote';
        document.querySelector("#evicted").textContent = ` `;
    }else{  
        contestantsEl.style.display ='none';
        leaderBoard.style.display= 'flex'  
        leaderBoardView = true;
        const sortedContestants = contestants.sort((x,y) => y.vote - x.vote);
        sortedContestants.forEach((contestant, i) => {
            contestant.score = i + 1;            
            leaderBoardDisplay(contestant);
            leaderBtn.textContent = 'Go back to the vote page' ;
            voteMessage.textContent = 'Thanks for voting';
            document.querySelector("#evicted").textContent = `${sortedContestants[sortedContestants.length-1].name} was evicted`;
            
        })        
    }
    
})



