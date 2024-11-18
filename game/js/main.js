const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7418d31cdfmshcfae53b77476a11p1663b0jsne566272aaa13',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
async function getGames(id="shooter") {
	const url = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${id}`,options);
    const data=await url.json()
	display(data);
}
getGames();

var btns= document.querySelectorAll('.nav-link')
    for(var i=0;i<btns.length;i++)
        btns[i].addEventListener('click',function(e){
        console.log(e.target.innerHTML);
        getGames(e.target.innerHTML);
    })

function display (games){

    var car='';
	
    for( var i=0;i<games.length;i++){
		// console.log('Game ID:', games[i].id);
    car+=`
	<div class="col-md-3">
			<div class="card data-id="${games[i].id} ">
				<img src="${games[i].thumbnail}" class="card-img-top" alt="${games[i].title}">
				<div class="card-body text-center text-white">
					<h5 class="card-title">${games[i].title}</h5>
					<p class="card-text">${games[i].short_description}</p>
				</div>
			</div>
			</div>
		`;
    }
    document.getElementById("games-container").innerHTML = car;

	// document.querySelectorAll('.caed').forEach(card => {
    //     card.addEventListener('click', function(e) {
    //         const gameId = e.target;
    //         console.log('Clicked Game ID:', gameId);  
           
    //     });
    // });
	var showGames = document.getElementById("games-container")
	var cards = document.querySelectorAll('.card')
	// showGames.addEventListener('click',(event) =>{
	// 	const card = event.target.closest('.card')
	// 	if (card) {
	// 		displayDetails(card.getAttribute('data-id'))
		
	// 	}
	// })
cards.forEach((element,index) => {
	element.addEventListener('click',()=>{
		getDetails(games[index].id)
	})
});
}

	
	async function getDetails(gameId) {
		const url = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
		const data = await url.json();
		displayDetails(data);
	}
	
	function displayDetails(game) {
		const modal = `
        <div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="gameModalLabel">${game.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${game.thumbnail}" class="img-fluid" alt="${game.title}">
                        <p>${game.description}</p>
                        <a href="${game.game_url}" class="btn btn-primary" target="_blank">Play Now</a>
                    </div>
                </div>
            </div>
        </div>
    `;
	document.body.innerHTML += modal;

    var myModal = new bootstrap.Modal(document.getElementById('gameModal'));
    myModal.show();
	}